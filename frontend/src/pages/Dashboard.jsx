import { useState, useEffect } from 'react';
import { LogOut, Plus, Search, LayoutDashboard } from 'lucide-react';
import api from '../api/axios';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';

const Dashboard = ({ setAuth }) => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const stages = ['Todo', 'In Progress', 'Done'];

  useEffect(() => {
    const fetchUserAndTasks = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);
      
      try {
        const { data } = await api.get('/tasks');
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserAndTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth(false);
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        const { data } = await api.put(`/tasks/${editingTask._id}`, taskData);
        setTasks(tasks.map(t => t._id === data._id ? data : t));
      } else {
        const { data } = await api.post('/tasks', taskData);
        setTasks([...tasks, data]);
      }
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Failed to save task', error);
      alert('Failed to save task. Please try again.');
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

  const openNewTaskModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditTaskModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white shadow-md shadow-blue-500/20">
              <LayoutDashboard size={18} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">TaskFlow</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 sm:flex">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold dark:bg-blue-500/20 dark:text-blue-400">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{user?.name}</span>
            </div>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        {/* Toolbar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-blue-400"
            />
          </div>
          
          <button 
            onClick={openNewTaskModal}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 active:scale-[0.98]"
          >
            <Plus size={18} />
            New Task
          </button>
        </div>

        {/* Board */}
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {stages.map(stage => {
              const stageTasks = filteredTasks.filter(t => t.stage === stage);
              return (
                <div key={stage} className="flex flex-col rounded-2xl bg-slate-100/50 p-4 dark:bg-slate-800/30">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-semibold text-slate-800 dark:text-slate-200">{stage}</h2>
                    <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-white px-2 text-xs font-medium text-slate-600 shadow-sm dark:bg-slate-700 dark:text-slate-300">
                      {stageTasks.length}
                    </span>
                  </div>
                  
                  <div className="flex flex-1 flex-col gap-3">
                    {stageTasks.length === 0 ? (
                      <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-slate-300 py-8 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        No tasks
                      </div>
                    ) : (
                      stageTasks.map(task => (
                        <TaskCard 
                          key={task._id} 
                          task={task} 
                          onEdit={openEditTaskModal}
                          onDelete={handleDeleteTask}
                        />
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <TaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </div>
  );
};

export default Dashboard;
