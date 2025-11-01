import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bus, Navigation2, MapPin } from "lucide-react";
import { Link } from "wouter";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-card border-b border-border px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
              <Bus className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Bus Tracker</h1>
              <p className="text-sm text-muted-foreground">Real-time location tracking</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Welcome to Bus Tracker</h2>
            <p className="text-lg text-muted-foreground">
              Track buses in real-time or start sharing your location as a driver
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/passenger">
              <Card className="p-6 hover-elevate active-elevate-2 cursor-pointer" data-testid="card-passenger">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary/10">
                    <MapPin className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Passenger</h3>
                    <p className="text-muted-foreground mb-4">
                      View live bus locations and track arrival times on an interactive map
                    </p>
                  </div>
                  <Button className="w-full" size="lg" data-testid="button-passenger">
                    Track Buses
                  </Button>
                </div>
              </Card>
            </Link>

            <Link href="/driver">
              <Card className="p-6 hover-elevate active-elevate-2 cursor-pointer" data-testid="card-driver">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary/10">
                    <Navigation2 className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Driver</h3>
                    <p className="text-muted-foreground mb-4">
                      Share your GPS location with passengers and manage your route
                    </p>
                  </div>
                  <Button className="w-full" size="lg" data-testid="button-driver">
                    Start Driving
                  </Button>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-card border-t border-border px-4 py-4 text-center text-sm text-muted-foreground">
        <p>Bus Tracker &copy; 2024 - Real-time GPS tracking for public transportation</p>
      </footer>
    </div>
  );
}
