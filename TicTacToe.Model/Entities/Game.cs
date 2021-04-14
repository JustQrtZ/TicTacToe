namespace TicTacToe.Model.Entities
{
    public class Game : IEntityBase
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public string Tags { get; set; }
    }
}