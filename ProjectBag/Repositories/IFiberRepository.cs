using ProjectBag.Models;

namespace ProjectBag.Repositories
{
    public interface IFiberRepository
    {
        void AddFiberTag(Fiber fiberTag);
        void DeleteFiberTag(int id);
        void EditFiberTag(Fiber fiberTag);
        public List<Fiber> GetAllFiberTags();
        public Fiber GetFiberTagById(int id);
    }
}
