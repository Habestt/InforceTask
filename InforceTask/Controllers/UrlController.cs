using InforceTask.BLL.DTOs;
using InforceTask.BLL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InforceTask.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UrlController : ControllerBase
    {
        private readonly IURLService _urlService;
        public UrlController(IURLService urlService)
        {
            _urlService = urlService;
        }

        [HttpPost("create")]
        public async Task Create([FromBody] string originalUrl)
        {
            var shortUrl = new CreateShortUrlDTO
            {
                OriginalUrl = originalUrl
            };
            await _urlService.Add(shortUrl);
            
        }

        [HttpGet("GetByOriginalUrl")]
        public Task<URLDTO> GetByOriginalUrl(string url)
        {
            var shortUrl = _urlService.GetByOriginalUrl(url);            

            return shortUrl;
        }

        [HttpGet("GetByShortUrl")]
        public Task<URLDTO> GetByShortUrl(string url)
        {
            var shortUrl = _urlService.GetByShortUrl(url);

            return shortUrl;
        }
    }
}
