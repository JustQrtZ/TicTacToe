using TicTacToe.Data.Abstract;
using TicTacToe.Model.Entities;

namespace TicTacToe.Data.Repositories
{
    public class GameRepository : EntityBaseRepository<Game>, IGameRepository
    {
        public GameRepository(TicTacToeContext context) : base(context)
        {
            
        }
    }
}