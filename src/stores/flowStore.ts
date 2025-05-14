import { create } from 'zustand';
import { Node, Edge } from 'reactflow';

interface HistoryEntry {
  nodes: Node[];
  edges: Edge[];
  action: string;
  description: string;
  timestamp: Date;
}

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  history: HistoryEntry[];
  currentIndex: number;
  autosave: boolean;
  canUndo: boolean;
  canRedo: boolean;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  undo: () => void;
  redo: () => void;
  addToHistory: (action: string, description: string) => void;
  toggleAutosave: () => void;
}

// Sample history data
const sampleHistory: HistoryEntry[] = [
  {
    nodes: [],
    edges: [],
    action: 'Initial Setup',
    description: 'Created initial agent workflow',
    timestamp: new Date(Date.now() - 86400000) // 24 hours ago
  },
  {
    nodes: [],
    edges: [],
    action: 'Add Memory Node',
    description: 'Added progressive memory storage with TTL configuration',
    timestamp: new Date(Date.now() - 43200000) // 12 hours ago
  },
  {
    nodes: [],
    edges: [],
    action: 'Update Connections',
    description: 'Connected LLM workers to memory nodes for persistent storage',
    timestamp: new Date(Date.now() - 21600000) // 6 hours ago
  },
  {
    nodes: [],
    edges: [],
    action: 'Add MCP Server',
    description: 'Integrated new MCP server for enhanced coordination',
    timestamp: new Date(Date.now() - 7200000) // 2 hours ago
  },
  {
    nodes: [],
    edges: [],
    action: 'Optimize Flow',
    description: 'Adjusted node positions and optimized data flow paths',
    timestamp: new Date(Date.now() - 3600000) // 1 hour ago
  }
];

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  history: sampleHistory,
  currentIndex: sampleHistory.length - 1,
  autosave: true,
  canUndo: true,
  canRedo: false,

  setNodes: (nodes) => {
    set({ nodes });
    if (get().autosave) {
      get().addToHistory('Update Nodes', 'Node positions or properties updated');
    }
  },

  setEdges: (edges) => {
    set({ edges });
    if (get().autosave) {
      get().addToHistory('Update Edges', 'Connection added or removed');
    }
  },

  addToHistory: (action, description) => {
    const { nodes, edges, history, currentIndex } = get();
    const newEntry = {
      nodes: [...nodes],
      edges: [...edges],
      action,
      description,
      timestamp: new Date()
    };

    const newHistory = [...history.slice(0, currentIndex + 1), newEntry];
    set({
      history: newHistory,
      currentIndex: newHistory.length - 1,
      canUndo: newHistory.length > 1,
      canRedo: false
    });
  },

  undo: () => {
    const { history, currentIndex } = get();
    if (currentIndex > 0) {
      const previousState = history[currentIndex - 1];
      set({
        nodes: previousState.nodes,
        edges: previousState.edges,
        currentIndex: currentIndex - 1,
        canUndo: currentIndex - 1 > 0,
        canRedo: true
      });
    }
  },

  redo: () => {
    const { history, currentIndex } = get();
    if (currentIndex < history.length - 1) {
      const nextState = history[currentIndex + 1];
      set({
        nodes: nextState.nodes,
        edges: nextState.edges,
        currentIndex: currentIndex + 1,
        canUndo: true,
        canRedo: currentIndex + 1 < history.length - 1
      });
    }
  },

  toggleAutosave: () => {
    set((state) => ({ autosave: !state.autosave }));
  }
}));