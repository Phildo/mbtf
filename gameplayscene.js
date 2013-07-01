var GamePlayScene = function(game, canv)
{
  var fight;
  var userq;
  var me;
  var s;

  this.ready = function()
  {
    s = io.connect('http://brokenglider.com:41967'); //lol '41967' == 'FIGHT'... kinda...
    userq = new UserQ(this, s);
    me = new User(-2,"ME");
    fight = new Fight(this, s, new User(-1,"waiting..."), new User(-1,"...waiting"), me);
  };

  this.selfWasRegistered = function(user)
  {
    me = user;
  };

  this.newQueue = function(users)
  {
    if(users.length < 2 || users[0].id != fight.p1.id || users[1].id != fight.p2.id)
    {
      fight.end();
      var u1 = users[0];
      var u2 = users[1];
      if(!u1) u1 = new User(-1,"waiting...");
      if(!u2) u2 = new User(-1,"...waiting");
      fight = new Fight(this, s, u1, u2, me);
    };
  };

  this.tick = function()
  {
    return fight.drawIfShould(canv);
  };

  this.cleanup = function()
  {
  };
};
