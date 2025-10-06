# Family Tree Web App - Design Guidelines

## Design Approach: Data Visualization System

**Selected Approach**: Utility-focused design system combining Material Design principles with specialized tree visualization patterns, inspired by tools like Notion (clean hierarchy) and Figma (canvas-based interaction).

**Rationale**: This app prioritizes data clarity, relationship visualization, and intuitive editing over visual flourish. Design should enhance comprehension and interaction efficiency.

---

## Core Design Elements

### A. Color Palette

**Dark Mode** (Primary Interface):
- Background: 220 15% 12% (deep slate)
- Surface: 220 15% 16% (elevated cards)
- Border: 220 10% 25% (subtle dividers)
- Primary: 210 100% 60% (bright blue for connections)
- Text Primary: 0 0% 95%
- Text Secondary: 220 10% 65%

**Light Mode**:
- Background: 0 0% 98%
- Surface: 0 0% 100%
- Border: 220 10% 88%
- Primary: 210 100% 50%
- Text Primary: 220 15% 15%
- Text Secondary: 220 10% 45%

**Semantic Colors**:
- Success (add): 142 70% 45%
- Warning (edit): 35 90% 55%
- Family Node: 260 60% 55% (purple)
- Member Node: 190 70% 50% (teal)

### B. Typography

**Font Families**:
- Primary: 'Inter' (Google Fonts) - UI, labels, data
- Monospace: 'JetBrains Mono' - locations, IDs

**Scale**:
- Family Names: text-xl font-semibold (20px)
- Member Names: text-base font-medium (16px)
- Metadata: text-sm (14px)
- Labels: text-xs uppercase tracking-wide (12px)

### C. Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, and 12** (e.g., p-4, gap-6, m-12)

**Canvas Layout**:
- Full viewport canvas with zoom/pan controls
- Tree nodes positioned with absolute positioning
- Control panel: fixed sidebar (w-80) on left
- Toolbar: fixed top bar (h-16)

**Grid Alignment**:
- Snap nodes to 8px grid for clean alignment
- Horizontal spacing between families: 160px
- Vertical spacing between generations: 120px

### D. Component Library

**Tree Visualization**:
- **Family Nodes**: Rounded cards (rounded-xl) with shadow-lg, min-width 240px
  - Header: Family name with expand/collapse icon
  - Collapsed state: Shows member count badge
  - Expanded state: List of members with relationship icons
  - Location tag with pin icon at bottom
  
- **Connection Lines**: SVG paths using primary color
  - Parent-child: Curved bezier paths (stroke-2)
  - Spouse connections: Straight horizontal lines (stroke-1, dashed)

- **Member Cards** (within expanded families):
  - Compact rows with avatar placeholder circle (8px diameter)
  - Name + relationship label (spouse/child/parent)
  - Age in subtle text-secondary
  - Hover reveals edit/delete icons

**Controls & Inputs**:
- **Add Node Button**: Floating action button (fixed bottom-right), rounded-full, w-14 h-14
- **Edit Forms**: Modal overlays with backdrop-blur
  - Form fields: rounded-lg, border-2, focus:ring-2
  - Input groups with clear labels (font-medium text-sm)
  
- **Zoom Controls**: Fixed bottom-left cluster
  - Zoom in/out buttons (rounded-md, p-2)
  - Reset view button
  - Current zoom percentage display

**Navigation & Toolbar**:
- Top bar: App title (left), search family (center), settings icon (right)
- Sidebar: Recently viewed families list, filters (by location/generation)

**Interactive States**:
- Hover: Elevation increase (shadow-xl), scale-105 on nodes
- Active/Selected: Border-2 border-primary with glow effect
- Disabled: opacity-50
- Loading: Subtle pulse animation on cards

### E. Animations

**Minimal & Purposeful**:
- Node expand/collapse: duration-300 ease-in-out
- Connection line drawing: duration-500 when adding relationships
- Zoom transitions: duration-200
- Modal appear: fade + scale from 95% to 100%

**No**: Unnecessary scroll effects, continuous animations, or decorative motion

---

## Images & Icons

**Icons**: Font Awesome via CDN
- Tree structure: `fa-sitemap`
- Add family: `fa-plus-circle`
- Members: `fa-user`, `fa-users`
- Location: `fa-map-marker-alt`
- Edit: `fa-pencil-alt`
- Delete: `fa-trash`
- Expand/collapse: `fa-chevron-down` / `fa-chevron-up`

**No Background Images**: This is a data-focused utility app

---

## Key Interaction Patterns

1. **Canvas Manipulation**: Click-drag to pan, scroll to zoom, double-click node to expand
2. **Node Management**: Click (+) button to add family, hover node for quick actions
3. **Relationship Creation**: Drag from node edge to create parent-child connection
4. **Inline Editing**: Double-click names/locations for quick edit
5. **Keyboard Shortcuts**: Spacebar to fit view, Delete key to remove selected, Escape to close modals

---

## Accessibility & Responsiveness

- High contrast ratios (WCAG AA minimum)
- Keyboard navigation for all actions (Tab, Enter, Arrow keys)
- Screen reader labels on all interactive elements
- Touch targets minimum 44x44px
- Responsive sidebar collapse on < 1024px screens
- Mobile: List view fallback with drill-down navigation