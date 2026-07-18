"use client";

import { useState, useRef, useEffect } from "react";
import { DynamicMapPicker } from "@/components/shared/DynamicMapPicker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { MapPin, LocateFixed, Search } from "lucide-react";

const DEFAULT_CENTER = { lat: 17.385, lng: 78.4867 }; // Hyderabad

export interface ConfirmedAddress {
  label: string;
  houseNumber: string;
  area: string;
  landmark: string;
  notes: string;
  lat: number;
  lng: number;
}

export function LocationPicker({ onConfirm }: { onConfirm: (address: ConfirmedAddress) => void }) {
  const [position, setPosition] = useState(DEFAULT_CENTER);
  const [label, setLabel] = useState("");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<{ description: string; placeId: string }[]>([]);
  const [houseNumber, setHouseNumber] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [notes, setNotes] = useState("");
  const [locating, setLocating] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateLabelFromCoords = async (lat: number, lng: number) => {
    try {
      const res = await fetch(`/api/maps/geocode?lat=${lat}&lng=${lng}`);
      const data = await res.json();
      if (data.label) setLabel(data.label);
    } catch {
      /* graceful no-op if Ola Maps isn't configured yet */
    }
  };

  const useCurrentLocation = () => {
    setLocating(true);
    if (!navigator.geolocation) {
      setLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const p = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setPosition(p);
        updateLabelFromCoords(p.lat, p.lng);
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/maps/autocomplete?q=${encodeURIComponent(value)}`);
        const data = await res.json();
        setSuggestions(data.suggestions ?? []);
      } catch {
        setSuggestions([]);
      }
    }, 350);
  };

  const selectSuggestion = async (placeId: string, description: string) => {
    setQuery(description);
    setSuggestions([]);
    try {
      const res = await fetch(`/api/maps/autocomplete?placeId=${placeId}`);
      const data = await res.json();
      if (data.coords) {
        setPosition(data.coords);
        setLabel(description);
      }
    } catch {
      /* no-op */
    }
  };

  useEffect(() => {
    updateLabelFromCoords(position.lat, position.lng);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirm = () => {
    onConfirm({
      label: label || query || "Selected location",
      houseNumber,
      area,
      landmark,
      notes,
      lat: position.lat,
      lng: position.lng,
    });
  };

  return (
    <Card>
      <CardBody className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Delivery location</p>
          <Button size="sm" variant="outline" onClick={useCurrentLocation} disabled={locating}>
            <LocateFixed className="mr-1 h-4 w-4" />
            {locating ? "Locating…" : "Use current location"}
          </Button>
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <Input
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search area, street, landmark…"
            className="pl-9"
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full rounded-md border border-neutral-200 bg-white text-sm shadow-lg dark:border-neutral-800 dark:bg-neutral-950">
              {suggestions.map((s) => (
                <li key={s.placeId}>
                  <button
                    type="button"
                    onClick={() => selectSuggestion(s.placeId, s.description)}
                    className="block w-full px-3 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-900"
                  >
                    {s.description}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <DynamicMapPicker
          lat={position.lat}
          lng={position.lng}
          onChange={(p) => {
            setPosition(p);
            updateLabelFromCoords(p.lat, p.lng);
          }}
        />

        {label && (
          <p className="flex items-start gap-1.5 text-xs text-neutral-500">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {label}
          </p>
        )}

        <div className="grid grid-cols-2 gap-2">
          <Input value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} placeholder="House / flat no." />
          <Input value={area} onChange={(e) => setArea(e.target.value)} placeholder="Area" />
          <Input value={landmark} onChange={(e) => setLandmark(e.target.value)} placeholder="Landmark" />
          <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes (e.g. near water tank)" />
        </div>

        <Button size="sm" className="w-full" onClick={confirm}>
          Confirm address
        </Button>
      </CardBody>
    </Card>
  );
}
