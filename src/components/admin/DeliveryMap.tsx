"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { Order } from "@/lib/data/mock";

const pinIcon = L.divIcon({
  className: "",
  html: `<div style="width:16px;height:16px;border-radius:50%;background:#171717;border:3px solid white;box-shadow:0 0 0 1px #171717;"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const HYDERABAD_CENTER: [number, number] = [17.4, 78.45];

export function DeliveryMap({ orders }: { orders: Order[] }) {
  const withCoords = orders.filter((o) => o.lat != null && o.lng != null);

  return (
    <div className="relative z-0 h-[320px] overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-800">
      <MapContainer center={HYDERABAD_CENTER} zoom={11} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        {withCoords.map((o) => (
          <Marker key={o.id} position={[o.lat!, o.lng!]} icon={pinIcon}>
            <Popup>
              <div className="text-sm">
                <p className="font-medium">#{o.id}</p>
                <p>{o.customer_name}</p>
                <p className="text-neutral-500">{o.address_label}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
