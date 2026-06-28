import { useEffect, useState } from "react";
import { createTask, deleteTask as deleteTaskApi, getTasks, updateTask } from "../api/taskApi.js";
import CreateTaskForm from "../forms/CreateTaskForm.jsx";
import UpdateTaskForm from "../forms/UpdateTaskForm.jsx";

const emptyCreateForm = {
  title: "",
  description: "",
  completed: false,
};

const emptyUpdateForm = {
  id: "",
  title: "",
  description: "",
  completed: false,
};

export default function DashboardSection() {
  const [tasks, setTasks] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [createForm, setCreateForm] = useState(emptyCreateForm);
  const [updateForm, setUpdateForm] = useState(emptyUpdateForm);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true);
        const response = await getTasks();
        const taskList = Array.isArray(response) ? response : response?.tasks || [];
        setTasks(taskList);
      } catch (error) {
        setErrorMessage(error.message || "Failed to load tasks");
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleCreateTask = async (event) => {
    event.preventDefault();

    if (!createForm.title.trim() || !createForm.description.trim()) {
      return;
    }

    try {
      const task = await createTask({
        title: createForm.title.trim(),
        description: createForm.description.trim(),
        completed: createForm.completed,
      });

      setTasks((currentTasks) => [task, ...currentTasks]);
      setCreateForm(emptyCreateForm);
      setIsCreateModalOpen(false);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message || "Could not create task");
    }
  };

  const handleCreateFormChange = (field, value) => {
    setCreateForm((currentForm) => ({ ...currentForm, [field]: value }));
  };

  const handleUpdateTask = async (event) => {
    event.preventDefault();

    if (!editingTaskId || !updateForm.title.trim() || !updateForm.description.trim() || !updateForm.id.trim()) {
      return;
    }

    try {
      const task = await updateTask({
        id: Number(updateForm.id),
        title: updateForm.title.trim(),
        description: updateForm.description.trim(),
        completed: updateForm.completed,
      });

      setTasks((currentTasks) => currentTasks.map((item) => (item.id === editingTaskId ? task : item)));
      setUpdateForm(emptyUpdateForm);
      setEditingTaskId(null);
      setIsUpdateModalOpen(false);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message || "Could not update task");
    }
  };

  const handleUpdateFormChange = (field, value) => {
    setUpdateForm((currentForm) => ({ ...currentForm, [field]: value }));
  };

  const startEditingTask = (task) => {
    setEditingTaskId(task.id);
    setUpdateForm({
      id: task.id,
      title: task.title,
      description: task.description,
      completed: task.completed,
    });
    setIsUpdateModalOpen(true);
    setOpenMenuId(null);
  };

  const deleteTask = async (taskId) => {
    try {
      await deleteTaskApi(taskId);
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
      setOpenMenuId(null);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message || "Could not delete task");
    }
  };

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            Dashboard
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
            Your tasks at a glance
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
            {completedCount}/{tasks.length} completed
          </div>
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Add task
          </button>
        </div>
      </div>

      {errorMessage ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {errorMessage}
        </div>
      ) : null}

      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
          Loading tasks...
        </div>
      ) : null}

      {isCreateModalOpen && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-950/40 px-4 py-8">
          <div className="w-full max-w-xl">
            <CreateTaskForm
              form={createForm}
              onChange={handleCreateFormChange}
              onSubmit={handleCreateTask}
              onClose={() => setIsCreateModalOpen(false)}
            />
          </div>
        </div>
      )}

      {isUpdateModalOpen && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-950/40 px-4 py-8">
          <div className="w-full max-w-xl">
            <UpdateTaskForm
              form={updateForm}
              onChange={handleUpdateFormChange}
              onSubmit={handleUpdateTask}
              onClose={() => {
                setIsUpdateModalOpen(false);
                setEditingTaskId(null);
                setUpdateForm(emptyUpdateForm);
              }}
            />
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tasks.map((task) => (
          <article
            key={task.id}
            className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-500">{task.id}</p>
                <h3 className="mt-1 text-lg font-semibold text-slate-950">{task.title}</h3>
              </div>

              <div className="relative">
                <button
                  type="button"
                  aria-label="Task actions"
                  className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
                  onClick={() =>
                    setOpenMenuId((currentMenuId) => (currentMenuId === task.id ? null : task.id))
                  }
                >
                  <span className="text-xl leading-none">⋯</span>
                </button>

                {openMenuId === task.id && (
                  <div className="absolute right-0 top-10 z-20 w-32 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                    <button
                      type="button"
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100"
                      onClick={() => startEditingTask(task)}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm text-rose-600 transition hover:bg-rose-50"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600">{task.description}</p>

            <div className="mt-5 flex items-center justify-between">
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  task.completed
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {task.completed ? "Completed" : "Pending"}
              </span>
              <span className="text-sm font-medium text-slate-500">
                {task.completed ? "Done" : "In progress"}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
