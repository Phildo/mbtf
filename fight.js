var Fight = function()
{
  this.events = [];
  this.p1 = new Player(fight);
  this.p2 = new Player();

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

var FightEvent = function(timestamp, player, key)
{
  this.timestamp = timestamp;
  this.player = player;
  this.key = key;
};
