// Base Types
interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

// Map Types
interface Map extends BaseEntity {
  name: string;
  levels: string[];
}

interface MapCreateInput {
  name: string;
  levels: string[];
}

interface MapUpdateInput {
  name?: string;
  levels?: string[];
}

// Callout Types
interface Callout extends BaseEntity {
  mapId: string;
  level: string;
  name: string;
  x: number;
  y: number;
  polygon: [number, number][]; // Array of [x, y] coordinates
}

interface CalloutCreateInput {
  mapId: string;
  level: string;
  name: string;
  x: number;
  y: number;
  polygon: [number, number][];
}

interface CalloutUpdateInput {
  name?: string;
  x?: number;
  y?: number;
  polygon?: [number, number][];
}

// Match Types
interface Player {
  operator: string;
  player: string;
}

interface Match extends BaseEntity {
  map: string;
  result: 'win' | 'loss' | 'draw';
  team: Player[];
  enemy: Player[];
  notes?: string;
}

interface MatchCreateInput {
  map: string;
  result: 'win' | 'loss' | 'draw';
  team: Player[];
  enemy: Player[];
  notes?: string;
}

// Strategy Drawing Types
type Point = [number, number]; // [x, y] coordinate
type Color = string; // hex color code

interface DrawingStyle {
  color: Color;
  width: number;
  opacity: number;
  dashPattern?: number[]; // For dashed lines [dash length, gap length]
}

interface BaseStrategyElement {
  id: string;
  type: string;
  style: DrawingStyle;
  layer: number; // For z-index ordering
}

// Line Types
interface StraightLine extends BaseStrategyElement {
  type: 'straight-line';
  start: Point;
  end: Point;
}

interface AngleLine extends BaseStrategyElement {
  type: 'angle-line';
  points: Point[]; // Array of points forming 90-degree angles
}

interface CurvedLine extends BaseStrategyElement {
  type: 'curved-line';
  points: Point[]; // Control points for the curve
  curveType: 'bezier' | 'arc';
  controlPoints?: Point[]; // Optional bezier control points
}

interface FreehandLine extends BaseStrategyElement {
  type: 'freehand-line';
  points: Point[]; // Array of points forming the line
  smoothing?: number; // Optional smoothing factor
}

// Existing element types updated
interface OperatorElement extends BaseStrategyElement {
  type: 'operator';
  position: Point;
  operator: string;
  rotation?: number; // Rotation in degrees
  label?: string;
}

interface GadgetElement extends BaseStrategyElement {
  type: 'gadget';
  position: Point;
  gadgetType: string;
  rotation?: number;
  label?: string;
}

interface NoteElement extends BaseStrategyElement {
  type: 'note';
  position: Point;
  text: string;
  width?: number;
  height?: number;
  backgroundColor?: Color;
}

// Arrow Types
interface ArrowStyle extends DrawingStyle {
  headSize: number;
  headType: 'simple' | 'filled' | 'double';
}

interface ArrowElement extends BaseStrategyElement {
  type: 'arrow';
  points: Point[]; // Can be straight or have multiple points
  style: ArrowStyle;
  label?: string;
}

// Area Types
interface AreaElement extends BaseStrategyElement {
  type: 'area';
  points: Point[];
  fill: Color;
  fillOpacity: number;
  label?: string;
  pattern?: 'solid' | 'striped' | 'dotted';
}

// Combined type for all possible strategy elements
type StrategyElement = 
  | StraightLine 
  | AngleLine 
  | CurvedLine 
  | FreehandLine 
  | OperatorElement 
  | GadgetElement 
  | NoteElement 
  | ArrowElement 
  | AreaElement;

// Updated Strategy interface
interface Strategy extends BaseEntity {
  mapId: string;
  level: string;
  name: string;
  elements: StrategyElement[];
  version: number; // For handling undo/redo
  metadata?: {
    author?: string;
    tags?: string[];
    description?: string;
  };
}

// Drawing Action Types (for undo/redo)
type DrawingActionType = 
  | 'add'
  | 'remove'
  | 'modify'
  | 'move'
  | 'rotate'
  | 'style'
  | 'layer';

interface DrawingAction {
  type: DrawingActionType;
  elementId: string;
  before: Partial<StrategyElement>;
  after: Partial<StrategyElement>;
  timestamp: number;
}

