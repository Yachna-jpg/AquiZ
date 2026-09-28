"use client";

import { MapContainer, TileLayer, Polygon, Polyline, Marker, Popup, CircleMarker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// ── Fix Leaflet default icon issue in Next.js ──
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ─────────────────────────────────────────────────────────────────────────────
// ALL STATIC MAP DATA — Bay of Bengal, ~19.82°N 88.31°E (PRESERVED EXACTLY)
// ─────────────────────────────────────────────────────────────────────────────

const SPILL_POLYGON: [number, number][] = [
  [19.825, 88.305],
  [19.830, 88.315],
  [19.828, 88.325],
  [19.820, 88.328],
  [19.813, 88.320],
  [19.815, 88.308],
  [19.820, 88.303],
  [19.825, 88.305],
];

const SPILL_ORIGIN: [number, number] = [19.815, 88.295];

const HINDCAST_PATH: [number, number][] = [
  [19.822, 88.310],
  [19.820, 88.304],
  [19.818, 88.300],
  [19.815, 88.295],
];

const FORECAST_PATH: [number, number][] = [
  [19.822, 88.310],
  [19.825, 88.318],
  [19.828, 88.326],
  [19.831, 88.335],
];

export const VESSELS = [
  { id: "V001", name: "MV Ocean Star",   mmsi: "419054700", flag: "🇮🇳", lat: 19.810, lng: 88.292, heading: 45,  score: 87, anomaly: true  },
  { id: "V002", name: "MT Pacific Dawn", mmsi: "538004872", flag: "🇸🇬", lat: 19.835, lng: 88.340, heading: 210, score: 69, anomaly: false },
  { id: "V003", name: "MV Blue Horizon", mmsi: "566001234", flag: "🇬🇧", lat: 19.798, lng: 88.330, heading: 135, score: 43, anomaly: false },
];

// ── Inner component to access map instance via useMap ──
function MapController({
  searchTarget,
  setSelectedVessel,
}: {
  searchTarget: { query: string; ts: number } | null;
  setSelectedVessel: (id: string | null) => void;
}) {
  const map = useMap();

  useEffect(() => {
    if (!searchTarget) return;
    const { query } = searchTarget;
    // Try vessel name match
    const match = VESSELS.find((v) =>
      v.name.toLowerCase().includes(query.toLowerCase())
    );
    if (match) {
      map.flyTo([match.lat, match.lng], 14);
      setSelectedVessel(match.id);
      return;
    }
    // Try lat,lng syntax
    const parts = query.split(",").map(Number);
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      map.flyTo([parts[0], parts[1]], 13);
    }
  }, [searchTarget, map, setSelectedVessel]);

  return null;
}

// ── Zoom/reset controls using useMap ──
function MapControls() {
  const map = useMap();
  return (
    <div className="absolute right-3 top-3 z-[1000] flex flex-col gap-1">
      <button
        id="btn-map-zoom-in"
        onClick={() => map.zoomIn()}
        className="w-8 h-8 bg-white border border-[#DCE3E6] rounded flex items-center justify-center text-[#647482] hover:text-[#0B2235] hover:border-[#2E6F9E] shadow-sm transition-colors text-xs font-bold"
        title="Zoom in"
      >
        +
      </button>
      <button
        id="btn-map-zoom-out"
        onClick={() => map.zoomOut()}
        className="w-8 h-8 bg-white border border-[#DCE3E6] rounded flex items-center justify-center text-[#647482] hover:text-[#0B2235] hover:border-[#2E6F9E] shadow-sm transition-colors text-xl leading-none"
        title="Zoom out"
      >
        −
      </button>
      <button
        id="btn-map-reset"
        onClick={() => map.flyTo([19.820, 88.315], 12)}
        className="w-8 h-8 bg-white border border-[#DCE3E6] rounded flex items-center justify-center text-[#647482] hover:text-[#0B2235] hover:border-[#2E6F9E] shadow-sm transition-colors text-xs"
        title="Reset view"
      >
        ⌖
      </button>
    </div>
  );
}

interface Props {
  layers: Record<string, boolean>;
  currentTime: string;
  selectedVessel: string | null;
  setSelectedVessel: (id: string | null) => void;
  scoreThreshold: number;
  vesselType: string;
  searchTarget: { query: string; ts: number } | null;
}

