using ProjectBag.Models;

namespace ProjectBag.Repositories
{
    public interface IFiberTagRepository
    {
        void AddFiberTag(FiberTag fiberTag);
        void DeleteFiberTag(int id);
        void EditFiberTag(FiberTag fiberTag);
        public List<FiberTag> GetAllFiberTags();
        public FiberTag GetFiberTagById(int id);
    }
}
