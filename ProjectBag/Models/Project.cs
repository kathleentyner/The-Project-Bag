using Azure;

namespace ProjectBag.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string PatternName { get; set; }
        public string Designer { get; set; }
        public string PatternUrl { get; set; }
        public string PhotoUrl { get; set; }
        public string Notes { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool Queued { get; set; }
        public int FiberId { get; set; }
        public int WeightId { get; set; }
        public int UserId { get; set; }
        public User? user { get; set; }
        public Fiber? fiberTag { get; set; }
        public Weight? weightTag {get; set;}
        public ProjectYarn? projectYarn { get; set; }
        public List<Yarn> Yarns { get; set; } = new List<Yarn>();//added to get all the tags assigned to a post



    }
}
