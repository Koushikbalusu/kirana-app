"use client";

import "leaflet/dist/leaflet.css";
import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

const pinIcon = L.divIcon({
  className: "",
  html: `<div style="width:16px;height:16px;border-radius:50%;background:#171717;border:3px solid white;box-shadow:0 0 0 1px #171717;"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

function DraggableMarker({
  position,
  onMove,
  readOnly,
}: {
  position: { lat: number; lng: number };
  onMove?: (pos: { lat: number; lng: number }) => void;
  readOnly?: boolean;
}) {
  useMapEvents({
    click(e) {
      if (!readOnly) onMove?.({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  return (
    <Marker
      position={position}
      icon={pinIcon}
      draggable={!readOnly}
      eventHandlers={
        readOnly
          ? undefined
          : {
              dragend: (e) => {
                const latlng = e.target.getLatLng();
                onMove?.({ lat: latlng.lat, lng: latlng.lng });
              },
            }
      }
    />
  );
}

export function MapPicker({
  lat,
  lng,
  onChange,
  readOnly = false,
  height = 260,
}: {
  lat: number;
  lng: number;
  onChange?: (pos: { lat: number; lng: number }) => void;
  readOnly?: boolean;
  height?: number;
}) {
  const position = useMemo(() => ({ lat, lng }), [lat, lng]);

  return (
    <div style={{ height }} className="overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-800">
      <MapContainer center={position} zoom={15} style={{ height: "100%", width: "100%" }} scrollWheelZoom={!readOnly}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <DraggableMarker position={position} onMove={onChange} readOnly={readOnly} />
      </MapContainer>
    </div>
  );
}
