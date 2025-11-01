import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import DriverControls from "@/components/DriverControls";
import MapView from "@/components/MapView";

export default function DriverPage() {
  const [currentLocation] = useState({ lat: 40.7128, lng: -74.0060 });

  const routes = [
    { id: "1", number: "42", name: "Downtown Express", color: "rgb(59 130 246)" },
    { id: "2", number: "7", name: "Airport Shuttle", color: "rgb(34 197 94)" },
    { id: "3", number: "15", name: "University Line", color: "rgb(239 68 68)" },
    { id: "4", number: "23", name: "Harbor Route", color: "rgb(245 158 11)" },
  ];

  const handleShiftToggle = (isActive: boolean) => {
    console.log('Shift toggled:', isActive);
  };

  const handleRouteChange = (routeId: string) => {
    console.log('Route changed:', routeId);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="bg-card border-b border-border px-4 py-3 shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" data-testid="button-back">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">Driver Mode</h1>
            <p className="text-sm text-muted-foreground">Control your shift</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-4">
          <DriverControls
            routes={routes}
            onShiftToggle={handleShiftToggle}
            onRouteChange={handleRouteChange}
          />

          <div className="h-[400px] rounded-md overflow-hidden border border-border">
            <MapView
              buses={[
                {
                  id: "current-location",
                  routeNumber: "You",
                  routeColor: "rgb(217 70 239)",
                  lat: currentLocation.lat,
                  lng: currentLocation.lng,
                }
              ]}
              center={[currentLocation.lat, currentLocation.lng]}
              zoom={15}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
