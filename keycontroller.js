var KeyController = function(fight, player)
{
  var c = new Controller();
  
  var key;
  var code;
  function keyPress(e)
  {
    if((code = e.charCode) == 13) code = 32;
    key = String.fromCharCode(code).toLowerCase();
    if(key != "") fight.handleEvent(new FightEvent(player.id, new Date().getTime(), key));
  };

  document.addEventListener('keypress', keyPress, false);

  c.end = function()
  {
    document.removeEventListener('keypress', keyPress);
  };
  
  return c;
};
