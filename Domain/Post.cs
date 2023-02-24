namespace Domain
{
    public class Post
    {
        public Guid Id { get; set; }
        public String Title { get; set; }
        public DateTime Date { get; set; }
        public String Description { get; set; }
        public String City { get; set; }
        public String Venue { get; set; }
        public String Category { get; set; }
        public bool IsCancelled { get; set; }
        public ICollection<PostAttendee> Attendees { get; set; } = new List<PostAttendee>();
    }
}