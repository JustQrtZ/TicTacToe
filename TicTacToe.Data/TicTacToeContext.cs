using System.Linq;
using Microsoft.EntityFrameworkCore;
using TicTacToe.Model.Entities;

namespace TicTacToe.Data
{
    public class TicTacToeContext : DbContext
    {
        public DbSet<Game> Users { get; set; }
        
        public TicTacToeContext(DbContextOptions<TicTacToeContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            ConfigureModelBuilderForGame(modelBuilder);
        }

        private void ConfigureModelBuilderForGame(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Game>().ToTable("Game");
            
        }
    }
}
