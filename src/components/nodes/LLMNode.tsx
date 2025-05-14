import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { CircuitBoard, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

export const LLMNode = ({ data, selected }: NodeProps) => {
  return (
    <div 
      className={cn(
        'p-3 rounded-xl w-64 backdrop-blur-sm bg-gradient-to-br from-indigo-950/90 to-blue-900/80 border border-blue-800/60 text-white shadow-lg transition-all duration-200',
        selected && 'ring-2 ring-blue-500 border-blue-500/90'
      )}
    >
      <Handle 
        type="target" 
        position={Position.Left} 
        className="!h-3 !w-3 !bg-blue-400 !border-blue-600" 
      />
      
      <div className="flex items-center mb-2">
        <div className="h-8 w-8 rounded-lg bg-blue-600/40 flex items-center justify-center mr-2">
          <CircuitBoard size={16} className="text-blue-200" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-blue-100">{data.label}</h3>
          <div className="flex items-center gap-1 text-xs text-blue-300">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
            Online
          </div>
        </div>
        <button className="ml-auto h-6 w-6 rounded-full hover:bg-blue-800/50 flex items-center justify-center transition-colors">
          <Settings size={13} className="text-blue-300" />
        </button>
      </div>
      
      <div className="bg-blue-950/50 rounded-lg p-2 text-xs space-y-2 border border-blue-900/60">
        <div className="flex justify-between">
          <span className="text-blue-300">Model</span>
          <span className="font-medium text-blue-100">{data.model}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-blue-300">Temperature</span>
          <span className="font-medium text-blue-100">{data.temperature}</span>
        </div>
      </div>
      
      <Handle 
        type="source" 
        position={Position.Right} 
        className="!h-3 !w-3 !bg-blue-400 !border-blue-600" 
      />
    </div>
  );
};