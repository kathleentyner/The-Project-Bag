using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectBag.Models;
using ProjectBag.Repositories;


namespace ProjectBag.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeightController : ControllerBase
    {
        private readonly IWeightRepository _weightRepository;
        public WeightController(IWeightRepository weightRepository)
        {
            _weightRepository = weightRepository;
        }
        //get all 
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_weightRepository.GetAllWeightTags());
        }

        //get by id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var weightTag = _weightRepository.GetWeightTagById(id);
            if (weightTag == null)
            {
                return NotFound();
            }
            return Ok(weightTag);
        }


        //add a weighttag
        [HttpPost]
        public IActionResult Post( Weight weightTag)
        {
            _weightRepository.AddWeightTag(weightTag);
            return CreatedAtAction("Get", new { id = weightTag.Id }, weightTag);
        }

        //delete a tag
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _weightRepository.DeleteWeightTag(id);
            return NoContent();
        }

        // edit a tag
        [HttpPut("{id}")]
        public IActionResult Put(int id,Weight weightTag)
        {
            if (id != weightTag.Id)
            {
                return BadRequest();
            }

            _weightRepository.EditWeightTag(weightTag);
            return NoContent();
        }

    }
}
