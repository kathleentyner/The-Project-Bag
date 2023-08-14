using ProjectBag.Models;

namespace ProjectBag.Repositories
{
    public interface IYarnRepository
    {
        void AddYarn(Yarn yarn);
        void DeleteYarn(int id);
        void EditYarn(Yarn yarn);
        List<Yarn> GetAllYarns();
        Yarn GetYarnById(int id);
        List<Yarn> Search(string criterion, bool sortDescending);
    }
}