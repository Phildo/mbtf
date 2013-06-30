var GamePlayScene = function(game, canv)
{
  var fight;
  this.ready = function()
  {
    fight = new Fight();
  };

  this.tick = function()
  {
    //not actually used
    draw();
  };

  this.cleanup = function()
  {
  };

  var draw = function()
  {
  };
};
