using ProjectBag.Models;

namespace ProjectBag.Repositories
{
    public interface IWeightTagRepository
    {
        void AddWeightTag(WeightTag weightTag);
        void DeleteWeightTag(int id);
        void EditWeightTag(WeightTag weightTag);
        public List<WeightTag> GetAllWeightTags();
        WeightTag GetWeightTagById(int id);
    }
}
