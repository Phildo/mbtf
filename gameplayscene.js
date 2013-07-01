var GamePlayScene = function(game, canv)
{
  var fight;
  var userq;
  var s;
  this.ready = function()
  {
    s = io.connect('http://brokenglider.com:41967'); //lol '41967' == 'FIGHT'... kinda...
    userq = new UserQ(s);
    fight = new Fight(new User(-1,"waiting..."),new User(-1,"...waiting"));
  };

  this.tick = function()
  {
    return fight.drawIfShould(canv);
  };

  this.cleanup = function()
  {
  };
};
