"use client";

import { MapContainer, TileLayer, Polygon, Polyline, Marker, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// ── Fix Leaflet default icon issue in Next.js ──
// Move the icon fix inside a useEffect or just outside but guarded, as it needs window context.
// In Next.js client component, doing it at the top level is fine but sometimes causes issues if loaded server side.
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
}

// ── MOCK DATA (replace with real API later) ──
const SPILL_POLYGON: [number, number][] = [
  [19.82, 88.30],
  [19.84, 88.32],
  [19.85, 88.35],
  [19.83, 88.37],
  [19.80, 88.35],
  [19.79, 88.32],
];

const HINDCAST_PATH: [number, number][] = [
  [19.75, 88.20],  // -24h
  [19.77, 88.23],  // -18h
  [19.78, 88.26],  // -12h
  [19.80, 88.28],  // -6h
  [19.82, 88.31],  // NOW (origin estimate)
];

const FORECAST_PATH: [number, number][] = [
  [19.82, 88.31],  // NOW
  [19.85, 88.34],  // +6h
  [19.88, 88.36],  // +12h
  [19.91, 88.39],  // +24h
];

const VESSELS = [
  { id: "V001", name: "MV Ocean Star", mmsi: "419054700", lat: 19.81, lng: 88.29, heading: 45, score: 87 },
  { id: "V002", name: "MT Pacific Dawn", mmsi: "538004872", lat: 19.78, lng: 88.35, heading: 120, score: 69 },
  { id: "V003", name: "MV Blue Horizon", mmsi: "311000318", lat: 19.90, lng: 88.25, heading: 270, score: 43 },
];

const ESTIMATED_ORIGIN = [19.82, 88.31];

interface Props {
  layers: Record<string, boolean>;
  currentTime: string;
  selectedVessel: string | null;
  setSelectedVessel: (id: string | null) => void;
}

export default function MapView({ layers, selectedVessel, setSelectedVessel }: Props) {
  return (
    <MapContainer
      center={[19.82, 88.32]}
      zoom={11}
      className="w-full h-full"
      zoomControl={false}
    >
      {/* ── Base dark tile layer ── */}
     <TileLayer
  url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
  attribution="Tiles &copy; Esri"
  maxZoom={16}
/>



      {/* ── Satellite layer (optional overlay) ── */}
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
            fillOpacity: 0.35,
            weight: 2,
            dashArray: "5, 5",
          }}
        >
          <Popup>
            <div className="text-black">
              <strong>🛢️ Oil Slick Detected</strong><br />
              Area: 12.4 km²<br />
              Confidence: 94%
            </div>
          </Popup>
        </Polygon>
      )}

      {/* ── Estimated Origin ── */}
      {layers.hindcast && (
        <CircleMarker
          center={ESTIMATED_ORIGIN as [number, number]}
          radius={8}
          pathOptions={{
            color: "#ff0000",
            fillColor: "#ff0000",
            fillOpacity: 0.8,
          }}
        >
          <Popup>
            <div className="text-black">
              <strong>⚠️ Estimated Origin</strong><br />
              19.82&deg;N, 88.31&deg;E<br />
              Time: ~08:30 UTC
            </div>
          </Popup>
        </CircleMarker>
      )}

      {/* ── Hindcast Path ── */}
      {layers.hindcast && (
        <Polyline
          positions={HINDCAST_PATH}
          pathOptions={{
            color: "#ff6b6b",
            weight: 3,
            dashArray: "8, 6",
            opacity: 0.8,
          }}
        />
      )}

      {/* ── Forecast Path ── */}
      {layers.forecast && (
        <Polyline
          positions={FORECAST_PATH}
          pathOptions={{
            color: "#4ecdc4",
            weight: 3,
            dashArray: "4, 8",
            opacity: 0.7,
          }}
        />
      )}

      {/* ── AIS Vessel Markers ── */}
      {layers.vessels &&
        VESSELS.map((v) => (
          <Marker
            key={v.id}
            position={[v.lat, v.lng]}
            eventHandlers={{
              click: () => setSelectedVessel(v.id),
            }}
            icon={L.divIcon({
              className: "custom-vessel-icon",
              html: `
                <div style="
                  background: ${selectedVessel === v.id ? '#00ff88' : '#00d4ff'};
                  width: 14px;
                  height: 14px;
                  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
                  transform: rotate(${v.heading}deg);
                  filter: drop-shadow(0 0 6px ${selectedVessel === v.id ? '#00ff88' : '#00d4ff'});
                "></div>
              `,
              iconSize: [14, 14],
              iconAnchor: [7, 7],
            })}
          >
            <Popup>
              <div className="text-black text-sm">
                <strong>🚢 {v.name}</strong><br />
                MMSI: {v.mmsi}<br />
                Score: <strong>{v.score}</strong>
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
