var KeyController = function()
{
  var c = new Controller();
  
  c.beginControlling = function(player)
  {
    c.player = player;
  };

  var key;
  var code;
  function keyPress(e)
  {
    if((code = e.charCode) == 13) code = 32;
    key = String.fromCharCode(code).toLowerCase();
    if(key != "") c.player.input(key);
  };

  document.addEventListener('keypress', keyPress, false);
  
  return c;
};
