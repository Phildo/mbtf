var Fight = function()
{
  this.states = [];
  this.events = [];
  this.p1 = new Player(new Controller(), 2, this);
  this.p2 = new Player(new KeyController(), 8, this);

  var futureEvents;
  this.eventReceived = function(fevent)
  {
    futureEvents = rewindTo(fevent.timestamp);
    applyEvent(fevent);
    fastForward(futureEvents);
  };

  var undoneEvents;
  var rewindTo = function(timestamp)
  {
    undoneEvents = [];
    while(this.events[events.length-1].timestamp > timestamp)
    {
      undoneEvents.push(this.events.pop());
      undoEvent(undoneEvents[undoneEvents.length-1]);
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

  };

  var undoEvent = function(fevent)
  {

  };
};

var FightEvent = function(timestamp, player, seed, progress)
{
  this.timestamp = timestamp;
  this.player = player;
  this.seed = seed;
  this.progress = progress;
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
