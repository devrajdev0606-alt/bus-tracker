import { useState } from 'react';
import RouteChip from '../RouteChip';

export default function RouteChipExample() {
  const [activeRoute, setActiveRoute] = useState<string | null>("42");

  return (
    <div className="flex gap-2 p-4 overflow-x-auto">
      <RouteChip
        routeNumber="42"
        routeName="Downtown"
        routeColor="rgb(59 130 246)"
        activeBusCount={3}
        isActive={activeRoute === "42"}
        onClick={() => setActiveRoute("42")}
      />
      <RouteChip
        routeNumber="7"
        routeName="Airport"
        routeColor="rgb(34 197 94)"
        activeBusCount={2}
        isActive={activeRoute === "7"}
        onClick={() => setActiveRoute("7")}
      />
      <RouteChip
        routeNumber="15"
        routeName="University"
        routeColor="rgb(239 68 68)"
        activeBusCount={1}
        isActive={activeRoute === "15"}
        onClick={() => setActiveRoute("15")}
      />
    </div>
  );
}
