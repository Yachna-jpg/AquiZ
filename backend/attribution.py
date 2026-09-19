from geopy.distance import geodesic

def calculate_vessel_score(vessel_ais_points, spill_origin_coords, spill_time):
    if not vessel_ais_points:
        return None
        
    # 1. Minimum Spatial Distance
    min_dist = min([geodesic((p['lat'], p['lon']), spill_origin_coords).km for p in vessel_ais_points])
    distance_score = max(0, 100 - (min_dist * 5)) 
     # was [p['lat'], p['lon']]
    # 2. Time Correlation
    closest_point = min(vessel_ais_points, key=lambda p: abs(p['timestamp'] - spill_time))
    time_diff_hours = abs(closest_point['timestamp'] - spill_time) / 3600
    time_score = max(0, 100 - (time_diff_hours * 15))
    
    # 3. Anomaly Detection (Sudden speed drops or loitering)
    speeds = [p['speed'] for p in vessel_ais_points]
    speed_drop_anomaly = 1 if (max(speeds) - min(speeds)) > 8 else 0
    anomaly_bonus = 15 if speed_drop_anomaly else 0
    
    # 4. Weighted Correlation Score
    final_score = (0.45 * distance_score) + (0.35 * time_score) + anomaly_bonus
    
    return {
        "mmsi": vessel_ais_points[0]['mmsi'],
        "name": vessel_ais_points[0]['vessel_name'],
        "correlation_score": min(100, round(final_score, 1)),
        "min_distance_km": round(min_dist, 2),
        "has_anomaly": bool(speed_drop_anomaly),
        "trajectory": [[p['lon'], p['lat']] for p in vessel_ais_points]
    }