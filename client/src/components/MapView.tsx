import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface BusLocation {
  id: string;
  routeNumber: string;
  routeColor: string;
  lat: number;
  lng: number;
  rotation?: number;
}

interface MapViewProps {
  buses: BusLocation[];
  center?: [number, number];
  zoom?: number;
  onBusClick?: (busId: string) => void;
}

export default function MapView({ buses, center = [40.7128, -74.0060], zoom = 13, onBusClick }: MapViewProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      zoomControl: false,
    }).setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({
      position: 'bottomright'
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const currentBusIds = new Set(buses.map(b => b.id));
    
    markersRef.current.forEach((marker, busId) => {
      if (!currentBusIds.has(busId)) {
        marker.remove();
        markersRef.current.delete(busId);
      }
    });

    buses.forEach(bus => {
      const createBusIcon = (color: string, number: string) => {
        return L.divIcon({
          className: 'custom-bus-marker',
          html: `
            <div style="
              background-color: ${color};
              width: 32px;
              height: 32px;
              border-radius: 50%;
              border: 3px solid white;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
              font-size: 12px;
              font-family: var(--font-sans);
            ">
              ${number}
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });
      };

      let marker = markersRef.current.get(bus.id);
      
      if (marker) {
        marker.setLatLng([bus.lat, bus.lng]);
      } else {
        marker = L.marker([bus.lat, bus.lng], {
          icon: createBusIcon(bus.routeColor, bus.routeNumber)
        }).addTo(mapRef.current!);

        marker.on('click', () => {
          onBusClick?.(bus.id);
        });

        markersRef.current.set(bus.id, marker);
      }
    });
  }, [buses, onBusClick]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full rounded-md overflow-hidden"
      data-testid="map-container"
      style={{ minHeight: '400px' }}
    />
  );
}
