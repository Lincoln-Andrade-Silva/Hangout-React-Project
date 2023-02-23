using AutoMapper;

namespace Application.Core.Mapper.Posts
{
    public class Post : Profile
    {
        public Post()
        {
            CreateMap<Post, Post>();
        }
    }
}