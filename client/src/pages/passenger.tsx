import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapIcon, List, Locate } from "lucide-react";
import MapView from "@/components/MapView";
import BusCard, { type BusData } from "@/components/BusCard";
import RouteChip from "@/components/RouteChip";
import LiveStatusBadge from "@/components/LiveStatusBadge";
import BottomNavigation from "@/components/BottomNavigation";

export default function PassengerPage() {
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("map");

  const routes = [
    { id: "1", number: "42", name: "Downtown", color: "rgb(59 130 246)", activeBusCount: 3 },
    { id: "2", number: "7", name: "Airport", color: "rgb(34 197 94)", activeBusCount: 2 },
    { id: "3", number: "15", name: "University", color: "rgb(239 68 68)", activeBusCount: 2 },
    { id: "4", number: "23", name: "Harbor", color: "rgb(245 158 11)", activeBusCount: 1 },
  ];

  const buses: BusData[] = [
    {
      id: "bus-1",
      routeNumber: "42",
      routeName: "Downtown Express",
      routeColor: "rgb(59 130 246)",
      status: "moving",
      currentSpeed: 45,
      eta: "3 min",
      nextStop: "Main Street Station",
      lastUpdated: new Date(Date.now() - 5000)
    },
    {
      id: "bus-2",
      routeNumber: "42",
      routeName: "Downtown Express",
      routeColor: "rgb(59 130 246)",
      status: "stopped",
      currentSpeed: 0,
      eta: "8 min",
      nextStop: "City Hall",
      lastUpdated: new Date(Date.now() - 12000)
    },
    {
      id: "bus-3",
      routeNumber: "7",
      routeName: "Airport Shuttle",
      routeColor: "rgb(34 197 94)",
      status: "moving",
      currentSpeed: 60,
      eta: "12 min",
      nextStop: "Terminal 3",
      lastUpdated: new Date(Date.now() - 3000)
    },
    {
      id: "bus-4",
      routeNumber: "15",
      routeName: "University Line",
      routeColor: "rgb(239 68 68)",
      status: "moving",
      currentSpeed: 38,
      eta: "6 min",
      nextStop: "Science Building",
      lastUpdated: new Date(Date.now() - 7000)
    },
    {
      id: "bus-5",
      routeNumber: "23",
      routeName: "Harbor Route",
      routeColor: "rgb(245 158 11)",
      status: "offline",
      currentSpeed: 0,
      nextStop: "Pier 12",
      lastUpdated: new Date(Date.now() - 300000)
    },
  ];

  const busLocations = [
    { id: "bus-1", routeNumber: "42", routeColor: "rgb(59 130 246)", lat: 40.7128, lng: -74.0060 },
    { id: "bus-2", routeNumber: "42", routeColor: "rgb(59 130 246)", lat: 40.7228, lng: -74.0160 },
    { id: "bus-3", routeNumber: "7", routeColor: "rgb(34 197 94)", lat: 40.7028, lng: -73.9960 },
    { id: "bus-4", routeNumber: "15", routeColor: "rgb(239 68 68)", lat: 40.7328, lng: -74.0260 },
  ];

  const filteredBuses = selectedRoute
    ? buses.filter(bus => bus.routeNumber === routes.find(r => r.id === selectedRoute)?.number)
    : buses;

  const filteredBusLocations = selectedRoute
    ? busLocations.filter(bus => bus.routeNumber === routes.find(r => r.id === selectedRoute)?.number)
    : busLocations;

  const handleBusClick = (busId: string) => {
    console.log('Bus clicked:', busId);
  };

  const handleRecenterMap = () => {
    console.log('Recenter map');
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="bg-card border-b border-border px-4 py-3 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Bus Tracker</h1>
            <p className="text-sm text-muted-foreground">Live tracking</p>
          </div>
          <LiveStatusBadge status="connected" lastUpdate={new Date(Date.now() - 2000)} />
        </div>
      </header>

      <div className="px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-2 mb-3">
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("map")}
            data-testid="button-view-map"
          >
            <MapIcon className="h-4 w-4 mr-2" />
            Map
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            data-testid="button-view-list"
          >
            <List className="h-4 w-4 mr-2" />
            List
          </Button>
        </div>

        <ScrollArea className="w-full">
          <div className="flex gap-2 pb-2">
            <button
              onClick={() => setSelectedRoute(null)}
              className={`
                px-3 py-2 rounded-md border text-sm font-medium shrink-0 transition-all
                hover-elevate active-elevate-2
                ${!selectedRoute 
                  ? 'border-primary bg-primary/10 text-foreground' 
                  : 'border-border bg-card text-foreground'
                }
              `}
              data-testid="button-route-all"
            >
              All Routes
            </button>
            {routes.map(route => (
              <RouteChip
                key={route.id}
                routeNumber={route.number}
                routeName={route.name}
                routeColor={route.color}
                activeBusCount={route.activeBusCount}
                isActive={selectedRoute === route.id}
                onClick={() => setSelectedRoute(route.id === selectedRoute ? null : route.id)}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 overflow-hidden pb-16">
        {viewMode === "map" ? (
          <div className="relative h-full">
            <MapView
              buses={filteredBusLocations}
              center={[40.7128, -74.0060]}
              zoom={13}
              onBusClick={handleBusClick}
            />
            <Button
              size="icon"
              className="absolute bottom-4 right-4 rounded-full shadow-lg"
              onClick={handleRecenterMap}
              data-testid="button-recenter"
            >
              <Locate className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <ScrollArea className="h-full">
            <div className="p-4 space-y-3">
              {filteredBuses.map(bus => (
                <BusCard
                  key={bus.id}
                  bus={bus}
                  onClick={() => handleBusClick(bus.id)}
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
