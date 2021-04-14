using System;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace TicTacToe.API.Game
{
    public class MyMessage{
        public string [] Msg { get; set; }
        public string Group { get; set; }
            
        public string Turn { get; set; }
            
    }
    public class PlayerWinner{
        public string Msg { get; set; }
            
        public string Group { get; set; }
            
    }
    public class GameHub : Hub
    {
        public async Task JoinGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            Console.WriteLine(Context.ConnectionId);
            await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has joined the group {groupName}.");
        }

        public async Task Game(MyMessage message)
        {
            await Clients.Group(message.Group).SendAsync("Game", message);
        }
        
        public async Task Winner(PlayerWinner player)
        {
            await Clients.Group(player.Group).SendAsync("Win", player.Msg);
        }
    }
}