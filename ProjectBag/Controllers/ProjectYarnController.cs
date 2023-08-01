using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectBag.Models;
using ProjectBag.Repositories;


namespace ProjectBag.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectYarnController : ControllerBase
    {
        private readonly IProjectYarnRepository _projectYarnRepository;
        public ProjectYarnController(IProjectYarnRepository projectYarnRepository)
        {
            _projectYarnRepository = projectYarnRepository;
        }
        //get all 
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_projectYarnRepository.GetAllProjectYarns());
        }

        //get by id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var projectYarn = _projectYarnRepository.GetProjectYarnById(id);
            if (projectYarn == null)
            {
                return NotFound();
            }
            return Ok(projectYarn);
        }


        //add a tag
        [HttpPost]
        public IActionResult Post(ProjectYarn projectYarn)
        {
            _projectYarnRepository.AddProjectYarn(projectYarn);
            return CreatedAtAction("Get", new { id = projectYarn.Id }, projectYarn);
        }

        //delete a tag
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _projectYarnRepository.DeleteProjectYarn(id);
            return NoContent();
        }

        // edit a tag
        [HttpPut("{id}")]
        public IActionResult Put(int id, ProjectYarn projectYarn)
        {
            if (id != projectYarn.Id)
            {
                return BadRequest();
            }

            _projectYarnRepository.EditProjectYarn(projectYarn);
            return NoContent();
        }

    }
}
