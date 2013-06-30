var GamePlayScene = function(game, canv)
{
  var fight;
  var userq;
  this.ready = function()
  {
    userq = new UserQ();
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
