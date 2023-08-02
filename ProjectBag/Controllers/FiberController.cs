using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectBag.Models;
using ProjectBag.Repositories;


namespace ProjectBag.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FiberController : ControllerBase
    {
        private readonly IFiberRepository _fiberRepository;
        public FiberController(IFiberRepository fiberRepository)
        {
            _fiberRepository = fiberRepository;
        }
        //get all 
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_fiberRepository.GetAllFiberTags());
        }

        //get by id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var fiberTag = _fiberRepository.GetFiberTagById(id);
            if (fiberTag == null)
            {
                return NotFound();
            }
            return Ok(fiberTag);
        }


        //add a tag
        [HttpPost]
        public IActionResult Post(Fiber fiberTag)
        {
            _fiberRepository.AddFiberTag(fiberTag);
            return CreatedAtAction("Get", new { id = fiberTag.Id }, fiberTag);
        }

        //delete a tag
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _fiberRepository.DeleteFiberTag(id);
            return NoContent();
        }

        // edit a tag
        [HttpPut("{id}")]
        public IActionResult Put(int id, Fiber fiberTag)
        {
            if (id != fiberTag.Id)
            {
                return BadRequest();
            }

            _fiberRepository.EditFiberTag(fiberTag);
            return NoContent();
        }

    }
}
