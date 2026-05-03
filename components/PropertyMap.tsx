"use client";

import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  title: string;
  address: string;
}

export default function PropertyMap({ latitude, longitude, title, address }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return;

    // Dynamically import leaflet to avoid SSR issues
    import("leaflet").then((L) => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      // Fix default icon paths
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        center: [latitude, longitude],
        zoom: 15,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const icon = L.divIcon({
        html: `
          <div style="
            background: #1E3A8A;
            color: white;
            padding: 6px 10px;
            border-radius: 8px;
            font-size: 11px;
            font-weight: 600;
            white-space: nowrap;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            position: relative;
          ">
            📍 ${title.substring(0, 20)}${title.length > 20 ? "..." : ""}
            <div style="
              position: absolute;
              bottom: -6px;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 0;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-top: 6px solid #1E3A8A;
            "></div>
          </div>
        `,
        className: "",
        iconAnchor: [60, 40],
      });

      L.marker([latitude, longitude], { icon })
        .addTo(map)
        .bindPopup(`<b>${title}</b><br/>${address}`)
        .openPopup();

      // Add a circle for approximate area
      L.circle([latitude, longitude], {
        color: "#1D4ED8",
        fillColor: "#3B82F6",
        fillOpacity: 0.1,
        radius: 300,
        weight: 1,
      }).addTo(map);

      mapInstanceRef.current = map;
    });

    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, [latitude, longitude, title, address]);

  return (
    <div className="rounded-xl overflow-hidden border border-slate-200">
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-200">
        <MapPin className="w-4 h-4 text-primary-600" />
        <span className="text-sm font-medium text-slate-700 truncate">{address}</span>
      </div>
      <div ref={mapRef} className="w-full h-72" />
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
    </div>
  );
}
