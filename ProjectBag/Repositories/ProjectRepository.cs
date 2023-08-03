using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using ProjectBag.Models;
using ProjectBag.Utils;
using ProjectBag.Repositories;
using Azure;
using Microsoft.Extensions.Hosting;


namespace ProjectBag.Repositories
{
    public class ProjectRepository : BaseRepository, IProjectRepository
    {
        public ProjectRepository(IConfiguration configuration) : base(configuration) { }

        //get all 

        public List<Project> GetAllProjects()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"

                        SELECT p.Id, p.PatternName, p.Designer, p.PatternUrl AS Pattern, p.PhotoURL AS Photo, p.Notes, p.StartDate, p.EndDate, p.Queued, p.FiberId, p.WeightId, p.UserId, u.Id, u.Name, u.Email, f.Id AS FID, w.Id AS WID, f.Name AS FName, w.Name AS WName
                        FROM Project p                        
                        LEFT JOIN [User] u ON u.Id = p.UserId
                        LEFT JOIN FiberTag f ON f.Id = FiberId
                        LEFT JOIN WeightTag w on w.Id = WeightId
                        ORDER BY p.PatternName";
                    var reader = cmd.ExecuteReader();

                    var projects = new List<Project>();
                    while (reader.Read())
                    {
                        projects.Add(new Project()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PatternName= DbUtils.GetString(reader, "PatternName"),
                            Designer = DbUtils.GetString(reader, "Designer"),
                            PatternUrl = DbUtils.GetString(reader, "Pattern"),
                            PhotoUrl = DbUtils.GetString(reader,"Photo"), 
                            Notes = DbUtils.GetString(reader,"Notes"),
                            StartDate= DbUtils.GetDateTime(reader, "StartDate"),
                            EndDate = DbUtils.GetDateTime(reader, "EndDate"),
                            Queued = DbUtils.GetBoolean(reader, "Queued"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            user = new User()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Email = DbUtils.GetString(reader, "Email"),
                                
                            },
                            FiberId = DbUtils.GetInt(reader,"FiberID"),
                            fiberTag = new Fiber()
                            {
                                Id = DbUtils.GetInt(reader, "FID"),
                                Name = DbUtils.GetString(reader, "FName")
                            },
                           WeightId = DbUtils.GetInt(reader,"WeightId"),
                            weightTag = new Weight()
                            {
                                Id = DbUtils.GetInt(reader, "WID"),
                                Name = DbUtils.GetString(reader, "WName")
                            }
                        });
                    }

                    reader.Close();

