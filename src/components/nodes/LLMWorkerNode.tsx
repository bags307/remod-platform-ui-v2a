import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Cpu, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

export const LLMWorkerNode = ({ data, selected }: NodeProps) => {
  return (
    <div 
      className={cn(
        'p-3 rounded-xl w-64 backdrop-blur-sm bg-gradient-to-br from-sky-950/90 to-blue-900/80 border border-sky-800/60 text-white shadow-lg transition-all duration-200',
        selected && 'ring-2 ring-sky-500 border-sky-500/90'
      )}
    >
      <Handle 
        type="target" 
        position={Position.Left} 
        className="!h-3 !w-3 !bg-sky-400 !border-sky-600" 
      />
      
      <div className="flex items-center mb-2">
        <div className="h-8 w-8 rounded-lg bg-sky-600/40 flex items-center justify-center mr-2">
          <Cpu size={16} className="text-sky-200" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-sky-100">{data.label}</h3>
          <div className="flex items-center gap-1 text-xs text-sky-300">
            <span className="inline-block h-2 w-2 rounded-full bg-sky-400"></span>
            {data.status}
          </div>
        </div>
        <button className="ml-auto h-6 w-6 rounded-full hover:bg-sky-800/50 flex items-center justify-center transition-colors">
          <Settings size={13} className="text-sky-300" />
        </button>
      </div>
      
      <div className="bg-sky-950/50 rounded-lg p-2 text-xs space-y-2 border border-sky-900/60">
        <div className="flex justify-between">
          <span className="text-sky-300">Model</span>
          <span className="font-medium text-sky-100">{data.model}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sky-300">Queue</span>
          <span className="font-medium text-sky-100">{data.queueSize} tasks</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sky-300">Throughput</span>
          <span className="font-medium text-sky-100">{data.throughput} tok/s</span>
        </div>
      </div>
      
      <Handle 
        type="source" 
        position={Position.Right} 
        className="!h-3 !w-3 !bg-sky-400 !border-sky-600" 
      />
    </div>
  );
};