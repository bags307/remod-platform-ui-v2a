import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Bot, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

export const AgentNode = ({ data, selected }: NodeProps) => {
  return (
    <div 
      className={cn(
        'p-3 rounded-xl w-64 backdrop-blur-sm bg-gradient-to-br from-violet-950/90 to-purple-900/80 border border-violet-800/60 text-white shadow-lg transition-all duration-200',
        selected && 'ring-2 ring-violet-500 border-violet-500/90'
      )}
    >
      <Handle 
        type="target" 
        position={Position.Left} 
        className="!h-3 !w-3 !bg-violet-400 !border-violet-600" 
      />
      
      <div className="flex items-center mb-2">
        <div className="h-8 w-8 rounded-lg bg-violet-600/40 flex items-center justify-center mr-2">
          <Bot size={16} className="text-violet-200" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-violet-100">{data.label}</h3>
          <div className="flex items-center gap-1 text-xs text-violet-300">
            <span className="inline-block h-2 w-2 rounded-full bg-violet-400"></span>
            {data.status}
          </div>
        </div>
        <button className="ml-auto h-6 w-6 rounded-full hover:bg-violet-800/50 flex items-center justify-center transition-colors">
          <Settings size={13} className="text-violet-300" />
        </button>
      </div>
      
      <div className="bg-violet-950/50 rounded-lg p-2 text-xs space-y-2 border border-violet-900/60">
        <div className="flex justify-between">
          <span className="text-violet-300">Role</span>
          <span className="font-medium text-violet-100">{data.role}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-violet-300">Tasks</span>
          <span className="font-medium text-violet-100">{data.tasks} active</span>
        </div>
      </div>
      
      <Handle 
        type="source" 
        position={Position.Right} 
        className="!h-3 !w-3 !bg-violet-400 !border-violet-600" 
      />
    </div>
  );
};