// Drawing State
interface DrawingState {
  currentTool: string;
  selectedElements: string[];
  activeStyle: DrawingStyle;
  scale: number;
  gridEnabled: boolean;
  gridSize: number;
  snapToGrid: boolean;
  history: DrawingAction[];
  historyIndex: number;
}

// Form Data Types (updated)
interface StrategyFormData {
  mapId: string;
  level: string;
  name: string;
  elements: string; // JSON string of StrategyElement[]
  version: string; // Will be parsed to number
  metadata?: string; // JSON string of metadata
}

// API Response Types
interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
}

// Map API Responses
interface GetMapsResponse extends ApiResponse<Map[]> {}
interface GetMapResponse extends ApiResponse<Map> {}
interface CreateMapResponse extends ApiResponse<Map> {}
interface UpdateMapResponse extends ApiResponse<Map> {}
interface DeleteMapResponse extends ApiResponse<void> {}

// Callout API Responses
interface GetCalloutsResponse extends ApiResponse<Callout[]> {}
interface GetCalloutResponse extends ApiResponse<Callout> {}
interface CreateCalloutResponse extends ApiResponse<Callout> {}
interface UpdateCalloutResponse extends ApiResponse<Callout> {}
interface DeleteCalloutResponse extends ApiResponse<void> {}

// Strategy API Responses
interface GetStratsResponse extends ApiResponse<Strategy[]> {}
interface GetStratResponse extends ApiResponse<Strategy> {}
interface CreateStratResponse extends ApiResponse<Strategy> {}
interface DeleteStratResponse extends ApiResponse<void> {}

// Match API Responses
interface CreateMatchResponse extends ApiResponse<Match> {}

// Query Parameters
interface GetCalloutsParams {
  mapId: string;
  level: string;
}

interface GetStratsParams {
  mapId: string;
  level: string;
}

// Supabase Edge Function Parameters
interface EdgeFunctionParams<T> {
  body: T;
}

// Example usage of Edge Function Parameters:
type CreateMapParams = EdgeFunctionParams<MapCreateInput>;
type UpdateMapParams = EdgeFunctionParams<MapUpdateInput & { id: string }>;
type CreateCalloutParams = EdgeFunctionParams<CalloutCreateInput>;
type UpdateCalloutParams = EdgeFunctionParams<CalloutUpdateInput & { id: string }>;
type CreateStrategyParams = EdgeFunctionParams<StrategyCreateInput>;
type CreateMatchParams = EdgeFunctionParams<MatchCreateInput>;

// Utility Types
type Level = 'basement' | 'first_floor' | 'second_floor' | 'roof';
type MapId = string;
type CalloutId = string;
type StrategyId = string;
type MatchId = string;

// Form Data Types
interface MapFormData {
  name: string;
  levels: string; // Comma-separated list of levels
}

interface CalloutFormData {
  mapId: string;
  level: string;
  name: string;
  x: string; // Will be parsed to number
  y: string; // Will be parsed to number
  polygon: string; // JSON string of coordinate pairs
}

interface MatchFormData {
  map: string;
  result: 'win' | 'loss' | 'draw';
  team: string; // JSON string of Player[]
  enemy: string; // JSON string of Player[]
  notes?: string;
}

// Database Types (SQL-friendly)
interface DbBaseEntity {
  id: string;
  created_at?: string;
  updated_at?: string;
}

// Map Tables
interface DbMap extends DbBaseEntity {
  name: string;
}

interface DbMapLevel extends DbBaseEntity {
  map_id: string;
  level: Level;
  order: number;
}

// Callout Table
interface DbCallout extends DbBaseEntity {
  map_id: string;
  level: string;
  name: string;
  x: number;
  y: number;
  polygon_json: string; // Stored as JSON string of [number, number][]
}

// Match Tables
interface DbMatch extends DbBaseEntity {
  map_id: string;
  result: 'win' | 'loss' | 'draw';
  notes?: string;
}

interface DbMatchPlayer extends DbBaseEntity {
  match_id: string;
  operator: string;
  player: string;
  team_type: 'friendly' | 'enemy';
}

// Strategy Tables
interface DbStrategy extends DbBaseEntity {
  map_id: string;
  level: string;
  name: string;
  version: number;
  author?: string;
  description?: string;
}

interface DbStrategyTag extends DbBaseEntity {
  strategy_id: string;
  tag: string;
}

