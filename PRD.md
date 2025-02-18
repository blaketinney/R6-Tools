# **Product Requirements Document (PRD) for Rainbow Six Siege Tactical Tool**

## **1. Overview**
This project is a lightweight web application designed to help a group of friends organize their Rainbow Six Siege knowledge, including callouts, strategies, and match tracking. The app will initially be private but should be designed with potential future public access in mind. Infrastructure must be cost-effective, with a serverless pay-per-use model to minimize ongoing costs.

## **2. Core Features**
### **2.1. Map Callouts & Overlays**
- Interactive maps for each game location.
- Support for multiple floors per map.
- Users can add, edit, and delete callouts.
- Callouts have associated areas (boxes or irregular polygons).
- Predefined and user-defined stair/hatch areas.
- Ability to display two floors simultaneously, with the upper floor semi-transparent.
- Management endpoints to modify the number of maps, define which levels exist on each map, and update the images for each level.

### **2.2. Strat Planning**
- Drag-and-drop interface for placing operators, gadgets, and notes.
- Drawing tools for freehand annotations, arrows (single-floor only), and labeled zones.
- Save/load strategies for each map and floor.
- Screenshot export functionality.

### **2.3. Match Logging**
- Form-based system for logging match details.
- Stores map played, round results, operator picks, and team notes.
- Data visualization of team performance over time.

### **2.4. Callout Quiz**
- Timed quiz mode for testing knowledge of map callouts.
- Two quiz types: Click the correct location or type the callout name.
- Score tracking and potential future leaderboard integration.

## **3. Technology & Infrastructure**
### **3.1. Frontend**
- **Framework:** React (with Vite for performance optimization)
- **UI Library:** ShadCN
- **State Management:** Redux with RTK Query (instead of Zustand)
- **Canvas Drawing:** Konva.js for map overlays and strat planning
- **Routing:** React Router
- **Charting (for match logs):** Recharts.js
- **Bootstrap Frontend:** V0
- **Styling:** Tailwind CSS

### **3.2. Backend**
- **Serverless Architecture:** Supabase Edge Functions
- **Database:** Supabase PostreSQL
- **Authentication:** Supabase Auth
- **Storage:** Vercel Image Storage
- **Caching:** Vercel

### **3.3. Deployment**
- **Frontend Hosting:** Vercel (preferred for ease of use, contingent on cost-effectiveness)
- **Backend Infrastructure:** Supabase & Vercel
- **Database & Storage:** Supabase
- **Domain Management:** Unknown yet

## **4. API Contracts & Data Structures**

### **4.1. Map Management APIs**
#### **GET /maps**
Retrieves a list of all maps.
```json
[
  { "id": "bank", "name": "Bank", "levels": ["basement", "first_floor", "second_floor"] }
]
```
#### **POST /maps**
Adds a new map.
```json
{
  "id": "villa",
  "name": "Villa",
  "levels": ["basement", "first_floor", "second_floor"]
}
```
#### **PUT /maps/{id}**
Updates a map's details.
```json
{
  "name": "Updated Bank",
  "levels": ["basement", "first_floor", "roof"]
}
```
#### **DELETE /maps/{id}**
Deletes a map.

### **4.2. Callout APIs**
#### **GET /callouts?map={mapId}&level={level}**
Retrieves callouts for a given map level.
```json
[
  { "id": "c1", "name": "Red Stairs", "x": 500, "y": 300, "polygon": [[480,290], [520,290], [520,310], [480,310]] }
]
```
#### **POST /callouts**
Adds a new callout.
```json
{
  "mapId": "bank",
  "level": "first_floor",
  "name": "Lobby",
  "x": 400,
  "y": 200,
  "polygon": [[380,190], [420,190], [420,210], [380,210]]
}
```
#### **PUT /callouts/{id}**
Updates a callout.
```json
{
  "name": "Updated Lobby",
  "x": 410,
  "y": 210,
  "polygon": [[390,200], [430,200], [430,220], [390,220]]
}
```
#### **DELETE /callouts/{id}**
Deletes a callout.

### **4.3. Strat Planning APIs**
#### **GET /strats?map={mapId}&level={level}**
Retrieves strategies for a given map level.
```json
[
  { "id": "s1", "name": "Roam Clear", "elements": [{ "type": "operator", "operator": "Sledge", "x": 100, "y": 200 }] }
]
```
#### **POST /strats**
Creates a new strategy.
```json
{
  "mapId": "bank",
  "level": "first_floor",
  "name": "Defensive Hold",
  "elements": [
    { "type": "operator", "operator": "Jäger", "x": 150, "y": 250 }
  ]
}
```
#### **DELETE /strats/{id}**
Deletes a strategy.

### **4.4. Match Logging APIs**
#### **POST /matches**
Logs a new match.
```json
{
  "map": "Bank",
  "result": "win",
  "team": [{ "operator": "Sledge", "player": "User1" }],
  "enemy": [{ "operator": "Valkyrie", "player": "Enemy1" }],
  "notes": "Flanks worked well."
}
```

