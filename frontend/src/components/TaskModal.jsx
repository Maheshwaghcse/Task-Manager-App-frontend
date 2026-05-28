import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const TaskModal = ({ isOpen, onClose, onSave, task }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stage, setStage] = useState('Todo');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setStage(task.stage);
    } else {
      setTitle('');
      setDescription('');
      setStage('Todo');
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, stage });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md scale-100 overflow-hidden rounded-2xl bg-white shadow-2xl transition-transform dark:bg-slate-800">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            {task ? 'Edit Task' : 'New Task'}
          </h2>
          <button 
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
          >
            <X size={18} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-400"
                placeholder="Task title"
              />
            </div>
            
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-400"
                placeholder="Add some details..."
              />
            </div>
            
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Stage</label>
              <div className="flex gap-2">
                {['Todo', 'In Progress', 'Done'].map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStage(s)}
                    className={`flex-1 rounded-lg border py-2 text-sm font-medium transition-colors ${
                      stage === s 
                        ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-500/10 dark:text-blue-400' 
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-blue-600 py-2.5 font-medium text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 active:scale-[0.98]"
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
