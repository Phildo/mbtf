var Player = function(controller, position)
{
  this.health = 100;
  this.x = position;
  this.opponent = null;
  controller.beginControlling(this);

  this.input = function(key)
  {
    if(key == inputs[inputSeed].charAt(inputProgress))
      inputProgress++;
    else
    {
      inputSeed = key;
      inputProgress = 0;
    }
    //commit action

    if(inputs[inputSeed].length == inputProgress)
    {
      inputSeed = "";
      inputProgress = 0;
    }
  };

  var inputSeed = "";
  var inputProgress = 0;
  var inputs = 
  {
    "":"",
    "a":"",
    "b":"block",
    "c":"crouch",
    "d":"down",
    "e":"",
    "f":"fight",
    "g":"",
    "h":"hadouken!!!!!!!!!!",
    "i":"",
    "j":"jump",
    "k":"kick",
    "l":"left",
    "m":"",
    "n":"",
    "o":"",
    "p":"punch",
    "q":"",
    "r":"right",
    "s":"",
    "t":"",
    "u":"",
    "v":"",
    "w":"",
    "x":"",
    "y":"",
    "z":""
  };
};
