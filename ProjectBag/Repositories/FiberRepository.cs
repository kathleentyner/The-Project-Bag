using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using ProjectBag.Models;
using ProjectBag.Utils;
using ProjectBag.Repositories;


namespace ProjectBag.Repositories
{
    public class FiberRepository : BaseRepository, IFiberRepository
    { 
        public FiberRepository(IConfiguration configuration) : base(configuration) { }

       //get all FiberTags
        
        public List<Fiber> GetAllFiberTags()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Name]
                        FROM FiberTag
                        ORDER BY [Name] ASC";

                    var reader = cmd.ExecuteReader();

                    var fiberTags = new List<Fiber>();
                    while (reader.Read())
                    {
                        fiberTags.Add(new Fiber()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        });
                    }

                    reader.Close();

                    return fiberTags;
                }
            }
        }

        //Get FiberTag by ID
        public Fiber GetFiberTagById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"
                        SELECT Id, [Name]
                        FROM FiberTag
                        WHERE Id = @Id"
                    ;

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Fiber fiberTag = null;
                    if (reader.Read())
                    {
                        fiberTag = new Fiber()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        };
                    }

                    reader.Close();

                    return fiberTag;
                }
            }
        }
//add a new FiberTag
        public void AddFiberTag(Fiber fiberTag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO FiberTag([Name])
                        OUTPUT INSERTED.ID
                        VALUES (@FiberTag)";

                    DbUtils.AddParameter(cmd, "@Name", fiberTag.Name);

                    fiberTag.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        //delete a FiberTag from the database
        public void DeleteFiberTag(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM FiberTag
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        //edit existing fiber tag
        public void EditFiberTag(Fiber fiberTag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       UPDATE FiberTag
                       SET Name = @Name
                       WHERE Id = @Id"
                    ;

                    DbUtils.AddParameter(cmd, "@Name", fiberTag.Name);
                    DbUtils.AddParameter(cmd, "@Id", fiberTag.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
