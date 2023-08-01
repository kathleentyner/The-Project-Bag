using ProjectBag.Models;

namespace ProjectBag.Repositories
{
    public interface IProjectYarnRepository
    {
        void AddProjectYarn(ProjectYarn projectYarn);
        void DeleteProjectYarn(int id);
        void EditProjectYarn(ProjectYarn projectYarn);
        List<ProjectYarn> GetAllProjectYarns();
        ProjectYarn GetProjectYarnById(int id);
    }
}