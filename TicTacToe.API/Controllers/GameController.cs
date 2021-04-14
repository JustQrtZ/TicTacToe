using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using TicTacToe.API.ViewModel;
using TicTacToe.Data.Abstract;

namespace TicTacToe.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        readonly IGameRepository _gameRepository;
        
        public GameController(IGameRepository userRepository)
        {
            this._gameRepository = userRepository;
        }
        
        [HttpGet("getAllGames")]
        public ActionResult<List<GameViewModel>> GetAllUsers()
        {
            var allGames = _gameRepository.GetAll();
            List<GameViewModel> gameList = new List<GameViewModel>();
            
            foreach (var variable in allGames)
            {
                gameList.Add(new GameViewModel(variable.Id, variable.Name, variable.Status, variable.Tags));
            }
            
            return gameList;
        }

        [HttpPost("createGame")]
        public ActionResult CreateGame([FromBody] GameShortViewModel gameMode)
        {
            var id = Guid.NewGuid().ToString();
            
            var game = new Model.Entities.Game
            {
                Id = id,
                Name = gameMode.Name,
                Status = "In Progress",
                Tags = gameMode.Tags
            };
            
            _gameRepository.Add(game);
            _gameRepository.Commit();
            
            return Ok(
                new
                {
                    id
                });
        }
        
        [HttpPost("changeGameStatus")]
        public ActionResult ChangeGameStatus([FromBody] ChangeGameStatusViewModel gameMode)
        {
            var singleGame = _gameRepository.GetSingle(x => x.Id == gameMode.Id);
            singleGame.Status = gameMode.Status == "In Progress"?"Started":"Finished";
            _gameRepository.Update(singleGame);
            _gameRepository.Commit();
            
            return Ok();
        }
        
        [HttpGet("getTags")]
        public ActionResult <List<string>> GetTags()
        {
            var allTags = String.Join(",",(_gameRepository.GetAll().Select(x => x.Tags.Replace(" ",""))));
            var splitedArray = allTags.Split(',').Distinct().ToArray();
            var listTags = Enumerable.OfType<string>(splitedArray).ToList();
            
            return Ok(
                listTags
            );
        }
    }
}