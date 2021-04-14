namespace TicTacToe.API.ViewModel
{
    public class GameViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public string Tags { get; set; }

        public GameViewModel(string id, string name, string status, string tags)
        {
            this.Id = id;
            this.Name = name;
            this.Status = status;
            this.Tags = tags;
        }
    }
}