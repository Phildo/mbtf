var NetController = function(fight, s, player)
{
  var c = new Controller(fight, player);

  function handleEvent(data)
  {
    if(data.player == player.id)
      fight.handleEvent(data);
  };
  s.on('event',handleEvent);

  c.end = function()
  {
    s.on('event',function(){});
  };
  
  return c;
};
