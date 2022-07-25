using InforceTask.BLL.DTOs;
using InforceTask.BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InforceTask.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UrlController : ControllerBase
    {
        private IURLService _urlService;
        public UrlController(IURLService urlService)
        {
            _urlService = urlService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateShortUrlDTO createUrl)
        {
            try
            {
                await _urlService.Add(createUrl);
                return Ok(createUrl);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetByOriginalUrl/{url}")]
        public async Task<URLDTO> GetByOriginalUrl(string url)
        {
            return await _urlService.GetByOriginalUrl(url);
        }

        [HttpGet("GetByShortUrl/{url}")]
        public async Task<URLDTO> GetByShortUrl(string url)
        {
            return await _urlService.GetByShortUrl(url);
        }

        [HttpGet("GetAll")]
        public async Task<IEnumerable<URLDTO>> GetAllUrls()
        {
            return await _urlService.GetAllUrls();
        }

        [HttpDelete("Delete/{id}")]
        public async Task DeleteUrl(int id)
        {
            await _urlService.delete(id);
        }
    }
}
