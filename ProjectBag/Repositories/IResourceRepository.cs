using ProjectBag.Models;

namespace ProjectBag.Repositories
{
    public interface IResourceRepository
    {
        void AddResource(Resource resource);
        void DeleteResource(int id);
        void EditResource(Resource resource);
        List<Resource> GetAllResources();
        Resource GetResourceById(int id);

   
    }
}