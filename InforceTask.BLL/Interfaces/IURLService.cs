﻿using InforceTask.BLL.DTOs;

namespace InforceTask.BLL.Interfaces
{
    public interface IURLService
    {
        Task Add(CreateShortUrlDTO entity);
        Task<URLDTO> GetById(int id);
        Task<URLDTO> GetByOriginalUrl(string originalUrl);
        Task<URLDTO> GetByShortUrl(string shortUrl);
    }
}