import sqlite3
import random
import time
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "maritime_ais.db")

def generate_mock_db():
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)
        
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Create table
    cursor.execute("""
        CREATE TABLE ais_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            mmsi TEXT,
            vessel_name TEXT,
            lat REAL,
            lon REAL,
            timestamp INTEGER,
            speed REAL,
            heading REAL
        )
    """)
    
    # Base location: Bay of Bengal, near spill origin (~19.82°N, 88.31°E)
    base_lat = 19.82
    base_lon = 88.31
    base_time = int(time.time()) - 48 * 3600  # 48 hours ago
    
    vessels = [
        {"mmsi": "419054700", "name": "MT_OCEAN_STAR", "base_speed": 12.0},
        {"mmsi": "538004872", "name": "MT_PACIFIC_DAWN", "base_speed": 10.5},
        {"mmsi": "566001234", "name": "MV_BLUE_HORIZON", "base_speed": 8.0}
    ]
    
    # Generate tracks for each vessel over a 24 hour period around the base time
    for v in vessels:
        current_lat = base_lat + random.uniform(-0.5, 0.5)
        current_lon = base_lon + random.uniform(-0.5, 0.5)
        heading = random.uniform(0, 360)
        
        for i in range(24): # 24 hours of hourly pings
            timestamp = base_time + (i * 3600)
            
            # Simulate anomalous speed drop for one vessel
            speed = v["base_speed"]
            if v["name"] == "MT_OCEAN_STAR" and 10 <= i <= 14:
                speed = 2.0 # Sudden drop in speed (loitering/spill possible)
                
            current_lat += random.uniform(-0.05, 0.05)
            current_lon += random.uniform(-0.05, 0.05)
            
            cursor.execute("""
                INSERT INTO ais_logs (mmsi, vessel_name, lat, lon, timestamp, speed, heading)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (v["mmsi"], v["name"], current_lat, current_lon, timestamp, speed, heading))
            
    conn.commit()
    conn.close()
    print(f"Mock Database created successfully at {DB_PATH}")

if __name__ == "__main__":
    generate_mock_db()
