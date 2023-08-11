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

                        SELECT y.Id, y.Brand, y.Color, y.Quantity, y.YarnUrl, y.FiberId, y.WeightId, f.Id AS FID, w.Id AS WID, f.Name AS FName, w.Name AS WName
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
                            YarnUrl = DbUtils.GetString(reader, "YarnUrl"),
                       
                            fiberTag = new Fiber()
                            {
                                Id = DbUtils.GetInt(reader, "FID"),
                                Name = DbUtils.GetString(reader, "FName")
                            },
                            weightTag = new Weight()
                            {
                                Id = DbUtils.GetInt(reader, "WID"),
                                Name = DbUtils.GetString(reader, "WName")
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
            
                         SELECT y.Id, y.Brand, y.Color, y.Quantity, y.YarnUrl, y.FiberId, y.WeightId, f.Id AS FID, w.Id AS WID, f.Name AS FName, w.Name AS WName, py.Id as PYID, py.ProjectId, py.YarnId
                        FROM Yarn y                        
                        LEFT JOIN FiberTag f ON f.Id = FiberId
                        LEFT JOIN WeightTag w on w.Id = WeightId
                        LEFT JOIN ProjectYarn py on py.YarnId = y.Id
                  
                          WHERE y.Id = @id"; 

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
                            YarnUrl =  DbUtils.GetString(reader, "YarnUrl"),
                            FiberId = DbUtils.GetInt(reader, "FiberId"),
                            WeightId = DbUtils.GetInt(reader, "WeightId"),
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

                          
                        };

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
                        INSERT INTO Yarn (Brand, Color, Quantity, YarnUrl, FiberId, WeightId)
                        OUTPUT INSERTED.ID
                        VALUES (@brand, @color, @quantity, @yarnUrl, @fiberId, @weightId)";
                    DbUtils.AddParameter(cmd, "@brand", yarn.Brand);
                    DbUtils.AddParameter(cmd, "@color", yarn.Color);
                    DbUtils.AddParameter(cmd, "@quantity", yarn.Quantity);
                    DbUtils.AddParameter(cmd, "@yarnUrl", yarn.YarnUrl);
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
                               YarnUrl = @YarnUrl,
                               FiberId = @FiberId,
                               WeightId = @WeightId 
                            
                               WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@brand", yarn.Brand);
                    DbUtils.AddParameter(cmd, "@color", yarn.Color);
                    DbUtils.AddParameter(cmd, "@quantity", yarn.Quantity);
                    DbUtils.AddParameter(cmd, "@YarnUrl", yarn.YarnUrl);
                    DbUtils.AddParameter(cmd, "@fiberId", yarn.FiberId);
                    DbUtils.AddParameter(cmd, "@weightId", yarn.WeightId);
                    DbUtils.AddParameter(cmd, "@Id", yarn.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}