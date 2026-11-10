import React, { useState, useEffect, useRef } from 'react';
import { Window } from '@claude/desktop';

interface Task {
  id: string;
  subject: string;
  status: 'pending' | 'in_progress' | 'completed' | 'deleted';
  description?: string;
  owner?: string;
  activeForm?: string;
  blockedBy?: string[];
  blocks?: string[];
}

interface HUDProps {
  onTaskClick?: (task: Task) => void;
}

const HUDPanel: React.FC<HUDProps> = ({ onTaskClick }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch tasks from MCP
  const fetchTasks = async () => {
    try {
      const result = await Window.callMcpTool('mcp__task__list_tasks', {});
      const data = result.structuredContent || result.content;

      const taskList = Array.isArray(data) ? data : (data.tasks || []);

      // Transform to our format
      const formattedTasks: Task[] = taskList.map((t: any) => ({
        id: t.id || t.taskId,
        subject: t.subject,
        status: t.status || 'pending',
        description: t.description,
        owner: t.owner,
        activeForm: t.activeForm,
        blockedBy: t.blockedBy,
        blocks: t.blocks
      }));

      setTasks(formattedTasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh setup
  useEffect(() => {
    fetchTasks();
    intervalRef.current = setInterval(fetchTasks, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      'in_progress': 'bg-yellow-500',
      'pending': 'bg-gray-400',
      'completed': 'bg-green-500',
      'deleted': 'bg-red-500'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-400';
  };

  const getStatusDisplay = (status: string) => {
    return status.replace('_', ' ').toUpperCase();
  };

  const runningCount = tasks.filter(t => t.status === 'in_progress').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">🚀 Agent Activity</h2>
          <button
            onClick={fetchTasks}
            className="p-1 rounded hover:bg-gray-200 transition-colors"
            title="Refresh"
          >
            🔄
          </button>
        </div>

        {/* Stats */}
        {!loading && tasks.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="text-center p-2 bg-white rounded">
              <div className="text-xl font-bold text-yellow-600">{runningCount}</div>
              <div className="text-xs text-gray-500">Active</div>
            </div>
            <div className="text-center p-2 bg-white rounded">
              <div className="text-xl font-bold text-green-600">{completedCount}</div>
              <div className="text-xs text-gray-500">Done</div>
            </div>
            <div className="text-center p-2 bg-white rounded">
              <div className="text-xl font-bold text-blue-600">{tasks.length}</div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
          </div>
        )}
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto p-2">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="mb-2">📭</div>
            <div>No active agents</div>
          </div>
        ) : (
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => onTaskClick?.(task)}
                className="bg-white rounded-lg p-3 border border-gray-200 hover:shadow-md cursor-pointer transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 text-sm">{task.subject}</h3>
                    {task.description && (
                      <p className="text-xs text-gray-500 mt-1">{task.description}</p>
                    )}
                  </div>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded ${getStatusColor(task.status)} text-white`}>
                    {getStatusDisplay(task.status)}
                  </span>
                </div>

                {/* Progress bar for running tasks */}
                {task.status === 'in_progress' && (
                  <div className="mt-2">
                    <div className="h-1 bg-gray-200 rounded overflow-hidden">
                      <div className="h-full bg-blue-500 rounded w-2/3"></div>
                    </div>
                  </div>
                )}

                {/* Task metadata */}
                {(task.owner || task.blocks?.length || task.blockedBy?.length) && (
                  <div className="mt-2 text-xs text-gray-400">
                    {task.owner && <span>Owner: {task.owner}</span>}
                    {task.blockedBy?.length > 0 && (
                      <span className="ml-2">Blocked by {task.blockedBy.length}</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HUDPanel;