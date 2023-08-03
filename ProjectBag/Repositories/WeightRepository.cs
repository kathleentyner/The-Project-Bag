using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using ProjectBag.Models;
using ProjectBag.Utils;
using ProjectBag.Repositories;


namespace ProjectBag.Repositories
{
    public class WeightRepository : BaseRepository, IWeightRepository
    { 
        public WeightRepository(IConfiguration configuration) : base(configuration) { }

       //get all WeightTags
        
        public List<Weight> GetAllWeightTags()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Name]
                        FROM WeightTag
                        ORDER BY [Name] ASC";

                    var reader = cmd.ExecuteReader();

                    var weightTags = new List<Weight>();
                    while (reader.Read())
                    {
                        weightTags.Add(new Weight()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        });
                    }

                    reader.Close();

                    return weightTags;
                }
            }
        }

        //Get WeightTag by ID
        public Weight GetWeightTagById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"
                        SELECT Id, [Name]
                        FROM WeightTag
                        WHERE Id = @Id"
                    ;

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Weight weightTag = null;
                    if (reader.Read())
                    {
                        weightTag = new Weight()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        };
                    }

                    reader.Close();

                    return weightTag;
                }
            }
        }
//add a new WeightTag
        public void AddWeightTag(Weight weightTag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO WeightTag([Name])
                        OUTPUT INSERTED.ID
                        VALUES (@Name)";

                    DbUtils.AddParameter(cmd, "@Name", weightTag.Name);

                    weightTag.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        //delete a weightTag from the database
        public void DeleteWeightTag(int id)
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

        //edit existing Weight tag
        public void EditWeightTag(Weight weightTag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       UPDATE WeightTag
                       SET Name = @Name
                       WHERE Id = @Id"
                    ;

                    DbUtils.AddParameter(cmd, "@Name", weightTag.Name);
                    DbUtils.AddParameter(cmd, "@Id", weightTag.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
