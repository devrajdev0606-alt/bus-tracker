import DriverControls from '../DriverControls';

export default function DriverControlsExample() {
  const sampleRoutes = [
    { id: "1", number: "42", name: "Downtown Express", color: "rgb(59 130 246)" },
    { id: "2", number: "7", name: "Airport Shuttle", color: "rgb(34 197 94)" },
    { id: "3", number: "15", name: "University Line", color: "rgb(239 68 68)" }
  ];

  return (
    <div className="p-4 max-w-md">
      <DriverControls 
        routes={sampleRoutes}
        onShiftToggle={(isActive) => console.log('Shift active:', isActive)}
        onRouteChange={(routeId) => console.log('Route changed:', routeId)}
      />
    </div>
  );
}
