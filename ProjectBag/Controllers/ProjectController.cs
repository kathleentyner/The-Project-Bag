using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectBag.Models;
using ProjectBag.Repositories;


namespace ProjectBag.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _projectRepository;
        public ProjectController(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }
        //get all 
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_projectRepository.GetAllProjects());
        }

        //get by id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var project = _projectRepository.GetProjectById(id);
            if (project == null)
            {
                return NotFound();
            }
            return Ok(project);
        }


        //add 
        [HttpPost]
        public IActionResult Post(Project project)
        {
            _projectRepository.AddProject(project);
            return CreatedAtAction("Get", new { id = project.Id }, project);
        }

        //delete 
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _projectRepository.DeleteProject(id);
            return NoContent();
        }

        // edit 
        [HttpPut("{id}")]
        public IActionResult Put(int id, Project project)
        {
            if (id != project.Id)
            {
                return BadRequest();
            }

            _projectRepository.EditProject(project);
            return NoContent();
        }

    }
}
