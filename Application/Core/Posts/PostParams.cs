using Application.Core;

namespace Application.Core.Page
{
    public class PostParams : PagingParams
    {
        public bool IsGoing { get; set; }
        public bool IsHost { get; set; }
        public DateTime StartDate { get; set; } = DateTime.UtcNow;

        public String Search { get; set; }
    }
}