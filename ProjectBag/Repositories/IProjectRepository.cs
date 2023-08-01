using ProjectBag.Models;

namespace ProjectBag.Repositories
{
    public interface IProjectRepository
    {
        void AddProject(Project project);
        void DeleteProject(int id);
        void EditProject(Project project);
        List<Project> GetAllProjects();
        Project GetProjectById(int id);
    }
}