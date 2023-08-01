using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using ProjectBag.Models;
using ProjectBag.Utils;
using ProjectBag.Repositories;


namespace ProjectBag.Repositories
{
    public class ResourceRepository : BaseRepository, IResourceRepository

    {
        public ResourceRepository(IConfiguration configuration) : base(configuration) { }

        //get all resources

        public List<Resource> GetAllResources()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Type, Description, ResourceUrl
                        FROM Resource
                        ORDER BY Type ASC";

                    var reader = cmd.ExecuteReader();

                    var resources = new List<Resource>();
                    while (reader.Read())
                    {
                        resources.Add(new Resource()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Type = DbUtils.GetString(reader, "Type"),

                           Description = DbUtils.GetString(reader, "Description"),

                            ResourceUrl = DbUtils.GetString(reader, "ResourceUrl")
                        });
                    }

                    reader.Close();

                    return resources;
                }
            }
        }

        //Get resource by ID
        public Resource GetResourceById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"
                        SELECT Id, Type, Description, ResourceUrl
                        FROM Resource
                        WHERE Id = @Id"
                    ;

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Resource resource = null;
                    if (reader.Read())
                    {
                        resource = new Resource()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Type = DbUtils.GetString(reader, "Type"),

                            Description = DbUtils.GetString(reader, "Description"),

                            ResourceUrl = DbUtils.GetString(reader, "ResourceUrl")
                        };
                    }

                    reader.Close();

                    return resource;
                }
            }
        }
        //add a new resource
        public void AddResource(Resource resource)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Resource(Type, Description, ResourceUrl)
                        OUTPUT INSERTED.ID
                        VALUES (@Resource)";

                    DbUtils.AddParameter(cmd, "@Type", resource.Type);
                    DbUtils.AddParameter(cmd, "@Description", resource.Description);
                    DbUtils.AddParameter(cmd, "@ResourceUrl", resource.ResourceUrl);

                    resource.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        //delete a resource from the database
        public void DeleteResource(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Resource
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        //edit existing resource
        public void EditResource(Resource resource)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       UPDATE Resource
                       SET Type = @Type
                       Set Description = @Description
                        set ResourceUrl = @ResourceUrl
                       WHERE Id = @Id"
                    ;

                    DbUtils.AddParameter(cmd, "@Type", resource.Type);
                    DbUtils.AddParameter(cmd, "@Description", resource.Description);
                    DbUtils.AddParameter(cmd, "@ResourceUrl", resource.ResourceUrl);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
