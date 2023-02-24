namespace Domain
{
    public class PostAttendee
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid PostId { get; set; }
        public Post Post { get; set; }
        public bool IsHost { get; set; }
    }
}