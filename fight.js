var Fight = function(user1, user2)
{
  var self = this;
  this.fstates = [];
  this.fevents = [];
  var p1 = new Player("1", 2, this);
  var p2 = new Player("2", 8, this);
  p1.opponent = p2;
  p2.opponent = p1;
  
  p1Controller = new KeyController(this, p1);
  p2Controller = new Controller(this, p2);
  
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
    canv.context.fillStyle = p1.color;
    canv.context.fillRect(40,40,(canv.canvas.width/2-40)*p1.health/100,30);
    canv.context.fillStyle = p2.color;
    canv.context.fillRect(canv.canvas.width/2+((canv.canvas.width/2-40)-((canv.canvas.width/2-40)*p2.health/100)),40,(canv.canvas.width/2-40)*p2.health/100,30);
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
    p1.draw(canv);
    p2.draw(canv);
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
    self.fstates.push(new FightState(p1, p2));
    self.fevents.push(fevent);
    if(fevent.player == p1.id) p1.input(fevent.input);
    if(fevent.player == p2.id) p2.input(fevent.input);
  };

  var revertToState = function(fstate)
  {
    p1.x        = fstate.p1x;
    p1.seed     = fstate.p1s;
    p1.progress = fstate.p1p;
    p2.x        = fstate.p2x;
    p2.seed     = fstate.p2s;
    p2.progress = fstate.p2p;
  };
  
  applyEvent(new FightEvent(p1.id, new Date().getTime(), ""));
  applyEvent(new FightEvent(p2.id, new Date().getTime(), ""));
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
