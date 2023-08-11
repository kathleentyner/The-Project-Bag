using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using ProjectBag.Models;
using ProjectBag.Utils;
using ProjectBag.Repositories;


namespace ProjectBag.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

       // get all users

        public List<User> GetAllUsers()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Name], Email
                        FROM [User]
                        ORDER BY [Name] ASC";

                    var reader = cmd.ExecuteReader();

                    var users = new List<User>();
                    while (reader.Read())
                    {
                        users.Add(new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email")
                        });
                    }

                    reader.Close();

                    return users;
                }
            }
        }


        public User GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name, Email
                          FROM [User] 
                             
                         WHERE Email = @email";

                    DbUtils.AddParameter(cmd, "@email", email);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                        };
                    }
                        reader.Close();

                        return user;
                    }
                }
            }

        

        //Get User by ID
        public User GetUserById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"
                        SELECT Id, [Name], Email
                        FROM [User]
                        WHERE Id = @Id"
                    ;

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    User user = null;
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email")
                        };
                    }

                    reader.Close();

                    return user;
                }
            }
        }


        //add a new user
      public void AddUser(User user)
        { 
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {//output inserted means create the ID
                    cmd.CommandText = @"
                        INSERT INTO [User] ([Name], Email)
                        OUTPUT INSERTED.ID 
                        VALUES (@User)";

                    DbUtils.AddParameter(cmd, "@Name", user.Name);
                    DbUtils.AddParameter(cmd, "Email", user.Email);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }

        }

            //delete a user from the database
         public void DeleteUser(int id)
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                        DELETE FROM [User]
                        WHERE Id = @Id";

                        DbUtils.AddParameter(cmd, "@Id", id);

                        cmd.ExecuteNonQuery();
                    }
                }
            }

            //edit existing fiber tag
           public void EditUser(User user)
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                       UPDATE [User]
                       SET Name = @Name
                       SET  Email = @Email
                       WHERE Id = @Id"
                        ;

                        DbUtils.AddParameter(cmd, "@Name", user.Name);
                        DbUtils.AddParameter(cmd, "@Id", user.Id);
                        DbUtils.AddParameter(cmd, "@Email", user.Email);

                        cmd.ExecuteNonQuery();
                    }
                }
            }
        }
    }
