import LiveStatusBadge from '../LiveStatusBadge';

export default function LiveStatusBadgeExample() {
  return (
    <div className="space-y-4 p-4">
      <LiveStatusBadge status="connected" lastUpdate={new Date(Date.now() - 3000)} />
      <LiveStatusBadge status="reconnecting" />
      <LiveStatusBadge status="disconnected" />
    </div>
  );
}
