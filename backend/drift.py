import requests
import numpy as np

def run_hindcast(start_lat, start_lng, hours_back=12):
    try:
        url = f"https://marine-api.open-meteo.com/v1/marine?latitude={start_lat}&longitude={start_lng}&hourly=ocean_current_velocity,ocean_current_direction"
        weather = requests.get(url, timeout=5).json()
        # Bay of Bengal average surface currents: ~0.1–0.3 m/s
        u_current = 0.15   # eastward drift
        v_current = -0.08  # slight northward
    except Exception as e:
        print("Failed to fetch open-meteo data, using fallback defaults:", e)
        u_current = 0.15
        v_current = -0.08

    current_lat, current_lng = start_lat, start_lng
    trajectory = []
    
    for t in range(hours_back):
        # Step backward in time (-1 hour = -3600 seconds)
        delta_lat = -(v_current * 3600) / 111000
        delta_lng = -(u_current * 3600) / (111000 * np.cos(np.radians(current_lat)))
        
        current_lat += delta_lat
        current_lng += delta_lng
        trajectory.append([current_lng, current_lat])
        
    estimated_origin = trajectory[-1]
    return {
        "trajectory": trajectory,
        "estimated_origin": estimated_origin
    }