export default function MapCore({
  layers,
  selectedVessel,
  setSelectedVessel,
  scoreThreshold,
  searchTarget,
}: Props) {
  const visibleVessels = VESSELS.filter((v) => v.score >= scoreThreshold);

  function vesselIcon(v: (typeof VESSELS)[0]) {
    const isSelected = selectedVessel === v.id;
    const fill  = isSelected ? "#0B2235" : v.anomaly ? "#C9822B" : "#2E6F9E";
    const glow  = isSelected ? "#0B2235" : v.anomaly ? "#C9822B" : "#2E6F9E";
    return L.divIcon({
      className: "custom-vessel-icon",
      html: `<div style="
        width:0;height:0;
        border-left:7px solid transparent;
        border-right:7px solid transparent;
        border-bottom:13px solid ${fill};
        transform:rotate(${v.heading}deg);
        filter:drop-shadow(0 1px 3px ${glow}80);
      "></div>`,
      iconSize: [14, 13] as [number, number],
      iconAnchor: [7, 6] as [number, number],
    });
  }

  return (
    <MapContainer
      center={[19.820, 88.315]}
      zoom={12}
      className="flex-1 w-full h-full"
      zoomControl={false}
      style={{ minHeight: "300px" }}
    >
      {/* Inner controller for search & zoom */}
      <MapController searchTarget={searchTarget} setSelectedVessel={setSelectedVessel} />
      <MapControls />

      {/* Base satellite imagery tile */}
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles &copy; Esri"
        maxZoom={18}
      />

      {/* Labels overlay (toggleable via satellite layer) */}
      {layers.satellite && (
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
          opacity={0.6}
        />
      )}

      {/* Oil Slick Polygon */}
      {layers.oilSlick && (
        <Polygon
          positions={SPILL_POLYGON}
          pathOptions={{
            color: "#C74732",
            fillColor: "#C74732",
            fillOpacity: 0.35,
            weight: 2,
            dashArray: "5, 5",
          }}
        >
          <Popup>
            <div style={{ fontSize: 12, minWidth: 160 }}>
              <strong>Oil Slick Detected</strong><br />
              Area: ~12.4 km²<br />
              Centre: 19.820°N, 88.315°E<br />
              Confidence: 94%
            </div>
          </Popup>
        </Polygon>
      )}

      {/* Spill Origin Marker */}
      {layers.hindcast && (
        <CircleMarker
          center={SPILL_ORIGIN}
          radius={5}
          pathOptions={{
            color: "#C9822B",
            fillColor: "#C9822B",
            fillOpacity: 0.95,
            weight: 2,
          }}
        >
          <Popup>
            <div style={{ fontSize: 12 }}>
              <strong>Estimated Spill Origin</strong><br />
              19.815°N, 88.295°E<br />
              ~12h before detection<br />
              <div style={{ marginTop: '8px' }}>
                <strong>Ship Name:</strong> MV Ocean Star<br />
                <strong>Correlation Score:</strong> 87
              </div>
            </div>
          </Popup>
        </CircleMarker>
      )}

      {/* Hindcast Path — dashed amber (past drift) */}
      {layers.hindcast && (
        <Polyline
          positions={HINDCAST_PATH}
          pathOptions={{
            color: "#C9822B",
            weight: 2.5,
            dashArray: "8, 6",
            opacity: 0.85,
          }}
        />
      )}

      {/* Forecast Path — dashed teal (future drift) */}
      {layers.forecast && (
        <Polyline
          positions={FORECAST_PATH}
          pathOptions={{
            color: "#247C83",
            weight: 2.5,
            dashArray: "5, 8",
            opacity: 0.75,
          }}
        />
      )}

      {/* AIS Vessel Markers (filtered by scoreThreshold) */}
      {layers.vessels &&
        visibleVessels.map((v) => (
          <Marker
            key={v.id}
            position={[v.lat, v.lng]}
            icon={vesselIcon(v)}
            eventHandlers={{ click: () => setSelectedVessel(v.id) }}
          >
            <Popup>
              <div style={{ fontSize: 12, minWidth: 160 }}>
                <strong>{v.name}</strong> {v.flag}<br />
                MMSI: {v.mmsi}<br />
                Correlation Score:{" "}
                <strong
                  style={{
                    color:
                      v.score >= 75 ? "#C74732" :
                      v.score >= 50 ? "#C9822B" :
                      "#527A68",
                  }}
                >
                  {v.score}
                </strong>
                <br />
                {v.anomaly && (
                  <span style={{ color: "#C9822B", fontWeight: "bold" }}>
                    ⚠ Speed Anomaly Detected
                  </span>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
