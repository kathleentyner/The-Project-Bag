using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using ProjectBag.Models;
using ProjectBag.Utils;
using ProjectBag.Repositories;
using System.ComponentModel.DataAnnotations;

namespace ProjectBag.Repositories
{
    public class ProjectYarnRepository : BaseRepository, IProjectYarnRepository
    { 
        public ProjectYarnRepository(IConfiguration configuration) : base(configuration) { }

       //get all 
        
        public List<ProjectYarn> GetAllProjectYarns()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, ProjectId, YarnId
                        FROM ProjectYarn";

                    var reader = cmd.ExecuteReader();

                    var projectYarns = new List<ProjectYarn>();
                    while (reader.Read())
                    {
                        projectYarns.Add(new ProjectYarn()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ProjectId = DbUtils.GetInt(reader, "ProjectId"),
                            YarnId = DbUtils.GetInt(reader, "YarnId")
                        });
                    }

                    reader.Close();

                    return projectYarns;
                }
            }
        }

        //Get by ID
     
        public ProjectYarn GetProjectYarnById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"
                        SELECT Id, ProjectId, YarnId
                        FROM ProjectYarn
                        WHERE Id = @Id"
                    ;

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    ProjectYarn projectYarn = null;
                    if (reader.Read())
                    {
                        projectYarn = new ProjectYarn()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ProjectId = DbUtils.GetInt(reader, "ProjectId"),
                            YarnId = DbUtils.GetInt(reader, "YarnId")
                        };
                    }

                    reader.Close();

                    return projectYarn;
                }
            }
        }
        //add new
        public void AddProjectYarn(ProjectYarn projectYarn)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {//output inserted means create the ID
                    cmd.CommandText = @"
                        INSERT INTO ProjectYarn (ProjectId, YarnId)
                        OUTPUT INSERTED.ID 
                        VALUES (@ProjectId, @YarnId)";

                    DbUtils.AddParameter(cmd, "@ProjectId", projectYarn.ProjectId);
                    DbUtils.AddParameter(cmd, "@YarnId", projectYarn.YarnId);

                    projectYarn.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        //delete 
        public void DeleteProjectYarn(ProjectYarn projectYarn)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM ProjectYarn
                        WHERE ProjectId = @ProjectId AND YarnId = @YarnId";

                    DbUtils.AddParameter(cmd, "@ProjectId", projectYarn.ProjectId);
                    DbUtils.AddParameter(cmd, "@YarnId", projectYarn.YarnId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        //edit 
        public void EditProjectYarn(ProjectYarn projectYarn)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       UPDATE ProjectYarn
                       SET ProjectId = @ProjectId
                       SET  YarnId = @YarnId
                       WHERE Id = @Id"
                    ;

                    DbUtils.AddParameter(cmd, "@ProjectId", projectYarn.ProjectId);
                    DbUtils.AddParameter(cmd, "YarnId", projectYarn.YarnId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
