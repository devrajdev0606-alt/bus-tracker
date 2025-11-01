import { Badge } from "@/components/ui/badge";

interface RouteChipProps {
  routeNumber: string;
  routeName: string;
  routeColor: string;
  activeBusCount: number;
  isActive: boolean;
  onClick: () => void;
}

export default function RouteChip({ 
  routeNumber, 
  routeName, 
  routeColor, 
  activeBusCount, 
  isActive, 
  onClick 
}: RouteChipProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-md border transition-all shrink-0
        hover-elevate active-elevate-2
        ${isActive 
          ? 'border-primary bg-primary/10' 
          : 'border-border bg-card'
        }
      `}
      data-testid={`button-route-${routeNumber}`}
    >
      <div
        className="flex items-center justify-center h-6 w-6 rounded text-white text-xs font-bold"
        style={{ backgroundColor: routeColor }}
      >
        {routeNumber}
      </div>
      <div className="flex flex-col items-start gap-0.5">
        <span className="text-sm font-medium leading-none">{routeName}</span>
        <span className="text-xs text-muted-foreground leading-none">
          {activeBusCount} {activeBusCount === 1 ? 'bus' : 'buses'}
        </span>
      </div>
    </button>
  );
}
