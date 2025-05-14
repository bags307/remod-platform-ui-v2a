import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Play, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

export const StartNode = ({ data, selected }: NodeProps) => {
  return (
    <div 
      className={cn(
        'p-3 rounded-xl w-64 backdrop-blur-sm bg-gradient-to-br from-emerald-950/90 to-green-900/80 border border-emerald-800/60 text-white shadow-lg transition-all duration-200',
        selected && 'ring-2 ring-emerald-500 border-emerald-500/90'
      )}
    >
      <div className="flex items-center mb-2">
        <div className="h-8 w-8 rounded-lg bg-emerald-600/40 flex items-center justify-center mr-2">
          <Play size={16} className="text-emerald-200" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-emerald-100">{data.label}</h3>
          <div className="flex items-center gap-1 text-xs text-emerald-300">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
            Ready
          </div>
        </div>
        <button className="ml-auto h-6 w-6 rounded-full hover:bg-emerald-800/50 flex items-center justify-center transition-colors">
          <Settings size={13} className="text-emerald-300" />
        </button>
      </div>
      
      <div className="bg-emerald-950/50 rounded-lg p-2 text-xs space-y-2 border border-emerald-900/60">
        <div className="flex justify-between">
          <span className="text-emerald-300">Input Type</span>
          <span className="font-medium text-emerald-100">{data.inputType}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-emerald-300">Validation</span>
          <span className="font-medium text-emerald-100">{data.validation}</span>
        </div>
      </div>
      
      <Handle 
        type="source" 
        position={Position.Right} 
        className="!h-3 !w-3 !bg-emerald-400 !border-emerald-600" 
      />
    </div>
  );
};