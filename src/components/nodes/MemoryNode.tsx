import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Database, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

export const MemoryNode = ({ data, selected }: NodeProps) => {
  return (
    <div 
      className={cn(
        'p-3 rounded-xl w-64 backdrop-blur-sm bg-gradient-to-br from-amber-950/90 to-orange-900/80 border border-amber-800/60 text-white shadow-lg transition-all duration-200',
        selected && 'ring-2 ring-amber-500 border-amber-500/90'
      )}
    >
      <Handle 
        type="target" 
        position={Position.Left} 
        className="!h-3 !w-3 !bg-amber-400 !border-amber-600" 
      />
      
      <div className="flex items-center mb-2">
        <div className="h-8 w-8 rounded-lg bg-amber-600/40 flex items-center justify-center mr-2">
          <Database size={16} className="text-amber-200" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-amber-100">{data.label}</h3>
          <div className="flex items-center gap-1 text-xs text-amber-300">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-400"></span>
            Active
          </div>
        </div>
        <button className="ml-auto h-6 w-6 rounded-full hover:bg-amber-800/50 flex items-center justify-center transition-colors">
          <Settings size={13} className="text-amber-300" />
        </button>
      </div>
      
      <div className="bg-amber-950/50 rounded-lg p-2 text-xs space-y-2 border border-amber-900/60">
        <div className="flex justify-between">
          <span className="text-amber-300">Type</span>
          <span className="font-medium text-amber-100">{data.memoryType}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-amber-300">Size</span>
          <span className="font-medium text-amber-100">{data.size} records</span>
        </div>
        <div className="flex justify-between">
          <span className="text-amber-300">TTL</span>
          <span className="font-medium text-amber-100">{data.ttl}</span>
        </div>
      </div>
      
      <Handle 
        type="source" 
        position={Position.Right} 
        className="!h-3 !w-3 !bg-amber-400 !border-amber-600" 
      />
    </div>
  );
};