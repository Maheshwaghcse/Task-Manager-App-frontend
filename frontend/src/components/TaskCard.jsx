import { Trash2, Edit3, Clock, GripVertical } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const getStageColor = (stage) => {
    switch (stage) {
      case 'Todo': return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
      case 'In Progress': return 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20';
      case 'Done': return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };

  return (
    <div className="group relative flex cursor-grab flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-800 active:cursor-grabbing">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium leading-tight text-slate-900 dark:text-slate-100">{task.title}</h3>
        <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button 
            onClick={(e) => { e.stopPropagation(); onEdit(task); }}
            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-700 dark:hover:text-blue-400"
          >
            <Edit3 size={14} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(task._id); }}
            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-red-600 dark:hover:bg-slate-700 dark:hover:text-red-400"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      
      {task.description && (
        <p className="line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{task.description}</p>
      )}
      
      <div className="mt-auto flex items-center justify-between pt-2">
        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStageColor(task.stage)}`}>
          {task.stage}
        </span>
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <Clock size={12} />
          {formatDate(task.createdAt)}
        </div>
      </div>
      
      {/* Absolute grip icon on hover */}
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
        <GripVertical size={16} className="text-slate-400" />
      </div>
    </div>
  );
};

export default TaskCard;
