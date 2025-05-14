# Technical Context

## Development Stack
1. **Frontend Framework**
   - React 18.3.1
   - TypeScript 5.5.3
   - Vite 5.4.2

2. **Styling**
   - Tailwind CSS 3.4.1
   - PostCSS 8.4.35
   - Autoprefixer 10.4.18

3. **State Management**
   - Zustand 4.4.4

4. **Routing**
   - React Router DOM 6.22.3

5. **Data Visualization**
   - React Flow 11.10.4
   - Dagre 0.8.5

## Backend Services
1. **Primary Database**
   - Supabase
   - PostgreSQL with RLS

2. **Vector Database**
   - Pinecone
   - Used for embeddings and similarity search

3. **Graph Database**
   - Neo4j
   - Stores relationship data

4. **MCP Servers**
   - Custom Message Coordination Protocol
   - Manages agent communication

## Development Environment
1. **Required Tools**
   - Node.js 18+
   - npm 9+
   - Git

2. **Environment Variables**
   ```
   VITE_SUPABASE_URL=https://data.remodl.ai
   VITE_SUPABASE_ANON_KEY=<key>
   VITE_AUTH_ENDPOINT=https://workflow.remodl.ai/api/v1/auth/confirm
   ```

## Dependencies
1. **Core Dependencies**
   - @supabase/supabase-js
   - @supabase/auth-ui-react
   - reactflow
   - lucide-react
   - date-fns
   - clsx
   - tailwind-merge

2. **Development Dependencies**
   - TypeScript
   - ESLint
   - PostCSS
   - Autoprefixer
   - Tailwind CSS

## Deployment
1. **Production Environment**
   - All requests route through API gateway
   - Full security measures enabled
   - Production-only features active

2. **Development Environment**
   - Direct backend connections allowed
   - Debug features enabled
   - Reduced security for testing

## Tool Usage Patterns
1. **Code Organization**
   - Feature-based directory structure
   - Shared components in common directory
   - Hooks and utilities separated

2. **State Management**
   - Zustand stores per feature
   - Local state for UI-only components
   - Context for theme/auth

3. **Styling Approach**
   - Tailwind utility classes
   - Custom components when needed
   - Consistent color scheme

4. **Testing Strategy**
   - Unit tests for utilities
   - Component testing
   - Integration tests for flows