import { Map, List, Bell, User } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: typeof Map;
}

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const navItems: NavItem[] = [
    { id: "map", label: "Map", icon: Map },
    { id: "routes", label: "Routes", icon: List },
    { id: "notifications", label: "Alerts", icon: Bell },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50" data-testid="nav-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`
                flex flex-col items-center justify-center gap-1 flex-1 h-full
                transition-colors hover-elevate active-elevate-2
                ${isActive ? 'text-primary' : 'text-muted-foreground'}
              `}
              data-testid={`button-nav-${item.id}`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'fill-primary' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