## **5. Project File Structure**

```
r6s-tools/
├── .github/                    # GitHub Actions workflows
├── public/                     # Static assets
│   ├── maps/                  # Map images
│   └── operators/             # Operator icons
├── src/
│   ├── app/                   # App Router routes and layouts
│   │   ├── (auth)/           # Grouped auth routes
│   │   │   ├── login/        # Login route
│   │   │   └── register/     # Register route
│   │   ├── maps/             # Maps feature routes
│   │   │   ├── [id]/        # Individual map route
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx   # Maps layout
│   │   │   └── page.tsx     # Maps list page
│   │   ├── strats/          # Strats feature routes
│   │   ├── matches/         # Match logging routes
│   │   ├── quiz/            # Quiz feature routes
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/           # Shared UI components
│   │   ├── ui/              # Basic UI components (shadcn/ui)
│   │   │   ├── button.tsx
│   │   │   └── input.tsx
│   │   └── layout/          # Layout components
│   │       ├── header.tsx
│   │       └── sidebar.tsx
│   ├── features/            # Feature modules
│   │   ├── maps/           # Map feature
│   │   │   ├── components/ # Map-specific components
│   │   │   │   ├── map-viewer.tsx
│   │   │   │   └── floor-selector.tsx
│   │   │   ├── hooks/      # Map-specific client hooks
│   │   │   ├── queries/    # Data fetching functions
│   │   │   │   └── maps.ts # fetch functions for maps
│   │   │   ├── actions.ts  # Server actions (mutations)
│   │   │   └── types.ts    # Map-specific types
│   │   ├── callouts/       # Callout feature
│   │   ├── strats/         # Strategy feature
│   │   └── matches/        # Match logging feature
│   ├── lib/                 # Shared utilities and configs
│   │   ├── supabase/       # Supabase client & configs
│   │   ├── utils/          # Utility functions
│   │   └── constants.ts    # Shared constants
│   ├── types/              # Shared TypeScript types
│   └── styles/             # Global styles & Tailwind
├── supabase/               # Supabase configurations
│   ├── functions/          # Edge functions
│   └── migrations/         # Database migrations
├── tests/                  # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example            # Environment variables template
├── .gitignore
├── next.config.js
├── package.json
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

### **5.1 Key Directory Explanations**

- **app/**: Contains all routes using Next.js App Router conventions
  - Each folder represents a route segment
  - `page.tsx` defines the UI for a route
  - `layout.tsx` defines shared layouts
  - `loading.tsx` for loading states
  - `error.tsx` for error handling
  - Route groups (in parentheses) for organizational purposes

- **components/**: Server-first shared components
  - **ui/**: Basic UI components using shadcn/ui
  - **layout/**: Layout components like headers and navigation

- **features/**: Feature-specific logic and components
  - Each feature module contains:
    - **components/**: Feature-specific components (marked as client/server)
    - **hooks/**: Client-side React hooks
    - **queries/**: Data fetching functions using Next.js patterns
    - **actions.ts**: Server actions for mutations
    - **types.ts**: Feature-specific types

- **lib/**: Shared utilities and configurations
  - Primarily server-side code
  - Configuration for external services
  - Shared utility functions

### **5.2 Organization Principles**

1. **Data Fetching and Mutations**:
   - Data fetching done in page.tsx or through fetch functions in queries/
   - Server Actions used for mutations (form submissions, updates, deletes)
   - Route Handlers for complex API endpoints
   - Leverage Next.js caching and revalidation

2. **Server vs Client Components**:
   - Components are server components by default
   - Client components marked with `'use client'` directive
   - Fetch data at the highest possible level in server components
   - Keep client bundle size minimal

3. **Route Organization**:
   - Routes defined by folder structure in `app/`
   - Shared layouts using `layout.tsx`
   - Loading and error states at route level
   - Route groups for logical organization

4. **Feature Organization**:
   - Features contain both client and server code
   - Server actions for data mutations
   - Client components only when necessary
   - Colocated with related route segments

5. **State Management**:
   - Server state managed through server components
   - Client state only when necessary for interactivity
   - Form state managed through React Hook Form
   - Cache management with Next.js cache mechanisms

### **5.3 Key Files by Feature**

Example for the Maps feature:
```
app/maps/
├── page.tsx                # Server component with data fetching
├── layout.tsx             # Maps feature layout
└── [id]/                  # Dynamic route for single map
    ├── page.tsx           # Individual map view with data fetching
    └── loading.tsx        # Loading UI

features/maps/
├── components/
│   ├── map-viewer.tsx    # Client component ('use client')
│   └── floor-selector.tsx
├── queries/
│   └── maps.ts           # Data fetching functions
│   │   ├── getMaps()     # Fetch all maps
│   │   ├── getMapById()  # Fetch single map
│   │   └── getCallouts() # Fetch callouts for map
├── actions.ts            # Server actions for mutations
│   ├── createMap()       # Create new map
│   ├── updateMap()       # Update map
│   └── deleteMap()       # Delete map
└── types.ts              # Map-related types

