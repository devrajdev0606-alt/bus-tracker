# Bus Tracker

Real-time bus tracking application with driver location sharing and passenger tracking.

## Features

- **Passenger View**: Track buses in real-time on an interactive map
- **Driver Mode**: Share GPS location with automatic updates
- **Route Filtering**: View specific routes and estimated arrival times
- **Mobile Responsive**: Optimized for both mobile and desktop
- **Real-time Updates**: WebSocket-ready architecture for live tracking

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Leaflet Maps
- **Backend**: Express.js, Node.js
- **Real-time**: WebSocket support (Socket.io ready)
- **UI Components**: Shadcn UI

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be available at `http://localhost:5000`

## Project Structure

- `client/` - React frontend application
- `server/` - Express backend server
- `shared/` - Shared types and schemas

## License

MIT
