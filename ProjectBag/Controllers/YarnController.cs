using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectBag.Models;
using ProjectBag.Repositories;


namespace ProjectBag.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class YarnController : ControllerBase
    {
        private readonly IYarnRepository _yarnRepository;
        public YarnController(IYarnRepository yarnRepository)
        {
            _yarnRepository = yarnRepository;
        }
        //get all 
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_yarnRepository.GetAllYarns());
        }

        //get by id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var yarn = _yarnRepository.GetYarnById(id);
            if (yarn == null)
            {
                return NotFound();
            }
            return Ok(yarn);
        }


        //add 
        [HttpPost]
        public IActionResult Post(Yarn yarn)
        {
            _yarnRepository.AddYarn(yarn);
            return CreatedAtAction("Get", new { id = yarn.Id }, yarn);
        }

        //delete 
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _yarnRepository.DeleteYarn(id);
            return NoContent();
        }

        // edit 
        [HttpPut("{id}")]
        public IActionResult Put(int id, Yarn yarn)
        {
            if (id != yarn.Id)
            {
                return BadRequest();
            }

            _yarnRepository.EditYarn(yarn);
            return NoContent();
        }

    }
}
