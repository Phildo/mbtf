var GamePlayScene = function(game, canv)
{
  var fight;
  this.ready = function()
  {
    fight = new Fight();
  };

  this.tick = function()
  {
    return fight.drawIfShould(canv);
  };

  this.cleanup = function()
  {
  };
};
