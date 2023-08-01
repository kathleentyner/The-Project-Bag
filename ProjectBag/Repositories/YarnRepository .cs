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
    public class YarnRepository : BaseRepository, IYarnRepository
    {
        public YarnRepository(IConfiguration configuration) : base(configuration) { }

        //get all 

        public List<Yarn> GetAllYarns()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"

                        SELECT y.Id, y.Brand, y.Color, y.Quantity, y.FiberId, y.WeightId, f.Id, w.Id 
                        FROM Yarn y                        
                        LEFT JOIN FiberTag f ON f.Id = FiberId
                        LEFT JOIN WeightTag w on w.Id = WeightId
                        ORDER BY y.WeightId";
                    var reader = cmd.ExecuteReader();

                    var yarns = new List<Yarn>();
                    while (reader.Read())
                    {
                        yarns.Add(new Yarn()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Brand= DbUtils.GetString(reader, "Brand"),
                            Color = DbUtils.GetString(reader, "Color"),
                            Quantity = DbUtils.GetString(reader, "Quantity"),
                            
                       
                            fiberTag = new FiberTag()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name")
                            },
                            weightTag = new WeightTag()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name")
                            }
                        });
                    }

                    reader.Close();

                    return yarns;
                }
            }
        }

 

        public Yarn GetYarnById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
            
                         SELECT y.Id, y.Brand, y.Color, y.Quantity, y.FiberId, y.WeightId, f.Id, w.Id, py.Id, py.ProjectId, py.YarnId, p.Id, p.PatternName
                        FROM Yarn y                        
                        LEFT JOIN FiberTag f ON f.Id = FiberId
                        LEFT JOIN WeightTag w on w.Id = WeightId
                        LEFT JOIN ProjectYarn py on py.YarnId = y.Id
                        LEFT JOIN Project p on p.Id = py.ProjectId
                          WHERE p.Id = @id"; ;

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                   Yarn yarn = null;
                    if (reader.Read())
                    {
                        yarn = new Yarn()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Brand = DbUtils.GetString(reader, "Brand"),
                            Color = DbUtils.GetString(reader,"Color"),
                            Quantity = DbUtils.GetString(reader,"Quantity"),
                                                        
                            fiberTag = new FiberTag()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name")
                            },
                            weightTag = new WeightTag()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name")
                            },

                            projects = new List<Project>() //add tag to a new list of tags for the specific post. 
                        };
                    }

                    if (DbUtils.IsNotDbNull(reader, "ProjectId") && !yarn.projects.Any(x => x.Id == DbUtils.GetNullableInt(reader, "ProjectId")))
                    {
                        yarn.projects.Add(new Project
                        {
                            Id = DbUtils.GetInt(reader, "PatternId"),
                            PatternName= DbUtils.GetString(reader, "PatternName"),
                       

                        });

                    }

                    reader.Close();

                    return yarn;
                }
            }
        }


        public void AddYarn(Yarn yarn)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Yarn (Brand, Color, Quantity, FiberId, WeightId)
                        OUTPUT INSERTED.ID
                        VALUES (@brand, @color, @quantity, @fiberId, @weightId,)";
                    DbUtils.AddParameter(cmd, "@brand", yarn.Brand);
                    DbUtils.AddParameter(cmd, "@color", yarn.Color);
                    DbUtils.AddParameter(cmd, "@quantity", yarn.Quantity);
                    DbUtils.AddParameter(cmd, "@fiberId", yarn.FiberId);
                    DbUtils.AddParameter(cmd, "@weightId", yarn.WeightId);


                    yarn.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void DeleteYarn(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Yarn WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void EditYarn(Yarn yarn)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Yarn
                           SET Brand = @Brand,
                               Color = @Color,
                               Quantity = @Quantity,
                               FiberId = @FiberId,
                               WeightId = @WeightId 
                            
                               WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@brand", yarn.Brand);
                    DbUtils.AddParameter(cmd, "@color", yarn.Color);
                    DbUtils.AddParameter(cmd, "@quantity", yarn.Quantity);
                    DbUtils.AddParameter(cmd, "@fiberId", yarn.FiberId);
                    DbUtils.AddParameter(cmd, "@weightId", yarn.WeightId);
                    DbUtils.AddParameter(cmd, "@Id", yarn.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}