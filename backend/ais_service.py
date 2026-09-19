import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "maritime_ais.db")

def query_candidate_vessels(origin_lat, origin_lng, origin_time, radius_km=50):
    conn = sqlite3.connect(DB_PATH)
    # Return dicts instead of tuples
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    # 21600 seconds = 6 hours
    lat_min, lat_max = origin_lat - (radius_km / 111), origin_lat + (radius_km / 111)
    lon_min, lon_max = origin_lng - (radius_km / 111), origin_lng + (radius_km / 111)
    
    cursor.execute("""
        SELECT mmsi, vessel_name, lat, lon, timestamp, speed, heading
        FROM ais_logs
        WHERE timestamp BETWEEN ? AND ?
          AND lat BETWEEN ? AND ?
          AND lon BETWEEN ? AND ?
    """, (origin_time - 21600, origin_time + 21600, lat_min, lat_max, lon_min, lon_max))
    
    rows = cursor.fetchall()
    conn.close()
    
    # Group by MMSI
    vessels = {}
    for r in rows:
        mmsi = r["mmsi"]
        if mmsi not in vessels:
            vessels[mmsi] = []
        vessels[mmsi].append(dict(r))
        
    return list(vessels.values())
