var KeyController = function(fight, s, player)
{
  var c = new Controller(fight, player);
  
  var key;
  var code;
  var evt;
  function keyPress(e)
  {
    if((code = e.charCode) == 13) code = 32;
    key = String.fromCharCode(code).toLowerCase();
    if(key != "")
    {
      evt = new FightEvent(player.id, new Date().getTime(), key);
      fight.handleEvent(evt);
      s.emit('emitEvent',evt);
    }
  };

  document.addEventListener('keypress', keyPress, false);

  c.end = function()
  {
    document.removeEventListener('keypress', keyPress);
  };
  
  return c;
};
