from shapely.geometry import Polygon, mapping

def process_sar_image(image_bytes=None):
    # Realistic small oil spill polygon in the Bay of Bengal (~19.82°N, 88.31°E)
    # Shapely Polygon expects [lng, lat] order
    # Covers roughly ~8 km² — a realistic tanker spill size
    polygon_coords = [
        [88.305, 19.825],
        [88.315, 19.830],
        [88.325, 19.828],
        [88.328, 19.820],
        [88.320, 19.813],
        [88.308, 19.815],
        [88.303, 19.820],
        [88.305, 19.825],
    ]
    poly = Polygon(polygon_coords)

    area_km2 = poly.area * 111 * 111
    centroid = [poly.centroid.x, poly.centroid.y]  # [lng, lat]

    return {
        "centroid": centroid,
        "area_km2": round(area_km2, 2),
        "geojson": mapping(poly)  # coordinates are [lng, lat] pairs
    }
