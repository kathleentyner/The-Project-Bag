using ProjectBag.Models;

namespace ProjectBag.Repositories
{
    public interface IWeightRepository
    {
        void AddWeightTag(Weight weightTag);
        void DeleteWeightTag(int id);
        void EditWeightTag(Weight weightTag);
        public List<Weight> GetAllWeightTags();
        Weight GetWeightTagById(int id);
    }
}
