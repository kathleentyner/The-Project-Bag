using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectBag.Models;
using ProjectBag.Repositories;


namespace ProjectBag.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FiberTagController : ControllerBase
    {
        private readonly IFiberTagRepository _fiberTagRepository;
        public FiberTagController(IFiberTagRepository fiberTagRepository)
        {
            _fiberTagRepository = fiberTagRepository;
        }
        //get all 
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_fiberTagRepository.GetAllFiberTags());
        }

        //get by id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var fiberTag = _fiberTagRepository.GetFiberTagById(id);
            if (fiberTag == null)
            {
                return NotFound();
            }
            return Ok(fiberTag);
        }


        //add a tag
        [HttpPost]
        public IActionResult Post(FiberTag fiberTag)
        {
            _fiberTagRepository.AddFiberTag(fiberTag);
            return CreatedAtAction("Get", new { id = fiberTag.Id }, fiberTag);
        }

        //delete a tag
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _fiberTagRepository.DeleteFiberTag(id);
            return NoContent();
        }

        // edit a tag
        [HttpPut("{id}")]
        public IActionResult Put(int id, FiberTag fiberTag)
        {
            if (id != fiberTag.Id)
            {
                return BadRequest();
            }

            _fiberTagRepository.EditFiberTag(fiberTag);
            return NoContent();
        }

    }
}
