using InforceTask.BLL.Configurations.AutoMapper;
using InforceTask.BLL.DTOs;
using InforceTask.BLL.Helpers;
using InforceTask.BLL.Interfaces;
using InforceTask.DAL.Interfaces;
using InforceTask.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace InforceTask.BLL.Services
{
    public class URLService : IURLService
    {
        private readonly IRepository<URL> _urlRepository;

        public URLService(IRepository<URL> urlRepository)
        {
            _urlRepository = urlRepository;
        }
        public async Task<URLDTO> GetById(int id)
        {
            var shortUrlDto = AutoMapper<URL, URLDTO>.Map(await _urlRepository.GetByIdAsync(id));
            shortUrlDto.ShortUrl = ShortUrlHelper.Encode(id);
            return shortUrlDto;
        }

        public async Task<URLDTO> GetByShortUrl(string shortUrl)
        {
            var shortUrlDto = AutoMapper<URL, URLDTO>.Map(await _urlRepository.GetByIdAsync(ShortUrlHelper.Decode(shortUrl)));
            shortUrlDto.ShortUrl = shortUrl;
            return shortUrlDto;
        }

        public async Task<URLDTO> GetByOriginalUrl(string originalUrl)
        {
            var urls = await _urlRepository.GetAllAsync();
            foreach (var shortUrl in urls)
            {
                if (shortUrl.OriginalUrl == originalUrl)
                {
                    var shortUrlDto = AutoMapper<URL, URLDTO>.Map(shortUrl);
                    shortUrlDto.ShortUrl = ShortUrlHelper.Encode(shortUrl.Id);
                    return shortUrlDto;
                }
            }
            return null;
        }

        public async Task<IEnumerable<URLDTO>> GetAllUrls()
        {
            IEnumerable<URL> URLs = await _urlRepository.GetAllAsync();

            List<URLDTO> urlDtos = new List<URLDTO>();

            foreach (var url in URLs)
            {
                urlDtos.Add(new URLDTO()
                {
                    Id = url.Id,
                    OriginalUrl = url.OriginalUrl,
                    ShortUrl = ShortUrlHelper.Encode(url.Id),
                    CreatedAt = url.CreatedAt
                });
            }

            return urlDtos;
        }

        public async Task Add(CreateShortUrlDTO entity)
        {
            string pattern = @"^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$";
            Regex regex = new Regex(pattern, RegexOptions.Compiled | RegexOptions.IgnoreCase);
            bool validate = regex.IsMatch(entity.OriginalUrl);

            var url = await _urlRepository.FindFirstAsync(expression: x => x.OriginalUrl == entity.OriginalUrl);

            if (url is not null) throw new ArgumentException("URL already exist");
            if (!validate) throw new ArgumentException("URL is not valid");
            await _urlRepository.AddAsync(AutoMapper<CreateShortUrlDTO, URL>.Map(entity));
        }

        public async Task delete(int id)
        {
            URL url = await _urlRepository.GetByIdAsync(id);
            await _urlRepository.RemoveAsync(url);
        }
    }
}
