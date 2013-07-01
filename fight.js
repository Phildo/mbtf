var Fight = function(delegate, s, user1, user2, me)
{
  var self = this;
  this.fstates = [];
  this.fevents = [];
  this.p1 = new Player(user1, "1", 1, this);
  this.p2 = new Player(user2, "2", 5, this);
  this.p1.opponent = this.p2;
  this.p2.opponent = this.p1;
  
  var p1Controller;
  var p2Controller;

  if(me.id == user1.id)  p1Controller = new KeyController(this, s, this.p1);
  else if(user1.id >= 0) p1Controller = new NetController(this, s, this.p1);
  else                   p1Controller = new Controller(this, this.p1);
  if(me.id == user2.id)  p2Controller = new KeyController(this, s, this.p2);
  else if(user2.id >= 0) p2Controller = new NetController(this, s, this.p2);
  else                   p2Controller = new Controller(this, this.p2);
  
  this.drawIfShould = function(canv)
  {
    draw(canv);
    return true;
  };
  
  var draw = function(canv) //I hate that this is tainting the model, but whatevs
  {
    //Clear
    canv.context.fillStyle = "#FFFFFF";
    canv.context.fillRect(0,0,canv.canvas.width,canv.canvas.height);
    
    //Health bars
    canv.context.fillStyle = self.p1.color;
    canv.context.fillRect(40,40,(canv.canvas.width/2-40)*self.p1.health/100,30);
    canv.context.fillStyle = self.p2.color;
    canv.context.fillRect(canv.canvas.width/2+((canv.canvas.width/2-40)-((canv.canvas.width/2-40)*self.p2.health/100)),40,(canv.canvas.width/2-40)*self.p2.health/100,30);
    canv.context.strokeStyle = "#000000";
    canv.context.strokeRect(40,40,canv.canvas.width/2-40,30);
    canv.context.strokeRect(canv.canvas.width/2,40,canv.canvas.width/2-40,30);

    //Names
    canv.context.fillStyle = "#000000";
    canv.context.textAlign = "left";
    canv.context.fillText(user1.name, 40, 100);
    canv.context.textAlign = "right";
    canv.context.fillText(user2.name, canv.canvas.width-40, 100);
    canv.context.textAlign = "center";
    
    //Circle
    canv.context.fillStyle = "#FFFFFF";
    canv.context.strokeStyle = "#000000";
    canv.context.beginPath();
    canv.context.arc(canv.canvas.width/2, 55, 40, 0, Math.PI*2);
    canv.context.closePath();
    canv.context.fill();
    canv.context.stroke();
    
    //Floor
    canv.context.beginPath();
    canv.context.moveTo(0,canv.canvas.height-30);
    canv.context.lineTo(canv.canvas.width,canv.canvas.height-30);
    canv.context.stroke();
    
    //Draw players
    self.p1.draw(canv);
    self.p2.draw(canv);
  };

  var futureEvents;
  this.handleEvent = function(fevent)
  {
    futureEvents = rewindTo(fevent.timestamp);
    applyEvent(fevent);
    fastForward(futureEvents);
  };

  var undoneEvents;
  var rewindTo = function(timestamp)
  {
    undoneEvents = [];
    while(self.fevents[self.fevents.length-1].timestamp > timestamp)
    {
      undoneEvents.push(self.fevents.pop());
      revertToState(self.fstates.pop());
    }
    return undoneEvents;
  };

  var fastForward = function(fevents)
  {
    for(var i = 0; i < fevents.length; i++)
      applyEvent(fevents[i]);
  };

  var applyEvent = function(fevent)
  {
    self.fstates.push(new FightState(self.p1, self.p2));
    self.fevents.push(fevent);
    if(fevent.player == self.p1.id) self.p1.input(fevent.input);
    if(fevent.player == self.p2.id) self.p2.input(fevent.input);
  };

  var revertToState = function(fstate)
  {
    self.p1.x        = fstate.p1x;
    self.p1.seed     = fstate.p1s;
    self.p1.progress = fstate.p1p;
    self.p2.x        = fstate.p2x;
    self.p2.seed     = fstate.p2s;
    self.p2.progress = fstate.p2p;
  };
  
  applyEvent(new FightEvent(this.p1.id, new Date().getTime(), ""));
  applyEvent(new FightEvent(this.p2.id, new Date().getTime(), ""));

  this.end = function()
  {
    p2Controller.end();
    p1Controller.end();
  };
};

var FightEvent = function(player, timestamp, input)
{
  this.player = player;
  this.timestamp = timestamp;
  this.input = input;
};

var FightState = function(p1, p2)
{
  this.p1x = p1.x;
  this.p1s = p1.seed;
  this.p1p = p1.progress;
  this.p2x = p2.x;
  this.p2s = p2.seed;
  this.p2p = p2.progress;
};
