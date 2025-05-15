# System Patterns

Last Updated: March 15, 2025 14:30 UTC

## Architecture Overview
1. **Frontend Architecture**
   - React components for UI
   - React Flow for agent visualization
   - Zustand stores for state management
   - React Router for navigation

2. **Backend Integration**
   - Supabase for primary database
   - Neo4j for graph relationships
   - Pinecone for vector storage
   - MCP servers for agent coordination

## Design Patterns
1. **Component Patterns**
   - Atomic design methodology
   - Compound components for complex UI
   - Render props for flexible layouts
   - Custom hooks for shared logic

2. **State Management**
   - Store slices by feature
   - Action creators for complex operations
   - Local component state for route-specific UI preferences
   - Global state only for app-wide settings
   - Clear separation between global and local state
  - Real-time notification state via WebSocket

3. **Data Flow Patterns**
   - Unidirectional data flow
   - Event-driven updates
   - Optimistic UI updates
   - Error boundary implementation
  - Notifications System (Added March 15, 2025):
    - Real-time updates via WebSocket
    - Optimistic UI updates for actions
    - Known Issues:
      - Action buttons alignment with unread indicator
        - Current: Left-aligned under content
        - Expected: Right-aligned under indicator
        - Investigation needed for flex/grid behavior
        - Added: March 15, 2025 14:30 UTC
    - Action Handlers:
      - Star: Toggle starred status with optimistic update
      - Save: Toggle saved status with optimistic update
      - Dismiss: Mark as read with optimistic update

## Implementation Paths
1. **Authentication Flow**
   ```
   Login -> PKCE Flow -> Session Management -> Protected Routes
   ```

2. **Notification Flow**
  ```
  WebSocket Connection -> Subscribe to Channel -> 
  Receive Event -> Store Update -> UI Update -> 
  User Action -> Optimistic Update -> 
  API Call -> Store Update -> WebSocket Broadcast
  ```

3. **Agent Configuration**
   ```
   Agent Setup -> Memory Config -> Integration Setup -> Deployment
   ```

4. **Organization Management**
   ```
   Create Org -> Configure Resources -> Add Users -> Set Permissions
   ```

## Component Relationships
1. **Flow Editor**
   - Canvas manages node state
   - Nodes communicate through edges
   - Sidebar provides tools
   - Panel shows node details

2. **Data Management**
   - Database connections
   - Memory systems
   - Document storage
   - Analytics collection

3. **User Management**
   - Authentication
   - Authorization
   - Role management
   - Access control

## Technical Decisions
1. **State Management**
   - Why Zustand:
     - Simple API
     - TypeScript support
     - Minimal boilerplate
     - Good performance
   - State Scope Guidelines:
     - Global state: Authentication, theme, sidebar
     - Local state: Route-specific preferences, temporary UI state
     - Component state: Internal component behavior

2. **Styling Solution**
   - Why Tailwind:
     - Rapid development
     - Consistent design
     - Good performance
     - Easy customization

3. **Visualization**
   - Why React Flow:
     - Built for node editors
     - Extensive customization
     - Good performance
     - Active maintenance