Example data fetching in page.tsx:
```typescript
// app/maps/page.tsx
import { getMaps } from '@/features/maps/queries/maps'

export default async function MapsPage() {
  const maps = await getMaps() // Server-side data fetching
  return <MapsList maps={maps} />
}
```

Example server action:
```typescript
// features/maps/actions.ts
'use server'

export async function createMap(formData: FormData) {
  const name = formData.get('name')
  // Validate, process, and store data
  await db.maps.create({ name })
  revalidatePath('/maps') // Revalidate the maps route
}
```

### **5.4 Supabase Integration Examples**

#### Query Implementation
```typescript
// features/maps/queries/maps.ts
import { createClient } from '@/lib/supabase/server'

export async function getMaps() {
  const supabase = createClient()
  const { data, error } = await supabase.functions.invoke('get-maps')
  
  if (error) throw new Error('Failed to fetch maps')
  return data
}

export async function getMapById(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase.functions.invoke('get-map', {
    body: { id }
  })
  
  if (error) throw new Error(`Failed to fetch map ${id}`)
  return data
}

export async function getCallouts(mapId: string, level: string) {
  const supabase = createClient()
  const { data, error } = await supabase.functions.invoke('get-callouts', {
    body: { mapId, level }
  })
  
  if (error) throw new Error('Failed to fetch callouts')
  return data
}
```

#### Server Actions Implementation
```typescript
// features/maps/actions.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const MapSchema = z.object({
  name: z.string().min(1),
  levels: z.array(z.string())
})

export async function createMap(formData: FormData) {
  const supabase = createClient()
  
  // Validate form data
  const validated = MapSchema.safeParse({
    name: formData.get('name'),
    levels: formData.getAll('levels')
  })
  
  if (!validated.success) {
    throw new Error('Invalid map data')
  }
  
  // Call Supabase Edge Function
  const { error } = await supabase.functions.invoke('create-map', {
    body: validated.data
  })
  
  if (error) throw new Error('Failed to create map')
  
  // Revalidate the maps list page
  revalidatePath('/maps')
  redirect('/maps')
}

export async function updateMap(id: string, formData: FormData) {
  const supabase = createClient()
  
  const validated = MapSchema.safeParse({
    name: formData.get('name'),
    levels: formData.getAll('levels')
  })
  
  if (!validated.success) {
    throw new Error('Invalid map data')
  }
  
  const { error } = await supabase.functions.invoke('update-map', {
    body: { id, ...validated.data }
  })
  
  if (error) throw new Error('Failed to update map')
  
  revalidatePath(`/maps/${id}`)
  revalidatePath('/maps')
}

export async function deleteMap(id: string) {
  const supabase = createClient()
  
  const { error } = await supabase.functions.invoke('delete-map', {
    body: { id }
  })
  
  if (error) throw new Error('Failed to delete map')
  
  revalidatePath('/maps')
  redirect('/maps')
}
```

#### Usage in Components

```typescript
// app/maps/page.tsx
import { getMaps } from '@/features/maps/queries/maps'
import { MapsList } from '@/features/maps/components/maps-list'
import { CreateMapForm } from '@/features/maps/components/create-map-form'

export default async function MapsPage() {
  // Server-side data fetching
  const maps = await getMaps()
  
  return (
    <div>
      <h1>Maps</h1>
      <MapsList maps={maps} />
      <CreateMapForm />
    </div>
  )
}

// features/maps/components/create-map-form.tsx
'use client'

import { createMap } from '@/features/maps/actions'

export function CreateMapForm() {
  return (
    <form action={createMap}>
      <input name="name" placeholder="Map name" />
      <input name="levels" placeholder="Level name" />
      <button type="submit">Create Map</button>
    </form>
  )
}

// app/maps/[id]/page.tsx
import { getMapById, getCallouts } from '@/features/maps/queries/maps'
import { MapViewer } from '@/features/maps/components/map-viewer'
import { UpdateMapForm } from '@/features/maps/components/update-map-form'

export default async function MapPage({ params }: { params: { id: string } }) {
  // Parallel data fetching
  const [map, callouts] = await Promise.all([
    getMapById(params.id),
    getCallouts(params.id, 'first_floor') // default level
  ])
  
  return (
    <div>
      <h1>{map.name}</h1>
      <MapViewer map={map} callouts={callouts} />
      <UpdateMapForm map={map} />
    </div>
  )
}
```

#### Supabase Client Setup

```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        }
      }
    }
  )
}
```

Key differences between queries and actions:

1. **Queries (`features/maps/queries/`)**:
   - Used for data fetching (GET requests)
   - Called directly in server components
   - Return data for rendering
   - Can be cached and revalidated by Next.js
   - Used with Suspense boundaries

2. **Actions (`features/maps/actions.ts`)**:
   - Marked with `'use server'`
   - Handle form submissions and mutations
   - Include data validation
   - Call revalidation after successful mutations
   - Can redirect after completion
   - Used with React's `action` prop in forms

## **6. Implementation Plan**
_Implementation details remain unchanged._

