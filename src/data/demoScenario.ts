export type Coordinate = {
  lat: number;
  lng: number;
};

export type SpillData = {
  location: Coordinate;
  areaKm2: number;
  detectedAt: string;
  confidence: number;
  polygon: Coordinate[];
};

export type VesselData = {
  id: string;
  name: string;
  mmsi: string;
  currentPosition: Coordinate;
  speedKnots: number;
  headingDegrees: number;
  trajectory: Coordinate[];
  isCandidate: boolean;
};

export type DriftData = {
  origin: Coordinate;
  hindcastPath: Coordinate[];
  forecastPath: Coordinate[];
};

export const DEMO_SCENARIO = {
  isDemo: true,
  spill: {
    location: { lat: 19.82, lng: 88.34 },
    areaKm2: 12.4,
    detectedAt: "08:42 UTC",
    confidence: 94.2,
    polygon: [
      { lat: 19.83, lng: 88.33 },
      { lat: 19.84, lng: 88.35 },
      { lat: 19.82, lng: 88.36 },
      { lat: 19.81, lng: 88.34 },
      { lat: 19.83, lng: 88.33 },
    ],
  } as SpillData,
  drift: {
    origin: { lat: 19.86, lng: 88.29 },
    hindcastPath: [
      { lat: 19.82, lng: 88.34 },
      { lat: 19.84, lng: 88.31 },
      { lat: 19.86, lng: 88.29 },
    ],
    forecastPath: [
      { lat: 19.82, lng: 88.34 },
      { lat: 19.80, lng: 88.37 },
      { lat: 19.78, lng: 88.40 },
    ],
  } as DriftData,
  vessels: [
    {
      id: "v1",
      name: "MV Horizon",
      mmsi: "413123456",
      currentPosition: { lat: 19.95, lng: 88.15 },
      speedKnots: 14.2,
      headingDegrees: 45,
      isCandidate: true,
      trajectory: [
        { lat: 19.75, lng: 88.22 },
        { lat: 19.86, lng: 88.29 },
        { lat: 19.90, lng: 88.22 },
        { lat: 19.95, lng: 88.15 },
      ],
    },
    {
      id: "v2",
      name: "MV Ocean Star",
      mmsi: "413654321",
      currentPosition: { lat: 19.70, lng: 88.40 },
      speedKnots: 11.5,
      headingDegrees: 180,
      isCandidate: false,
      trajectory: [
        { lat: 19.85, lng: 88.45 },
        { lat: 19.78, lng: 88.42 },
        { lat: 19.70, lng: 88.40 },
      ],
    },
    {
      id: "v3",
      name: "MV Pacific Dawn",
      mmsi: "413987654",
      currentPosition: { lat: 19.92, lng: 88.45 },
      speedKnots: 16.0,
      headingDegrees: 90,
      isCandidate: false,
      trajectory: [
        { lat: 19.90, lng: 88.30 },
        { lat: 19.91, lng: 88.38 },
        { lat: 19.92, lng: 88.45 },
      ],
    },
  ] as VesselData[],
};
