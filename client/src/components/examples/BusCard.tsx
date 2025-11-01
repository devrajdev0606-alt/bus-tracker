import BusCard from '../BusCard';

export default function BusCardExample() {
  const sampleBus = {
    id: "bus-1",
    routeNumber: "42",
    routeName: "Downtown Express",
    routeColor: "rgb(59 130 246)",
    status: "moving" as const,
    currentSpeed: 45,
    eta: "3 min",
    nextStop: "Main Street Station",
    lastUpdated: new Date(Date.now() - 5000)
  };

  return (
    <div className="p-4 space-y-4 max-w-md">
      <BusCard bus={sampleBus} onClick={() => console.log('Bus card clicked')} />
      <BusCard 
        bus={{
          ...sampleBus,
          id: "bus-2",
          routeNumber: "7",
          routeName: "Airport Shuttle",
          routeColor: "rgb(34 197 94)",
          status: "stopped",
          currentSpeed: 0,
          eta: "12 min"
        }} 
      />
    </div>
  );
}
