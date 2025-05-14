import React, { useCallback, useRef } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  Edge,
  Node,
  ConnectionMode,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  MarkerType,
  Panel
} from 'reactflow';
import dagre from 'dagre';
import 'reactflow/dist/style.css';
import { AgentNode } from './nodes/AgentNode';
import { StartNode } from './nodes/StartNode';
import { LLMWorkerNode } from './nodes/LLMWorkerNode';
import { MemoryNode } from './nodes/MemoryNode';
import { MCPNode } from './nodes/MCPNode';
import CustomEdge from './edges/CustomEdge';
import { Layout } from 'lucide-react';

const nodeTypes = {
  agent: AgentNode,
  start: StartNode,
  llmWorker: LLMWorkerNode,
  memory: MemoryNode,
  mcp: MCPNode
};

const edgeTypes = {
  custom: CustomEdge
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 280, height: 160 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.position = {
      x: nodeWithPosition.x - 140,
      y: nodeWithPosition.y - 80,
    };
  });

  return { nodes, edges };
};

const initialNodes: Node[] = [
  {
    id: 'start',
    type: 'start',
    position: { x: 100, y: 200 },
    data: { 
      label: 'Start',
      inputType: 'Text/Code',
      validation: 'Enabled'
    }
  },
  {
    id: 'agent1',
    type: 'agent',
    position: { x: 400, y: 100 },
    data: { 
      label: 'Planning Agent',
      status: 'Active',
      role: 'Task Decomposition',
      tasks: 3
    }
  },
  {
    id: 'agent2',
    type: 'agent',
    position: { x: 400, y: 300 },
    data: { 
      label: 'Code Generation Agent',
      status: 'Active',
      role: 'Implementation',
      tasks: 2
    }
  },
  {
    id: 'agent3',
    type: 'agent',
    position: { x: 400, y: 500 },
    data: { 
      label: 'Testing Agent',
      status: 'Active',
      role: 'Quality Assurance',
      tasks: 4
    }
  },
  {
    id: 'agent4',
    type: 'agent',
    position: { x: 700, y: 100 },
    data: { 
      label: 'Documentation Agent',
      status: 'Active',
      role: 'Documentation',
      tasks: 1
    }
  },
  {
    id: 'worker1',
    type: 'llmWorker',
    position: { x: 700, y: 300 },
    data: { 
      label: 'GPT-4 Worker',
      status: 'Processing',
      model: 'gpt-4-turbo',
      queueSize: 5,
      throughput: '2.5k'
    }
  },
  {
    id: 'worker2',
    type: 'llmWorker',
    position: { x: 700, y: 500 },
    data: { 
      label: 'Claude Worker',
      status: 'Ready',
      model: 'claude-3',
      queueSize: 3,
      throughput: '3.2k'
    }
  },
  {
    id: 'memory1',
    type: 'memory',
    position: { x: 1000, y: 200 },
    data: { 
      label: 'Progressive Memory',
      memoryType: 'Graph DB',
      size: 1250,
      ttl: '24h'
    }
  },
  {
    id: 'memory2',
    type: 'memory',
    position: { x: 1000, y: 400 },
    data: { 
      label: 'Short-term Memory',
      memoryType: 'Vector Store',
      size: 500,
      ttl: '1h'
    }
  },
  {
    id: 'mcp1',
    type: 'mcp',
    position: { x: 1000, y: 600 },
    data: { 
      label: 'Task Coordinator',
      status: 'Active',
      protocol: 'MCP/1.1'
    }
  },
  {
    id: 'mcp2',
    type: 'mcp',
    position: { x: 1300, y: 300 },
    data: { 
      label: 'Memory Controller',
      status: 'Active',
      protocol: 'MCP/1.0'
    }
  }
];

const initialEdges: Edge[] = [
  { 
    id: 'e-start-agent1', 
    source: 'start', 
    target: 'agent1', 
    type: 'custom',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: { label: 'Input' }
  },
  { 
    id: 'e-agent1-worker1', 
    source: 'agent1', 
    target: 'worker1', 
    type: 'custom',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: { label: 'Tasks' }
  },
  { 
    id: 'e-agent2-worker1', 
    source: 'agent2', 
    target: 'worker1', 
    type: 'custom',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: { label: 'Implementation' }
  },
  { 
    id: 'e-agent3-worker2', 
    source: 'agent3', 
    target: 'worker2', 
    type: 'custom',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: { label: 'Tests' }
  },
  { 
    id: 'e-agent4-worker1', 
    source: 'agent4', 
    target: 'worker1', 
    type: 'custom',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: { label: 'Documentation' }
  },
  { 
    id: 'e-memory1-mcp2', 
    source: 'memory1', 
    target: 'mcp2', 
    type: 'custom',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: { label: 'Long-term' }
  },
  { 
    id: 'e-memory2-mcp2', 
    source: 'memory2', 
    target: 'mcp2', 
    type: 'custom',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: { label: 'Short-term' }
  },
  { 
    id: 'e-mcp1-worker1', 
    source: 'mcp1', 
    target: 'worker1', 
    type: 'custom',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: { label: 'Coordination' }
  },
  { 
    id: 'e-mcp2-worker2', 
    source: 'mcp2', 
    target: 'worker2', 
    type: 'custom',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: { label: 'Memory Access' }
  },
  { 
    id: 'e-worker1-memory1', 
    source: 'worker1', 
    target: 'memory1', 
    type: 'custom',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: { label: 'Store' }
  },
  { 
    id: 'e-worker2-memory2', 
    source: 'worker2', 
    target: 'memory2', 
    type: 'custom',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    data: { label: 'Cache' }
  }
];

interface FlowCanvasProps {
  onNodeSelect: (node: { id: string; type: string } | null) => void;
}

const FlowCanvas: React.FC<FlowCanvasProps> = ({ onNodeSelect }) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge({ ...params, type: 'custom', animated: true, markerEnd: { type: MarkerType.ArrowClosed } }, eds)),
    [setEdges]
  );
  
  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    onNodeSelect({ id: node.id, type: node.type });
  };

  const onLayout = useCallback(
    (direction: 'TB' | 'LR') => {
      const layouted = getLayoutedElements(nodes, edges, direction);
      setNodes([...layouted.nodes]);
    },
    [nodes, edges]
  );
  
  return (
    <div className="w-full h-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        minZoom={0.2}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
        className="bg-slate-900"
      >
        <Background color="#64748b" gap={24} size={1} />
        <Controls className="bg-slate-800 border-slate-700 rounded-lg" />
        <MiniMap 
          nodeColor="#60a5fa"
          maskColor="rgba(15, 23, 42, 0.6)"
          className="!bg-slate-800 !border-slate-700 rounded-lg"
        />
        <Panel position="top-left" className="ml-2">
          <button
            onClick={() => onLayout('TB')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm text-slate-200 border border-slate-700/50 transition-colors"
          >
            <Layout size={14} />
            Auto Layout
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;