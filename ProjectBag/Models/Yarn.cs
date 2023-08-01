using Microsoft.Identity.Client;

namespace ProjectBag.Models
{
    public class Yarn
    {
       public int Id { get; set; }
        public string Brand { get; set; }
        public string Color { get; set; }
        public string Quantity { get; set; }
        public int FiberId {get; set; }
        public int WeightId { get; set; }
        public FiberTag fiberTag { get; set; } = new FiberTag();
        public WeightTag weightTag { get; set; } = new WeightTag();
        public List<Project> projects { get; set; } = new List<Project>();//added to get all the tags assigned to a post

    }
}