                    return projects;
                }
            }
        }

 

        public Project GetProjectById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
            
                        SELECT p.Id, p.PatternName, p.Designer, p.PatternUrl AS Pattern, p.PhotoURL AS Photo, p.Notes, p.StartDate, p.EndDate, p.Queued, p.FiberId, p.WeightId, p.UserId, u.Id, u.Name, u.Email, f.Id AS FID, w.Id AS WID, f.Name AS FName, w.Name AS WName, y.Id AS YarnId, y.Brand, py.Id, py.ProjectId, py.YarnId
                        FROM Project p                        
                        LEFT JOIN [User] u ON u.Id = p.UserId
                        LEFT JOIN FiberTag f ON f.Id = FiberId
                        LEFT JOIN WeightTag w on w.Id = WeightId
                        LEFT JOIN ProjectYarn py on py.ProjectId = p.Id
                        LEFT JOIN Yarn y on y.Id = py.YarnId
                          WHERE p.Id = @id"; 

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                   Project project = null;
                    if (reader.Read())
                    {
                        project = new Project()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PatternName = DbUtils.GetString(reader, "PatternName"),
                            PhotoUrl = DbUtils.GetString(reader,"Photo"),
                            Notes = DbUtils.GetString(reader,"Notes"),
                            Designer = DbUtils.GetString(reader, "Designer"),
                            PatternUrl = DbUtils.GetString(reader, "Pattern"),
                            StartDate = DbUtils.GetDateTime(reader, "StartDate"),
                            EndDate = DbUtils.GetDateTime(reader, "EndDate"),
                            Queued = DbUtils.GetBoolean(reader, "Queued"),
                            FiberId = DbUtils.GetInt(reader,"FiberId"),
                            WeightId = DbUtils.GetInt(reader, "WeightId"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            user = new User()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Email = DbUtils.GetString(reader, "Email"),

                            },
                            fiberTag = new Fiber()
                            {
                                Id = DbUtils.GetInt(reader, "FID"),
                                Name = DbUtils.GetString(reader, "FName")
                            },
                            weightTag = new Weight()
                            {
                                Id = DbUtils.GetInt(reader, "WID"),
                                Name = DbUtils.GetString(reader, "WName")
                            },

                            Yarns = new List<Yarn>() //add tag to a new list of tags for the specific post. 
                        };
                    }

                    if (DbUtils.IsNotDbNull(reader, "YarnId") && !project.Yarns.Any(x => x.Id == DbUtils.GetNullableInt(reader, "YarnId")))
                    {
                        project.Yarns.Add(new Yarn
                        {
                            Id = DbUtils.GetInt(reader, "YarnId"),
                            Brand= DbUtils.GetString(reader, "Brand"),
                                                    

                        });

                    }

                    reader.Close();

                    return project;
                }
            }
        }


        public void AddProject(Project project)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Project (PatternName, Designer, PatternUrl, PhotoUrl, Notes, StartDate, EndDate, Queued, FiberId, WeightId, UserId)
                        OUTPUT INSERTED.ID
                        VALUES (@patternName, @designer, @patternUrl, @photoUrl, @notes, @startDate, @endDate, @queued, @fiberId, @weightId, @userId)";
                    DbUtils.AddParameter(cmd, "@patternName", project.PatternName);
                    DbUtils.AddParameter(cmd, "@designer", project.Designer);
                    DbUtils.AddParameter(cmd, "@patternUrl", project.PatternUrl);
                    DbUtils.AddParameter(cmd, "@photoUrl", project.PhotoUrl);
                    DbUtils.AddParameter(cmd, "@Notes", project.Notes);
                    DbUtils.AddParameter(cmd, "@StartDate", project.StartDate);
                    DbUtils.AddParameter(cmd, "@endDate", project.EndDate);
                    DbUtils.AddParameter(cmd, "@queued", project.Queued);
                    DbUtils.AddParameter(cmd, "@fiberId", project.FiberId);
                    DbUtils.AddParameter(cmd, "@weightId", project.WeightId);
                    DbUtils.AddParameter(cmd, "@userId", project.UserId);


                    project.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void DeleteProject(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Project WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void EditProject(Project project)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Post
                           SET PatternName = @PatternName,
                               Designer = @Designer,
                               PatternUrl = @PatternUrl,
                               PhotoUrl = @PhotoUrl,
                               Notes = @Notes,
                               StartDate = @StartDate,
                               EndDate = @EndDate,
                               Queued = @Queued,
                               FiberId = @FiberId,
                               WeightId = @WeightId, 
                               UserId = @UserId
                               WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@patternName", project.PatternName);
                    DbUtils.AddParameter(cmd, "@designer", project.Designer);
                    DbUtils.AddParameter(cmd, "@patternUrl", project.PatternUrl);
                    DbUtils.AddParameter(cmd, "@photoUrl", project.PhotoUrl);
                    DbUtils.AddParameter(cmd, "@Notes", project.Notes);
                    DbUtils.AddParameter(cmd, "@StartDate", project.StartDate);
                    DbUtils.AddParameter(cmd, "@endDate", project.EndDate);
                    DbUtils.AddParameter(cmd, "@queued", project.Queued);
                    DbUtils.AddParameter(cmd, "@fiberId", project.FiberId);
                    DbUtils.AddParameter(cmd, "@weightId", project.WeightId);
                    DbUtils.AddParameter(cmd, "@userId", project.UserId);
                    DbUtils.AddParameter(cmd, "@Id", project.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}