import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bus, Navigation, Clock } from "lucide-react";

export interface BusData {
  id: string;
  routeNumber: string;
  routeName: string;
  routeColor: string;
  status: "moving" | "stopped" | "offline";
  currentSpeed: number;
  eta?: string;
  nextStop?: string;
  lastUpdated: Date;
}

interface BusCardProps {
  bus: BusData;
  onClick?: () => void;
}

export default function BusCard({ bus, onClick }: BusCardProps) {
  const getStatusConfig = () => {
    switch (bus.status) {
      case "moving":
        return {
          color: "bg-status-online",
          text: "Moving"
        };
      case "stopped":
        return {
          color: "bg-status-away",
          text: "Stopped"
        };
      case "offline":
        return {
          color: "bg-status-offline",
          text: "Offline"
        };
    }
  };

  const statusConfig = getStatusConfig();
  const timeSince = Math.floor((Date.now() - bus.lastUpdated.getTime()) / 1000);
  const timeText = timeSince < 60 ? `${timeSince}s ago` : `${Math.floor(timeSince / 60)}m ago`;

  return (
    <Card
      className="p-4 hover-elevate active-elevate-2 cursor-pointer"
      onClick={onClick}
      data-testid={`card-bus-${bus.id}`}
    >
      <div className="flex items-start gap-4">
        <div
          className="flex items-center justify-center min-h-12 min-w-12 rounded-md text-white font-bold text-lg"
          style={{ backgroundColor: bus.routeColor }}
          data-testid={`badge-route-${bus.routeNumber}`}
        >
          {bus.routeNumber}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base truncate" data-testid="text-route-name">
                {bus.routeName}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1.5">
                  <div className={`h-2 w-2 rounded-full ${statusConfig.color}`} />
                  <span className="text-sm text-muted-foreground">{statusConfig.text}</span>
                </div>
                {bus.status === "moving" && (
                  <div className="flex items-center gap-1">
                    <Navigation className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{bus.currentSpeed} km/h</span>
                  </div>
                )}
              </div>
            </div>
            
            {bus.eta && (
              <Badge variant="secondary" className="font-mono font-semibold shrink-0" data-testid="badge-eta">
                {bus.eta}
              </Badge>
            )}
          </div>

          {bus.nextStop && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
              <Bus className="h-3.5 w-3.5" />
              <span className="truncate" data-testid="text-next-stop">{bus.nextStop}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span data-testid="text-last-updated">Updated {timeText}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
