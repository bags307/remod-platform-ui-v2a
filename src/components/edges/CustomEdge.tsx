import React from 'react';
import { EdgeProps, getBezierPath, EdgeLabelRenderer } from 'reactflow';

const CustomEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected,
  style = {}
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={{
          ...style,
          strokeWidth: selected ? 3 : 2,
          stroke: selected ? '#60a5fa' : '#64748b',
        }}
        className="react-flow__edge-path transition-all duration-200"
        d={edgePath}
      />
      {data?.label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className={`rounded-md py-1 px-2 text-xs font-medium transition-all duration-200 ${
              selected 
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-300 backdrop-blur-sm'
            }`}
          >
            {data.label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export default CustomEdge;