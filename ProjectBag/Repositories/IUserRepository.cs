using ProjectBag.Models;

namespace ProjectBag.Repositories
{
    public interface IUserRepository
    {
       public List<User> GetAllUsers();
       public User GetByEmail(string email);
       public User GetUserById(int id);
       public void AddUser(User user);
       public void DeleteUser(int id);
       public void EditUser(User user);


    }
}