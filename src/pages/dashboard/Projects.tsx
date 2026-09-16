import { FolderKanban, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState, type SyntheticEvent } from "react";
import SelectDropdown from "../../components/ui/SelectDropdown";
import LoadingState from "../../components/ui/LoadingState";
import ErrorState from "../../components/ui/ErrorState";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
  type CreateProjectPayload,
  type Project,
  type ProjectStatus,
} from "../../services/projectService";

const statusOptions = [
  {
    label: "All statuses",
    value: "All",
  },
  {
    label: "Planning",
    value: "PLANNING",
  },
  {
    label: "Active",
    value: "ACTIVE",
  },
  {
    label: "Completed",
    value: "COMPLETED",
  },
  {
    label: "On hold",
    value: "ON_HOLD",
  },
];

function getStatusLabel(status: ProjectStatus) {
  switch (status) {
    case "PLANNING":
      return "Planning";
    case "ACTIVE":
      return "Active";
    case "COMPLETED":
      return "Completed";
    case "ON_HOLD":
      return "On hold";
    default:
      return status;
  }
}

function getStatusStyles(status: ProjectStatus) {
  switch (status) {
    case "ACTIVE":
      return "bg-green-50 text-green-700 ring-green-600/10";

    case "COMPLETED":
      return "bg-gray-100 text-gray-600 ring-gray-500/10";

    case "ON_HOLD":
      return "bg-red-50 text-red-700 ring-red-600/10";

    case "PLANNING":
      return "bg-yellow-50 text-yellow-700 ring-yellow-600/10";

    default:
      return "bg-gray-100 text-gray-600 ring-gray-500/10";
  }
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

type ProjectFormProps = {
  project?: Project | null;
  onClose: () => void;
  onSubmit: (payload: CreateProjectPayload) => Promise<void>;
  isSubmitting: boolean;
};

function ProjectForm({
  project,
  onClose,
  onSubmit,
  isSubmitting,
}: ProjectFormProps) {
  const [name, setName] = useState(project?.name ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [status, setStatus] = useState<ProjectStatus>(
    project?.status ?? "PLANNING",
  );
  const [progress, setProgress] = useState(String(project?.progress ?? 0));
  const [formError, setFormError] = useState("");

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    const parsedProgress = Number(progress);

    if (trimmedName.length < 2) {
      setFormError("Project name must be at least 2 characters.");
      return;
    }

    if (
      !Number.isInteger(parsedProgress) ||
      parsedProgress < 0 ||
      parsedProgress > 100
    ) {
      setFormError("Progress must be a whole number between 0 and 100.");
      return;
    }

    await onSubmit({
      name: trimmedName,
      description: trimmedDescription || undefined,
      status,
      progress: parsedProgress,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-form-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="project-form-title"
              className="text-xl font-black text-[#18181B]"
            >
              {project ? "Edit project" : "Create project"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {project
                ? "Update your project details."
                : "Add a new project to your workspace."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project form"
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-4 focus:ring-[#F5C542]/20"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {formError && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
            >
              {formError}
            </div>
          )}

          <div>
            <label
              htmlFor="project-name"
              className="text-sm font-bold text-gray-700"
            >
              Project name
            </label>

            <input
              id="project-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={100}
              required
              placeholder="e.g. Website redesign"
              className="mt-2 block w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#D9A514] focus:ring-4 focus:ring-[#F5C542]/15"
            />
          </div>

          <div>
            <label
              htmlFor="project-description"
              className="text-sm font-bold text-gray-700"
            >
              Description
            </label>

            <textarea
              id="project-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              maxLength={1000}
              rows={4}
              placeholder="Describe what this project is about..."
              className="mt-2 block w-full resize-y rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm leading-6 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#D9A514] focus:ring-4 focus:ring-[#F5C542]/15"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="project-status"
                className="text-sm font-bold text-gray-700"
              >
                Status
              </label>

              <select
                id="project-status"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as ProjectStatus)
                }
                className="mt-2 block w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#D9A514] focus:ring-4 focus:ring-[#F5C542]/15"
              >
                <option value="PLANNING">Planning</option>
                <option value="ACTIVE">Active</option>
                <option value="COMPLETED">Completed</option>
                <option value="ON_HOLD">On hold</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="project-progress"
                className="text-sm font-bold text-gray-700"
              >
                Progress
              </label>

              <div className="relative mt-2">
                <input
                  id="project-progress"
                  type="number"
                  min={0}
                  max={100}
                  value={progress}
                  onChange={(event) => setProgress(event.target.value)}
                  required
                  className="block w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 pr-10 text-sm text-gray-700 outline-none transition focus:border-[#D9A514] focus:ring-4 focus:ring-[#F5C542]/15"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">
                  %
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-[#F5C542] px-4 py-3 text-sm font-bold text-[#18181B] transition hover:bg-[#E9B931] focus:outline-none focus:ring-4 focus:ring-[#F5C542]/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Saving..."
                : project
                  ? "Save changes"
                  : "Create project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionError, setActionError] = useState("");

  async function loadProjects() {
    setIsLoading(true);
    setHasError(false);

    try {
      const data = await getProjects();
      setProjects(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function loadInitialProjects() {
      setIsLoading(true);
      setHasError(false);

      try {
        const data = await getProjects();

        if (!isMounted) {
          return;
        }

        setProjects(data);
      } catch {
        if (!isMounted) {
          return;
        }

        setHasError(true);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadInitialProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCreateProject = () => {
    setEditingProject(null);
    setActionError("");
    setIsFormOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setActionError("");
    setIsFormOpen(true);
  };

  const handleSubmitProject = async (payload: CreateProjectPayload) => {
    setIsSubmitting(true);
    setActionError("");

    try {
      if (editingProject) {
        const updatedProject = await updateProject(editingProject.id, payload);

        setProjects((currentProjects) =>
          currentProjects.map((project) =>
            project.id === updatedProject.id ? updatedProject : project,
          ),
        );
      } else {
        const newProject = await createProject(payload);

        setProjects((currentProjects) => [newProject, ...currentProjects]);
      }

      setIsFormOpen(false);
      setEditingProject(null);
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : "Unable to save project. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (project: Project) => {
    const confirmed = window.confirm(
      `Delete "${project.name}"? This action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setActionError("");

    try {
      await deleteProject(project.id);

      setProjects((currentProjects) =>
        currentProjects.filter(
          (currentProject) => currentProject.id !== project.id,
        ),
      );
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : "Unable to delete project. Please try again.",
      );
    }
  };

  const filteredProjects = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        project.name.toLowerCase().includes(normalizedSearch) ||
        (project.description ?? "").toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "All" || project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, searchTerm, statusFilter]);

  if (isLoading) {
    return <LoadingState message="Loading projects..." />;
  }

  if (hasError) {
    return (
      <ErrorState
        message="We couldn't load your projects. Please try again."
        onRetry={() => {
          void loadProjects();
        }}
      />
    );
  }

  return (
    <div className="min-w-0 pb-10">
      {/* Header */}
      <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#B38708]">Workspace</p>

          <h1 className="mt-1 text-2xl font-black tracking-tight text-[#18181B] sm:text-3xl">
            Projects
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Keep track of active work, progress and project delivery.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateProject}
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#F5C542] px-4 py-3 text-sm font-bold text-[#18181B] transition hover:bg-[#E9B931] focus:outline-none focus:ring-4 focus:ring-[#F5C542]/30 sm:w-auto"
        >
          <Plus size={18} />
          New project
        </button>
      </div>

      {/* Action error */}
      {actionError && (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {actionError}
        </div>
      )}

      {/* Filters */}
      <section className="mt-8 w-full overflow-visible rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex min-w-0 flex-col gap-3 md:flex-row">
          <div className="relative min-w-0 flex-1">
            <label htmlFor="project-search" className="sr-only">
              Search projects
            </label>

            <Search
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              id="project-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search projects..."
              className="block w-full min-w-0 rounded-xl border border-gray-200 bg-[#FAFAF8] py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#D9A514] focus:ring-4 focus:ring-[#F5C542]/15"
            />
          </div>

          <div className="min-w-0 md:w-52 md:shrink-0">
            <SelectDropdown
              label="Filter projects by status"
              value={statusFilter}
              options={statusOptions}
              onChange={setStatusFilter}
            />
          </div>
        </div>
      </section>

      {/* Projects */}
      <div className="mt-6">
        {filteredProjects.length > 0 ? (
          <div className="grid min-w-0 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6"
              >
                <div className="flex min-w-0 items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF4C7] text-[#9A7407]">
                      <FolderKanban size={20} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-gray-400">
                        {getStatusLabel(project.status)}
                      </p>

                      <h2 className="mt-1 truncate text-base font-bold text-[#18181B]">
                        {project.name}
                      </h2>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${getStatusStyles(
                      project.status,
                    )}`}
                  >
                    {getStatusLabel(project.status)}
                  </span>
                </div>

                <p className="mt-5 line-clamp-2 text-sm leading-6 text-gray-500">
                  {project.description || "No project description."}
                </p>

                <div className="mt-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold text-gray-500">
                      Progress
                    </span>

                    <span className="text-xs font-bold text-gray-700">
                      {project.progress}%
                    </span>
                  </div>

                  <div
                    className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={project.progress}
                    aria-label={`${project.name} progress`}
                  >
                    <div
                      className="h-full rounded-full bg-[#F5C542] transition-all"
                      style={{
                        width: `${project.progress}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3 border-t border-gray-100 pt-5">
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-gray-400">
                      Created
                    </p>

                    <p className="truncate text-xs font-bold text-gray-700">
                      {formatDate(project.createdAt)}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditProject(project)}
                      aria-label={`Edit ${project.name}`}
                      className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#F5C542]/20"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => void handleDeleteProject(project)}
                      aria-label={`Delete ${project.name}`}
                      className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/20"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF4C7] text-[#9A7407]">
              <FolderKanban size={22} />
            </div>

            <h2 className="mt-4 text-base font-bold text-[#18181B]">
              {projects.length === 0 ? "No projects yet" : "No projects found"}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              {projects.length === 0
                ? "Create your first project to start tracking your workspace."
                : "Try changing your search or status filter to find the project you are looking for."}
            </p>

            {projects.length === 0 && (
              <button
                type="button"
                onClick={handleCreateProject}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#F5C542] px-4 py-3 text-sm font-bold text-[#18181B] transition hover:bg-[#E9B931] focus:outline-none focus:ring-4 focus:ring-[#F5C542]/30"
              >
                <Plus size={18} />
                Create your first project
              </button>
            )}
          </div>
        )}
      </div>

      {/* Project form */}
      {isFormOpen && (
        <ProjectForm
          project={editingProject}
          onClose={() => {
            if (!isSubmitting) {
              setIsFormOpen(false);
              setEditingProject(null);
            }
          }}
          onSubmit={handleSubmitProject}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}

export default Projects;
