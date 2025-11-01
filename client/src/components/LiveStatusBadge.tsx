import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff, RefreshCw } from "lucide-react";

interface LiveStatusBadgeProps {
  status: "connected" | "disconnected" | "reconnecting";
  lastUpdate?: Date;
}

export default function LiveStatusBadge({ status, lastUpdate }: LiveStatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "connected":
        return {
          icon: Wifi,
          text: "Live",
          className: "bg-status-online text-white border-0",
          pulseColor: "bg-status-online"
        };
      case "reconnecting":
        return {
          icon: RefreshCw,
          text: "Reconnecting",
          className: "bg-status-away text-white border-0",
          pulseColor: "bg-status-away"
        };
      case "disconnected":
        return {
          icon: WifiOff,
          text: "Offline",
          className: "bg-status-offline text-white border-0",
          pulseColor: ""
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;
  const timeSince = lastUpdate ? Math.floor((Date.now() - lastUpdate.getTime()) / 1000) : 0;

  return (
    <div className="flex items-center gap-2">
      <Badge className={`${config.className} flex items-center gap-1.5 px-2.5`} data-testid="badge-live-status">
        <div className="relative">
          <Icon className="h-3 w-3" />
          {status === "connected" && (
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.pulseColor} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${config.pulseColor}`}></span>
            </span>
          )}
        </div>
        <span className="text-xs font-semibold">{config.text}</span>
      </Badge>
      {lastUpdate && status === "connected" && (
        <span className="text-xs text-muted-foreground" data-testid="text-last-update">
          {timeSince < 60 ? `${timeSince}s ago` : `${Math.floor(timeSince / 60)}m ago`}
        </span>
      )}
    </div>
  );
}
