using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectBag.Models;
using ProjectBag.Repositories;


namespace ProjectBag.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeightTagController : ControllerBase
    {
        private readonly IWeightTagRepository _weightTagRepository;
        public WeightTagController(IWeightTagRepository weightTagRepository)
        {
            _weightTagRepository = weightTagRepository;
        }
        //get all 
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_weightTagRepository.GetAllWeightTags());
        }

        //get by id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var weightTag = _weightTagRepository.GetWeightTagById(id);
            if (weightTag == null)
            {
                return NotFound();
            }
            return Ok(weightTag);
        }


        //add a weighttag
        [HttpPost]
        public IActionResult Post( WeightTag weightTag)
        {
            _weightTagRepository.AddWeightTag(weightTag);
            return CreatedAtAction("Get", new { id = weightTag.Id }, weightTag);
        }

        //delete a tag
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _weightTagRepository.DeleteWeightTag(id);
            return NoContent();
        }

        // edit a tag
        [HttpPut("{id}")]
        public IActionResult Put(int id,WeightTag weightTag)
        {
            if (id != weightTag.Id)
            {
                return BadRequest();
            }

            _weightTagRepository.EditWeightTag(weightTag);
            return NoContent();
        }

    }
}
