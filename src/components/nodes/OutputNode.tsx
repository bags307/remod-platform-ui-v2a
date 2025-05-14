import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { MessageSquare, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

export const OutputNode = ({ data, selected }: NodeProps) => {
  return (
    <div 
      className={cn(
        'p-3 rounded-xl w-64 backdrop-blur-sm bg-gradient-to-br from-purple-950/90 to-fuchsia-900/80 border border-purple-800/60 text-white shadow-lg transition-all duration-200',
        selected && 'ring-2 ring-purple-500 border-purple-500/90'
      )}
    >
      <Handle 
        type="target" 
        position={Position.Left} 
        className="!h-3 !w-3 !bg-purple-400 !border-purple-600" 
      />
      
      <div className="flex items-center mb-2">
        <div className="h-8 w-8 rounded-lg bg-purple-600/40 flex items-center justify-center mr-2">
          <MessageSquare size={16} className="text-purple-200" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-purple-100">{data.label}</h3>
          <div className="flex items-center gap-1 text-xs text-purple-300">
            <span className="inline-block h-2 w-2 rounded-full bg-purple-400"></span>
            Ready
          </div>
        </div>
        <button className="ml-auto h-6 w-6 rounded-full hover:bg-purple-800/50 flex items-center justify-center transition-colors">
          <Settings size={13} className="text-purple-300" />
        </button>
      </div>
      
      <div className="bg-purple-950/50 rounded-lg p-2 text-xs space-y-2 border border-purple-900/60">
        <div className="flex justify-between">
          <span className="text-purple-300">Format</span>
          <span className="font-medium text-purple-100">{data.format}</span>
        </div>
        <div className="rounded-md bg-purple-900/40 p-2 mt-2 text-center">
          <span className="text-xs text-purple-200">Preview Response</span>
        </div>
      </div>
    </div>
  );
};