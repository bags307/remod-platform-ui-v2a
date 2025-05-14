import React, { useState } from 'react';
import FlowCanvas from './FlowCanvas';
import Sidebar from './Sidebar';
import NodePanel from './NodePanel';

const AgentStudio: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<null | { id: string; type: string }>(null);
  
  const handleNodeSelect = (node: { id: string; type: string } | null) => {
    setSelectedNode(node);
  };
  
  return (
    <div className="flex-1 flex">
      <Sidebar />
      <div className="flex-1 relative">
        <FlowCanvas onNodeSelect={handleNodeSelect} />
      </div>
      {selectedNode && (
        <NodePanel node={selectedNode} onClose={() => setSelectedNode(null)} />
      )}
    </div>
  );
};

export default AgentStudio;