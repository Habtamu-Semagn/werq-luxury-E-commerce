"use client";

import { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Navigation } from "lucide-react";
import debounce from "lodash.debounce";

// Fix for default marker icons in Leaflet with Next.js
const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

interface MapPickerProps {
    onLocationSelected?: (address: {
        address: string;
        city: string;
        postalCode: string;
        country: string;
        lat: number;
        lng: number;
    }) => void;
    initialPosition?: { lat: number; lng: number };
    readOnly?: boolean;
}

function LocationMarker({ onLocationSelected, initialPosition, readOnly }: MapPickerProps) {
    const [position, setPosition] = useState<L.LatLng | null>(initialPosition ? L.latLng(initialPosition.lat, initialPosition.lng) : null);
    const map = useMap();

    const fetchAddress = useMemo(
        () =>
            debounce(async (lat: number, lng: number) => {
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
                    );
                    const data = await response.json();

                    if (data.address) {
                        const { road, house_number, suburb, city, town, village, postcode, country } = data.address;
                        const streetAddress = [road, house_number, suburb].filter(Boolean).join(", ") || "Selected Location";
                        const cityValue = city || town || village || "";

                        if (onLocationSelected) {
                            onLocationSelected({
                                address: streetAddress,
                                city: cityValue,
                                postalCode: postcode || "",
                                country: country || "",
                                lat,
                                lng,
                            });
                        }
                    }
                } catch (error) {
                    console.error("Geocoding error:", error);
                }
            }, 500),
        [onLocationSelected]
    );

    useMapEvents({
        click(e) {
            if (readOnly) return;
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            fetchAddress(e.latlng.lat, e.latlng.lng);

            if (onLocationSelected) {
                // Ensure we call it with coordinates even if fetchAddress is debounced
                // Actually fetchAddress will call onLocationSelected with full data
            }
        },
        locationfound(e) {
            if (readOnly) return;
            setPosition(e.latlng);
            map.flyTo(e.latlng, 16);
            fetchAddress(e.latlng.lat, e.latlng.lng);
        },
    });

    useEffect(() => {
        if (initialPosition && typeof initialPosition.lat === 'number' && typeof initialPosition.lng === 'number') {
            const latlng = L.latLng(initialPosition.lat, initialPosition.lng);
            setPosition(latlng);
            map.setView(latlng, map.getZoom());
        }
    }, [initialPosition, map]);

    // Update fetchAddress to include lat/lng
    useEffect(() => {
        if (position && !initialPosition && onLocationSelected) {
            // This is handled by the click handler calling fetchAddress
        }
    }, [position, initialPosition, onLocationSelected]);

    return position === null ? null : (
        <Marker position={position} icon={icon} />
    );
}

function LocateControl() {
    const map = useMap();
    const handleLocate = () => {
        map.locate();
    };

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                handleLocate();
            }}
            className="absolute bottom-6 right-6 z-[1000] bg-background border border-foreground/10 p-3 rounded-full shadow-lg hover:bg-muted transition-colors group"
            title="Locate Me"
        >
            <Navigation className="w-4 h-4 text-foreground group-hover:scale-110 transition-transform" />
        </button>
    );
}

export default function MapPicker({ onLocationSelected, initialPosition, readOnly }: MapPickerProps) {
    const center: L.LatLngExpression = initialPosition ? [initialPosition.lat, initialPosition.lng] : [9.03, 38.74];

    return (
        <div className={`h-[300px] w-full rounded-sm overflow-hidden border border-foreground/10 mb-6 group relative ${readOnly ? "cursor-default" : ""}`}>
            {!readOnly && (
                <div className="absolute inset-0 bg-foreground/5 pointer-events-none group-hover:opacity-0 transition-opacity z-[1000] flex items-center justify-center">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground bg-background/80 px-4 py-2 rounded-full border border-foreground/10">Click to select location on map</p>
                </div>
            )}
            <MapContainer
                center={center}
                zoom={initialPosition ? 15 : 13}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker onLocationSelected={onLocationSelected} initialPosition={initialPosition} readOnly={readOnly} />
                {!readOnly && <LocateControl />}
            </MapContainer>
        </div>
    );
}
