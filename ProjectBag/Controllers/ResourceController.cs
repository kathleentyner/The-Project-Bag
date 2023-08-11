using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectBag.Models;
using ProjectBag.Repositories;


namespace ProjectBag.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResourceController : ControllerBase
    {
        private readonly IResourceRepository _resourceRepository;
        public ResourceController(IResourceRepository resourceRepository)
        {
            _resourceRepository = resourceRepository;
        }
        //get all 
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_resourceRepository.GetAllResources());
        }

        //get by id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var resource = _resourceRepository.GetResourceById(id);
            if (resource== null)
            {
                return NotFound();
            }
            return Ok(resource);
        }


        //add a tag
        [HttpPost]
        public IActionResult Post(Resource resource)
        {
            _resourceRepository.AddResource(resource);
            return CreatedAtAction("Get", new { id = resource.Id }, resource);
        }

        //delete a tag
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _resourceRepository.DeleteResource(id);
            return NoContent();
        }

        // edit a tag
        [HttpPut("{id}")]
        public IActionResult Put(int id, Resource resource)
        {
            if (id != resource.Id)
            {
                return BadRequest();
            }

            _resourceRepository.EditResource(resource);
            return NoContent();
        }

    }
}
