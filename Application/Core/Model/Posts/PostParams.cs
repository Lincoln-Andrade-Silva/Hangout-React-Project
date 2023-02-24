using Application.Core.Page;

namespace Application.Core.Model.Posts
{
    public class PostParams : PagingParams
    {
        public bool IsGoing { get; set; }
        public bool IsHost { get; set; }
        public DateTime StartDate { get; set; } = DateTime.UtcNow;

        public String Search { get; set; }
    }
}