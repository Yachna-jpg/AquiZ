"use client";

import { MapContainer, TileLayer, Polygon, Polyline, Marker, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

// ── Fix Leaflet default icon issue in Next.js ──
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
}

// ─────────────────────────────────────────────────────────
// ALL STATIC MAP DATA — Bay of Bengal, ~19.82°N 88.31°E
// Matches the RightPanel vessel list exactly (3 vessels)
// ─────────────────────────────────────────────────────────

/** Oil spill polygon — small realistic patch */
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

/** Estimated spill origin — single dot (close to polygon, 12h back drift) */
const SPILL_ORIGIN: [number, number] = [19.815, 88.295];

/** Hindcast path: backwards from polygon to origin over 12h */
const HINDCAST_PATH: [number, number][] = [
  [19.822, 88.310], // T-0 (detection point)
  [19.820, 88.304],
  [19.818, 88.300],
  [19.815, 88.295], // T-12h (estimated origin)
];

/** Forecast path: forwards from polygon centre over next 12h */
const FORECAST_PATH: [number, number][] = [
  [19.822, 88.310], // T-0
  [19.825, 88.318],
  [19.828, 88.326],
  [19.831, 88.335], // T+12h
];

/**
 * 3 candidate vessels — names & scores match RightPanel exactly.
 * Positioned realistically around the spill area.
 */
const VESSELS = [
  {
    id: "V001",
    name: "MV Ocean Star",
    mmsi: "419054700",
    flag: "🇮🇳",
    lat: 19.810,
    lng: 88.292,
    heading: 45,
    score: 87,
    anomaly: true,
  },
  {
    id: "V002",
    name: "MT Pacific Dawn",
    mmsi: "538004872",
    flag: "🇸🇬",
    lat: 19.835,
    lng: 88.340,
    heading: 210,
    score: 69,
    anomaly: false,
  },
  {
    id: "V003",
    name: "MV Blue Horizon",
    mmsi: "566001234",
    flag: "🇬🇧",
    lat: 19.798,
    lng: 88.330,
    heading: 135,
    score: 43,
    anomaly: false,
  },
];

interface Props {
  layers: Record<string, boolean>;
  currentTime: string;
  selectedVessel: string | null;
  setSelectedVessel: (id: string | null) => void;
}

export default function MapView({ layers, selectedVessel, setSelectedVessel }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="w-full h-full bg-[#040D14]" />;

  return (
    <MapContainer
      center={[19.820, 88.315]}
      zoom={12}
      className="w-full h-full"
      zoomControl={false}
    >
      {/* ── Base dark tile layer ── */}
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles &copy; Esri"
        maxZoom={16}
      />

      {/* ── Satellite overlay ── */}
      {layers.satellite && (
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          opacity={0.3}
        />
      )}

      {/* ── Oil Slick Polygon ── */}
      {layers.oilSlick && (
        <Polygon
          positions={SPILL_POLYGON}
          pathOptions={{
            color: "#ff4444",
            fillColor: "#ff6600",
            fillOpacity: 0.40,
            weight: 2,
            dashArray: "5, 5",
          }}
        >
          <Popup>
            <div className="text-black text-sm">
              <strong>🛢️ Oil Slick Detected</strong><br />
              Area: ~8 km²<br />
              Centre: 19.820°N, 88.315°E<br />
              Confidence: 94%
            </div>
          </Popup>
        </Polygon>
      )}

      {/* ── Spill Origin Marker ── */}
      {layers.hindcast && (
        <CircleMarker
          center={SPILL_ORIGIN}
          radius={5}
          pathOptions={{
            color: "#ff4400",
            fillColor: "#ff4400",
            fillOpacity: 0.95,
            weight: 2,
          }}
        >
          <Popup>
            <div className="text-black text-sm">
              <strong>⚠️ Estimated Spill Origin</strong><br />
              19.815°N, 88.295°E<br />
              ~12h before detection
            </div>
          </Popup>
        </CircleMarker>
      )}

      {/* ── Hindcast Path (dashed red — past drift) ── */}
      {layers.hindcast && (
        <Polyline
          positions={HINDCAST_PATH}
          pathOptions={{
            color: "#ff6b6b",
            weight: 3,
            dashArray: "8, 6",
            opacity: 0.85,
          }}
        />
      )}

      {/* ── Forecast Path (dashed teal — future drift) ── */}
      {layers.forecast && (
        <Polyline
          positions={FORECAST_PATH}
          pathOptions={{
            color: "#4ecdc4",
            weight: 3,
            dashArray: "5, 8",
            opacity: 0.75,
          }}
        />
      )}

      {/* ── 3 AIS Vessel Markers — match RightPanel exactly ── */}
      {layers.vessels &&
        VESSELS.map((v) => (
          <Marker
            key={v.id}
            position={[v.lat, v.lng]}
            eventHandlers={{ click: () => setSelectedVessel(v.id) }}
            icon={L.divIcon({
              className: "custom-vessel-icon",
              html: `
                <div style="
                  background: ${selectedVessel === v.id ? "#00ff88" : v.anomaly ? "#ffaa00" : "#00d4ff"};
                  width: 14px;
                  height: 14px;
                  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
                  transform: rotate(${v.heading}deg);
                  filter: drop-shadow(0 0 5px ${selectedVessel === v.id ? "#00ff88" : v.anomaly ? "#ffaa00" : "#00d4ff"});
                "></div>
              `,
              iconSize: [14, 14],
              iconAnchor: [7, 7],
            })}
          >
            <Popup>
              <div className="text-black text-sm min-w-[160px]">
                <strong>🚢 {v.name}</strong> {v.flag}<br />
                MMSI: {v.mmsi}<br />
                Correlation Score: <strong style={{ color: v.score > 75 ? "#16a34a" : v.score > 50 ? "#d97706" : "#dc2626" }}>{v.score}</strong><br />
                {v.anomaly && <span style={{ color: "#d97706", fontWeight: "bold" }}>⚠ Speed Anomaly Detected</span>}
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