interface DbStrategyElement extends DbBaseEntity {
  strategy_id: string;
  type: string;
  layer: number;
  style_json: string; // Stored as JSON string of DrawingStyle
  properties_json: string; // Stored as JSON string of element-specific properties
}

// Mapping Functions (Convert between DB and Application types)
interface MapWithLevels extends Map {
  levels: string[];
}

function dbMapToMap(dbMap: DbMap, dbLevels: DbMapLevel[]): MapWithLevels {
  return {
    id: dbMap.id,
    name: dbMap.name,
    createdAt: dbMap.created_at,
    updatedAt: dbMap.updated_at,
    levels: dbLevels
      .sort((a, b) => a.order - b.order)
      .map(level => level.level)
  };
}

function dbCalloutToCallout(dbCallout: DbCallout): Callout {
  return {
    id: dbCallout.id,
    mapId: dbCallout.map_id,
    level: dbCallout.level,
    name: dbCallout.name,
    x: dbCallout.x,
    y: dbCallout.y,
    polygon: JSON.parse(dbCallout.polygon_json),
    createdAt: dbCallout.created_at,
    updatedAt: dbCallout.updated_at
  };
}

function dbMatchToMatch(
  dbMatch: DbMatch,
  dbPlayers: DbMatchPlayer[]
): Match {
  return {
    id: dbMatch.id,
    map: dbMatch.map_id,
    result: dbMatch.result,
    team: dbPlayers
      .filter(p => p.team_type === 'friendly')
      .map(p => ({ operator: p.operator, player: p.player })),
    enemy: dbPlayers
      .filter(p => p.team_type === 'enemy')
      .map(p => ({ operator: p.operator, player: p.player })),
    notes: dbMatch.notes,
    createdAt: dbMatch.created_at,
    updatedAt: dbMatch.updated_at
  };
}

function dbStrategyToStrategy(
  dbStrategy: DbStrategy,
  dbElements: DbStrategyElement[],
  dbTags: DbStrategyTag[]
): Strategy {
  return {
    id: dbStrategy.id,
    mapId: dbStrategy.map_id,
    level: dbStrategy.level,
    name: dbStrategy.name,
    elements: dbElements.map(e => ({
      ...JSON.parse(e.properties_json),
      style: JSON.parse(e.style_json),
      layer: e.layer,
      id: e.id,
      type: e.type
    })),
    version: dbStrategy.version,
    metadata: {
      author: dbStrategy.author,
      description: dbStrategy.description,
      tags: dbTags.map(t => t.tag)
    },
    createdAt: dbStrategy.created_at,
    updatedAt: dbStrategy.updated_at
  };
}

// SQL Schema (for reference)
/*
CREATE TABLE maps (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE map_levels (
  id TEXT PRIMARY KEY,
  map_id TEXT REFERENCES maps(id) ON DELETE CASCADE,
  level TEXT NOT NULL,
  order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(map_id, level)
);

CREATE TABLE callouts (
  id TEXT PRIMARY KEY,
  map_id TEXT REFERENCES maps(id) ON DELETE CASCADE,
  level TEXT NOT NULL,
  name TEXT NOT NULL,
  x NUMERIC NOT NULL,
  y NUMERIC NOT NULL,
  polygon_json JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE matches (
  id TEXT PRIMARY KEY,
  map_id TEXT REFERENCES maps(id) ON DELETE SET NULL,
  result TEXT NOT NULL CHECK (result IN ('win', 'loss', 'draw')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE match_players (
  id TEXT PRIMARY KEY,
  match_id TEXT REFERENCES matches(id) ON DELETE CASCADE,
  operator TEXT NOT NULL,
  player TEXT NOT NULL,
  team_type TEXT NOT NULL CHECK (team_type IN ('friendly', 'enemy')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE strategies (
  id TEXT PRIMARY KEY,
  map_id TEXT REFERENCES maps(id) ON DELETE CASCADE,
  level TEXT NOT NULL,
  name TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  author TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE strategy_tags (
  id TEXT PRIMARY KEY,
  strategy_id TEXT REFERENCES strategies(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(strategy_id, tag)
);

CREATE TABLE strategy_elements (
  id TEXT PRIMARY KEY,
  strategy_id TEXT REFERENCES strategies(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  layer INTEGER NOT NULL,
  style_json JSONB NOT NULL,
  properties_json JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
*/
