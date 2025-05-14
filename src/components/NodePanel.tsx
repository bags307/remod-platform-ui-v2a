import React from 'react';
import { X, Sliders, Link, BookOpen, Copy, Code, Check } from 'lucide-react';

interface NodePanelProps {
  node: { id: string; type: string };
  onClose: () => void;
}

const PANEL_DATA: Record<string, any> = {
  llm: {
    title: "LLM Configuration",
    color: "from-blue-600 to-indigo-600",
    icon: <Sliders className="h-4 w-4" />,
    sections: [
      {
        title: "Model Settings",
        fields: [
          { label: "Provider", value: "OpenAI", type: "select" },
          { label: "Model", value: "gpt-4", type: "select" },
          { label: "Temperature", value: "0.7", type: "range" },
          { label: "Max Tokens", value: "4096", type: "number" },
        ]
      },
      {
        title: "System Prompt",
        fields: [
          { 
            label: "Instructions", 
            value: "You are an AI assistant that helps users with their questions in a helpful, accurate, and concise manner.", 
            type: "textarea" 
          }
        ]
      }
    ]
  },
  dataSource: {
    title: "Data Source",
    color: "from-emerald-600 to-teal-600",
    icon: <Link className="h-4 w-4" />,
    sections: [
      {
        title: "Connection",
        fields: [
          { label: "Source Type", value: "Vector Database", type: "select" },
          { label: "Connection URL", value: "https://api.pinecone.io", type: "text" },
          { label: "Index Name", value: "knowledge-base", type: "text" },
        ]
      },
      {
        title: "Retrieval Settings",
        fields: [
          { label: "Search Top K", value: "5", type: "number" },
          { label: "Similarity Threshold", value: "0.75", type: "range" },
        ]
      }
    ]
  },
  memory: {
    title: "Memory Configuration",
    color: "from-amber-600 to-orange-600",
    icon: <BookOpen className="h-4 w-4" />,
    sections: [
      {
        title: "Memory Settings",
        fields: [
          { label: "Memory Type", value: "Buffer", type: "select" },
          { label: "Max Messages", value: "20", type: "number" },
          { label: "Include System Messages", value: true, type: "toggle" },
        ]
      },
      {
        title: "Persistence",
        fields: [
          { label: "Storage Type", value: "In-Memory", type: "select" },
          { label: "Summarize Long Histories", value: true, type: "toggle" },
        ]
      }
    ]
  },
  output: {
    title: "Output Configuration",
    color: "from-purple-600 to-fuchsia-600",
    icon: <Code className="h-4 w-4" />,
    sections: [
      {
        title: "Output Settings",
        fields: [
          { label: "Format", value: "Markdown", type: "select" },
          { label: "Include Citations", value: true, type: "toggle" },
          { label: "Stream Output", value: true, type: "toggle" },
        ]
      },
      {
        title: "Post-Processing",
        fields: [
          { label: "Apply Formatting", value: true, type: "toggle" },
          { label: "Syntax Highlighting", value: true, type: "toggle" },
        ]
      }
    ]
  }
};

const NodePanel: React.FC<NodePanelProps> = ({ node, onClose }) => {
  const panelData = PANEL_DATA[node.type] || {
    title: "Node Properties",
    color: "from-slate-600 to-slate-500",
    icon: <Sliders className="h-4 w-4" />,
    sections: []
  };
  
  return (
    <div className="w-80 h-full border-l border-slate-700/50 bg-slate-900/95 backdrop-blur-sm flex flex-col shadow-xl overflow-hidden">
      <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
        <h2 className="text-lg font-medium text-white flex items-center gap-2">
          <div className={`h-6 w-6 rounded bg-gradient-to-r ${panelData.color} flex items-center justify-center text-white`}>
            {panelData.icon}
          </div>
          {panelData.title}
        </h2>
        <button onClick={onClose} className="h-7 w-7 rounded-full hover:bg-slate-800 flex items-center justify-center transition-colors">
          <X size={16} className="text-slate-400 hover:text-slate-200" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {panelData.sections.map((section: any, sectionIndex: number) => (
          <div key={sectionIndex} className="mb-6">
            <h3 className="text-sm font-medium text-slate-300 mb-3">{section.title}</h3>
            <div className="space-y-4">
              {section.fields.map((field: any, fieldIndex: number) => (
                <div key={fieldIndex} className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-400">{field.label}</label>
                  {field.type === 'select' && (
                    <div className="relative">
                      <select 
                        className="w-full rounded-md bg-slate-800 border border-slate-700 py-1.5 px-3 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                        defaultValue={field.value}
                      >
                        <option>{field.value}</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                      </select>
                    </div>
                  )}
                  
                  {field.type === 'text' && (
                    <div className="relative flex items-center">
                      <input 
                        type="text" 
                        className="w-full rounded-md bg-slate-800 border border-slate-700 py-1.5 px-3 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        defaultValue={field.value} 
                      />
                      <button className="absolute right-2 text-slate-400 hover:text-slate-300">
                        <Copy size={14} />
                      </button>
                    </div>
                  )}
                  
                  {field.type === 'number' && (
                    <input 
                      type="number" 
                      className="w-full rounded-md bg-slate-800 border border-slate-700 py-1.5 px-3 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={field.value} 
                    />
                  )}
                  
                  {field.type === 'textarea' && (
                    <textarea 
                      className="w-full rounded-md bg-slate-800 border border-slate-700 py-1.5 px-3 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                      defaultValue={field.value}
                    />
                  )}
                  
                  {field.type === 'range' && (
                    <div className="flex items-center gap-3">
                      <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.1"
                        defaultValue={field.value}
                        className="w-full accent-blue-500" 
                      />
                      <span className="text-xs text-slate-300 min-w-[30px]">{field.value}</span>
                    </div>
                  )}
                  
                  {field.type === 'toggle' && (
                    <div className="flex items-center">
                      <button className={`relative inline-flex h-5 w-10 items-center rounded-full ${field.value ? 'bg-blue-600' : 'bg-slate-700'}`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${field.value ? 'translate-x-5' : 'translate-x-1'}`} />
                      </button>
                      <span className="ml-2 text-xs text-slate-300">{field.value ? 'Enabled' : 'Disabled'}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-slate-700/50 flex items-center justify-between">
        <button className="py-1.5 px-3 rounded text-sm text-slate-300 hover:bg-slate-800 transition-colors">
          Reset
        </button>
        <button className="py-1.5 px-3 rounded text-sm text-white bg-blue-600 hover:bg-blue-500 transition-colors flex items-center gap-1.5">
          <Check size={14} />
          Apply Changes
        </button>
      </div>
    </div>
  );
};

export default NodePanel;