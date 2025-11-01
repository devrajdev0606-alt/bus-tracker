# Bus Tracker Application - Design Guidelines

## Design Approach

**Selected Approach:** Design System with Transit App Patterns
**Primary References:** Google Maps, Citymapper, Transit App
**Justification:** This is a utility-focused application prioritizing real-time information clarity, quick decision-making, and mobile usability. The design must be functional, scannable, and optimized for on-the-go use.

**Core Design Principles:**
1. **Information First:** Map and bus status take visual priority
2. **Instant Clarity:** Users should understand bus positions and ETAs at a glance
3. **Mobile-Optimized:** Touch-friendly targets, thumb-zone placement for critical actions
4. **Real-time Transparency:** Visual feedback for live updates and connection status

---

## Typography

**Font Family:** 
- Primary: Inter or SF Pro Display (via Google Fonts CDN)
- Monospace: JetBrains Mono for time displays and route numbers

**Hierarchy:**
- Route Numbers/Bus IDs: text-2xl font-bold (for quick scanning)
- ETA/Time Information: text-lg font-semibold tracking-tight
- Location Names/Stops: text-base font-medium
- Status Messages: text-sm font-normal
- Helper Text: text-xs text-gray-500

**Mobile Considerations:**
- Minimum tap target of 44px for all interactive elements
- Increase base font size to 16px minimum to prevent iOS zoom

---

## Layout System

**Spacing Scale:** Tailwind units of 2, 4, 6, and 8 for consistency
- Component padding: p-4 (mobile), p-6 (desktop)
- Section spacing: space-y-4
- Card gaps: gap-4
- Map controls: m-4

**Grid Structure:**
- Mobile: Single column, full-width map
- Tablet/Desktop: Split view - 40% sidebar + 60% map (or full-screen map with floating panels)

**Container Strategy:**
- Full viewport height for main interface (h-screen)
- Scrollable lists within fixed containers
- Floating action buttons positioned in bottom-right (fixed positioning)

---

## Component Library

### A. Map Interface Components

**Primary Map Container:**
- Full-width, dynamic height (min-h-[60vh] mobile, h-full desktop)
- Interactive markers for each bus with color-coding by route
- Popup cards on marker click showing: Bus ID, Route Name, Current Speed, Last Updated
- Route polylines with semi-transparent colored paths
- User location indicator (blue pulsing dot)

**Map Controls:**
- Zoom controls: Floating bottom-right, rounded-full buttons with icons
- Center on user location: Floating button with location icon
- Route filter toggle: Top-right floating chip-style buttons

### B. Bus List Components

**Route Selection Panel:**
- Horizontal scrollable chips for route filtering
- Each chip shows: Route number, color indicator, active bus count
- Active state: filled background, inactive: outlined

**Bus Cards:**
- Compact card design with: Bus icon/number, Route name, Current status (Moving/Stopped/Offline), ETA to next stop, Last updated timestamp
- Status indicators: Small colored dots (green=active, yellow=slow, red=stopped, gray=offline)
- Tap to center map on bus location

**List View Toggle:**
- Switch between map-first and list-first views on mobile
- Smooth transition animations (transform, opacity)

### C. Driver Interface Components

**Location Sharing Toggle:**
- Large, prominent toggle switch in header
- Visual confirmation when active (green indicator + pulse animation)
- Connection status badge: "Connected" with timestamp

**Driver Dashboard:**
- Current route selection dropdown
- Battery status indicator (important for GPS tracking)
- Distance traveled today
- Total active time
- Simple one-tap "Start/End Shift" button

### D. Real-time Update Indicators

**Live Status Badge:**
- Fixed top-right position showing "Live" with pulsing green dot
- Offline state: "Offline" with red indicator
- Connection issues: "Reconnecting..." with yellow spinner

**Update Timestamps:**
- "Updated 2 seconds ago" format
- Auto-refresh indicator during data fetch

### E. Navigation Components

**Bottom Navigation (Mobile):**
- 3-4 items: Map, Routes, Notifications, Profile
- Icons from Heroicons (outline style)
- Active state: filled icon + label color change

**Top Header:**
- App title/logo (left)
- Live status (right)
- Search/filter icon (if applicable)

### F. Information Display

**ETA Display Cards:**
- Large, readable time estimate (e.g., "3 min")
- Stop name beneath
- Visual progress indicator (thin progress bar or dots)

**Route Information Panel:**
- Expandable accordion showing all stops
- Current stop highlighted
- Completed stops grayed out
- Upcoming stops with estimated times

---

## Interaction Patterns

**Marker Interactions:**
- Tap marker: Show info popup with bus details
- Tap popup: Expand to full bus details panel

**Real-time Updates:**
- Smooth marker position transitions (CSS transitions, not jumpy)
- Subtle pulse animation on active buses
- Toast notifications for important updates (bus approaching, delays)

**Loading States:**
- Skeleton screens for initial load
- Shimmer effect on loading cards
- Map loading: gray placeholder with spinner

---

## Accessibility & Performance

**Accessibility:**
- All interactive elements minimum 44px touch targets
- Sufficient color contrast (WCAG AA minimum)
- Screen reader labels for all icons
- Keyboard navigation support for desktop

**Performance Optimizations:**
- Lazy load map markers (render only visible buses)
- Throttle location updates (every 3-5 seconds, not real-time stream)
- Progressive Web App capabilities for offline fallback
- Service worker for caching route data

---

## Mobile-Specific Considerations

**Gestures:**
- Swipe up on bus card to expand details
- Pull-to-refresh on bus list
- Pinch-to-zoom on map (native map behavior)

**Thumb Zone Optimization:**
- Primary actions (view map, toggle location) in bottom 1/3 of screen
- Search/filter in top corners (less frequent actions)

---

## Images

**Icon Library:** Heroicons (outline for inactive, solid for active states)

**Map Markers:** Custom SVG markers with route color fills - simple bus icon silhouette

**Placeholder States:** 
- Empty state illustration when no buses active (simple line art of a bus with "No active buses" message)
- Location permission illustration (map icon with location pin)

**No Hero Section:** This is a utility application - users go directly to the functional interface upon opening the app.