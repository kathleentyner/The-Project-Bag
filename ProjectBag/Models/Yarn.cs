using Microsoft.Identity.Client;

namespace ProjectBag.Models
{
    public class Yarn
    {
       public int Id { get; set; }
        public string Brand { get; set; }
        public string Color { get; set; }
        public string Quantity { get; set; }
        public string YarnUrl { get; set; }
        public int FiberId {get; set; }
        public int WeightId { get; set; }
        public Fiber? fiberTag { get; set; } 
        public Weight? weightTag { get; set; } 
        public ProjectYarn? projectYarn { get; set; }
     

    }
}
