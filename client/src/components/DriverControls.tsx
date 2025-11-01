import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Battery, Clock, Navigation2 } from "lucide-react";
import LiveStatusBadge from "./LiveStatusBadge";

interface Route {
  id: string;
  number: string;
  name: string;
  color: string;
}

interface DriverControlsProps {
  routes: Route[];
  onShiftToggle?: (isActive: boolean) => void;
  onRouteChange?: (routeId: string) => void;
}

export default function DriverControls({ routes, onShiftToggle, onRouteChange }: DriverControlsProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<string>("");
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "reconnecting">("disconnected");

  const handleSharingToggle = (checked: boolean) => {
    setIsSharing(checked);
    setConnectionStatus(checked ? "connected" : "disconnected");
    console.log('Location sharing toggled:', checked);
  };

  const handleShiftToggle = () => {
    const newShiftStatus = !isSharing;
    setIsSharing(newShiftStatus);
    setConnectionStatus(newShiftStatus ? "connected" : "disconnected");
    onShiftToggle?.(newShiftStatus);
    console.log('Shift toggled:', newShiftStatus);
  };

  const handleRouteChange = (routeId: string) => {
    setSelectedRoute(routeId);
    onRouteChange?.(routeId);
    console.log('Route changed to:', routeId);
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Driver Controls</h3>
          </div>
          <LiveStatusBadge 
            status={connectionStatus} 
            lastUpdate={isSharing ? new Date() : undefined}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted rounded-md">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${isSharing ? 'bg-status-online' : 'bg-muted-foreground'}`}>
                <Navigation2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <Label htmlFor="location-sharing" className="text-base font-medium cursor-pointer">
                  Share Location
                </Label>
                <p className="text-sm text-muted-foreground">Enable GPS tracking</p>
              </div>
            </div>
            <Switch 
              id="location-sharing" 
              checked={isSharing} 
              onCheckedChange={handleSharingToggle}
              data-testid="switch-location-sharing"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="route-select">Current Route</Label>
            <Select value={selectedRoute} onValueChange={handleRouteChange}>
              <SelectTrigger id="route-select" data-testid="select-route">
                <SelectValue placeholder="Select your route" />
              </SelectTrigger>
              <SelectContent>
                {routes.map(route => (
                  <SelectItem key={route.id} value={route.id}>
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-4 w-4 rounded"
                        style={{ backgroundColor: route.color }}
                      />
                      <span>Route {route.number} - {route.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="flex flex-col items-center p-3 bg-card rounded-md border">
              <Battery className="h-5 w-5 text-muted-foreground mb-1" />
              <span className="text-sm font-semibold" data-testid="text-battery">87%</span>
              <span className="text-xs text-muted-foreground">Battery</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-card rounded-md border">
              <Navigation2 className="h-5 w-5 text-muted-foreground mb-1" />
              <span className="text-sm font-semibold" data-testid="text-distance">24 km</span>
              <span className="text-xs text-muted-foreground">Distance</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-card rounded-md border">
              <Clock className="h-5 w-5 text-muted-foreground mb-1" />
              <span className="text-sm font-semibold" data-testid="text-active-time">2h 15m</span>
              <span className="text-xs text-muted-foreground">Active</span>
            </div>
          </div>

          <Button 
            className="w-full" 
            size="lg"
            variant={isSharing ? "destructive" : "default"}
            onClick={handleShiftToggle}
            data-testid="button-shift-toggle"
          >
            {isSharing ? "End Shift" : "Start Shift"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
