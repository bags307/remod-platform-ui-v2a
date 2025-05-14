import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Network, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

export const MCPNode = ({ data, selected }: NodeProps) => {
  return (
    <div 
      className={cn(
        'p-3 rounded-xl w-64 backdrop-blur-sm bg-gradient-to-br from-rose-950/90 to-pink-900/80 border border-rose-800/60 text-white shadow-lg transition-all duration-200',
        selected && 'ring-2 ring-rose-500 border-rose-500/90'
      )}
    >
      <Handle 
        type="target" 
        position={Position.Left} 
        className="!h-3 !w-3 !bg-rose-400 !border-rose-600" 
      />
      
      <div className="flex items-center mb-2">
        <div className="h-8 w-8 rounded-lg bg-rose-600/40 flex items-center justify-center mr-2">
          <Network size={16} className="text-rose-200" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-rose-100">{data.label}</h3>
          <div className="flex items-center gap-1 text-xs text-rose-300">
            <span className="inline-block h-2 w-2 rounded-full bg-rose-400"></span>
            {data.status}
          </div>
        </div>
        <button className="ml-auto h-6 w-6 rounded-full hover:bg-rose-800/50 flex items-center justify-center transition-colors">
          <Settings size={13} className="text-rose-300" />
        </button>
      </div>
      
      <div className="bg-rose-950/50 rounded-lg p-2 text-xs space-y-2 border border-rose-900/60">
        <div className="flex justify-between">
          <span className="text-rose-300">Protocol</span>
          <span className="font-medium text-rose-100">{data.protocol}</span>
        </div>
        <div className="rounded-md bg-rose-900/40 p-2 mt-2">
          <div className="flex items-center justify-between text-rose-200">
            <span>Throughput</span>
            <span>124 msg/s</span>
          </div>
        </div>
      </div>
      
      <Handle 
        type="source" 
        position={Position.Right} 
        className="!h-3 !w-3 !bg-rose-400 !border-rose-600" 
      />
    </div>
  );
};