from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import time

from detection import process_sar_image
from drift import run_hindcast
from ais_service import query_candidate_vessels
from attribution import calculate_vessel_score

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/api/v1/analyze-spill")
async def analyze_spill(spill_id: str):
    detection = process_sar_image(None)

    # centroid is [lng, lat] — pass lat first, lng second
    drift = run_hindcast(detection["centroid"][1], detection["centroid"][0])

    origin_time = int(time.time()) - 48 * 3600
    # estimated_origin is [lng, lat] — pass lat first, lng second
    vessels = query_candidate_vessels(drift["estimated_origin"][1], drift["estimated_origin"][0], origin_time)

    scores = []
    for v in vessels:
        score = calculate_vessel_score(
            v,
            (drift["estimated_origin"][1], drift["estimated_origin"][0]),  # (lat, lng) tuple
            origin_time
        )
        if score:
            scores.append(score)

    scores.sort(key=lambda x: x["correlation_score"], reverse=True)

    return {"detection": detection, "drift": drift, "vessels": scores}