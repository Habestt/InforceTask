using InforceTask.BLL.Configurations.AutoMapper;
using InforceTask.BLL.DTOs;
using InforceTask.BLL.Interfaces;
using InforceTask.DAL.Interfaces;
using InforceTask.DAL.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace InforceTask.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> UserRepository;
        private readonly IConfiguration _configuration;
        private readonly IRepository<UserRefreshToken> _jwtRepository;

        public UserService(IRepository<User> userRepository, IConfiguration configuration, IRepository<UserRefreshToken> jwtRepository)
        {
            UserRepository = userRepository;
            _jwtRepository = jwtRepository;
            _configuration = configuration;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await UserRepository.GetAllAsync();
        }

        public async Task<User> GetByIdAsync(int id)
        {
            return await UserRepository.GetByIdAsync(id);
        }

        public async Task AddAsync(CreateUserDTO entity)
        {
            var dbUser = await UserRepository.FindFirstAsync(expression: x => x.Email == entity.Email || x.UserName == entity.UserName);
            if (dbUser is null)
            {
                await UserRepository.AddAsync(AutoMapper<CreateUserDTO, User>.Map(entity));

            }
            else
            {
                throw new ArgumentException("User with such email or login already exist");
            }

        }

        public async Task RemoveAsync(int id)
        {
            await UserRepository.RemoveAsync(await UserRepository.GetByIdAsync(id));
        }

        public async Task UpdateAsync(UserDTO entity)
        {
            await UserRepository.UpdateAsync(AutoMapper<UserDTO, User>.Map(entity));
        }

        //Jwt Section

        public async Task<User> IsValidUserAsync(string email, string password)
        {
            var user = await UserRepository.FindFirstAsync(x => x.Email == email && x.Password == password);
            return user;
        }

        private TokenDTO GenerateToken(string id, string email, string role, string name)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var tokenKey = Encoding.UTF8.GetBytes(_configuration["JWT:Key"]);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Email, email),
                        new Claim(ClaimTypes.NameIdentifier, id),
                        new Claim(ClaimTypes.Role, role),
                        new Claim(ClaimTypes.Name, name)
                    }),
                    Expires = DateTime.Now.AddMinutes(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var refreshToken = GenerateRefreshToken();
                return new TokenDTO { AccessToken = tokenHandler.WriteToken(token), RefreshToken = refreshToken };
            }
            catch (Exception)
            {
                return null;
            }
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        public async Task<TokenDTO> LoginAsync(AuthDTO authDto)
        {
            var validUser = await IsValidUserAsync(authDto.Email, authDto.Password);

            if (validUser is null)
            {
                throw new ArgumentException();
            }

            var token = GenerateToken(validUser.Id.ToString(), authDto.Email, Enum.GetName(validUser.Role), validUser.UserName);

            if (token is null)
            {
                throw new InvalidOperationException();
            }

            UserRefreshToken obj = new UserRefreshToken
            {
                RefreshToken = token.RefreshToken,
                UserName = validUser.UserName
            };
            await _jwtRepository.AddAsync(obj);

            return token;
        }

        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var Key = Encoding.UTF8.GetBytes(_configuration["JWT:Key"]);

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Key),
                ClockSkew = TimeSpan.Zero
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
            JwtSecurityToken jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token");
            }


            return principal;
        }

        public async Task<TokenDTO> RefreshTokenAsync(TokenDTO tokensDto)
        {
            var principal = GetPrincipalFromExpiredToken(tokensDto.AccessToken);
            var id = principal.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier)
                .Select(c => c.Value).SingleOrDefault();
            var username = principal.Claims.Where(c => c.Type == ClaimTypes.Name)
                .Select(c => c.Value).SingleOrDefault();
            var email = principal.Claims.Where(c => c.Type == ClaimTypes.Email)
                .Select(c => c.Value).SingleOrDefault();
            var role = principal.Claims.Where(c => c.Type == ClaimTypes.Role)
                .Select(c => c.Value).SingleOrDefault();



            var savedRefreshToken = await _jwtRepository
                .FindFirstAsync(x => x.UserName == username &&
                x.RefreshToken == tokensDto.RefreshToken &&
                x.IsActive);

            if (savedRefreshToken.RefreshToken != tokensDto.RefreshToken)
            {
                throw new OperationCanceledException();
            }

            var newJwtToken = GenerateToken(id, email, role, username);

            if (newJwtToken == null)
            {
                throw new OperationCanceledException();
            }

            UserRefreshToken obj = new UserRefreshToken
            {
                RefreshToken = newJwtToken.RefreshToken,
                UserName = savedRefreshToken.UserName
            };

            await _jwtRepository.RemoveAsync(savedRefreshToken);
            await _jwtRepository.AddAsync(obj);

            return newJwtToken;
        }
    }
}
