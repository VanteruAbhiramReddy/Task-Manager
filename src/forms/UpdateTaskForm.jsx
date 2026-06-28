export default function UpdateTaskForm({ form, onChange, onSubmit, onClose }) {
  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-950">Update task</h3>
          <p className="text-sm text-slate-600">Edit an existing task and its status.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
            Edit
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
            aria-label="Close update task form"
          >
            ×
          </button>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <label className="block text-sm font-medium text-slate-700">
          <span className="mb-2 block">ID</span>
          <input
            type="text"
            value={form.id}
            onChange={(event) => onChange("id", event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-950"
            placeholder="#101"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          <span className="mb-2 block">Title</span>
          <input
            type="text"
            value={form.title}
            onChange={(event) => onChange("title", event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-950"
            placeholder="Updated task title"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          <span className="mb-2 block">Description</span>
          <textarea
            value={form.description}
            onChange={(event) => onChange("description", event.target.value)}
            className="min-h-24 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-950"
            placeholder="Updated task details"
          />
        </label>

        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={form.completed}
            onChange={(event) => onChange("completed", event.target.checked)}
            className="h-4 w-4 rounded border-slate-300"
          />
          Mark as completed
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
      >
        Save changes
      </button>
    </form>
  );
}
