import MapView from '../MapView';

export default function MapViewExample() {
  const sampleBuses = [
    {
      id: "bus-1",
      routeNumber: "42",
      routeColor: "rgb(59 130 246)",
      lat: 40.7128,
      lng: -74.0060,
    },
    {
      id: "bus-2",
      routeNumber: "7",
      routeColor: "rgb(34 197 94)",
      lat: 40.7228,
      lng: -74.0160,
    },
    {
      id: "bus-3",
      routeNumber: "15",
      routeColor: "rgb(239 68 68)",
      lat: 40.7028,
      lng: -73.9960,
    },
  ];

  return (
    <div className="h-[500px] w-full">
      <MapView 
        buses={sampleBuses}
        center={[40.7128, -74.0060]}
        zoom={13}
        onBusClick={(busId) => console.log('Bus clicked:', busId)}
      />
    </div>
  );
}
