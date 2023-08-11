using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using ProjectBag.Models;
using ProjectBag.Utils;
using ProjectBag.Repositories;
using System.Reflection;

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
                        SELECT Id, Type, Description, Title, ResourceUrl
                        FROM Resources";

                    var reader = cmd.ExecuteReader();

                    var resources = new List<Resource>();
                    while (reader.Read())
                    {
                        resources.Add(new Resource()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Type = DbUtils.GetString(reader, "Type"),
                            Title = DbUtils.GetString(reader, "Title"),
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
                        SELECT Id, Type, Description, Title, ResourceUrl
                        FROM Resources
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
                            Title = DbUtils.GetString(reader, "Title"),
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
                        INSERT INTO Resources(Type, Description, Title, ResourceUrl)
                        OUTPUT INSERTED.ID
                        VALUES (@Type, @Title, @Description, @ResourceUrl)";

                    DbUtils.AddParameter(cmd, "@Type", resource.Type);
                    DbUtils.AddParameter(cmd, "@Title", resource.Title);
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
                        DELETE FROM Resources
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
                       UPDATE Resources
                       SET Type = @Type,
                       Title = @Title,
                       Description = @Description,
                       ResourceUrl = @ResourceUrl
                       WHERE Id = @Id"
                    ;

                    DbUtils.AddParameter(cmd, "@Type", resource.Type);
                    DbUtils.AddParameter(cmd, "@Title", resource.Title);
                    DbUtils.AddParameter(cmd, "@Description", resource.Description);
                    DbUtils.AddParameter(cmd, "@ResourceUrl", resource.ResourceUrl);
                    DbUtils.AddParameter(cmd, "@Id", resource.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
