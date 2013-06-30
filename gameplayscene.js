var GamePlayScene = function(game, canv)
{
  var fight;
  var userq;
  var s;
  this.ready = function()
  {
    s = io.connect('http://phildogames.com:41967'); //lol '41967' == 'FIGHT'... kinda...
    userq = new UserQ(s);
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
