var Player = function(user, id, position, fight)
{
  this.user = user;
  this.id = id;
  this.x = position;
  this.fight = fight;
  
  if(this.id == "1")
  {
    this.color        = "#FF0000";
    this.fadedColor   = "#FF8888";
    this.darkColor    = "#880000";
  }
  else if(this.id == "2")
  {
    this.color        = "#0000FF";
    this.fadedColor   = "#8888FF";
    this.darkColor    = "#000088";
  }
  
  this.opponent = null;
  this.health = 100;
  this.blocking = false;
  this.fighting = false;
  this.seed = "";
  this.progress = 0;
  
  var displayBox = new DisplayBox();
  
  this.damage = function(amount)
  {
    if(this.blocking) Math.floor(amount/=2);
    this.health -= amount;
  };

  this.input = function(key)
  {
    if(!inputs[key] && inputs[key] != "") return;
    if(key == inputs[this.seed].charAt(this.progress))
      this.progress++;
    else
    {
      this.seed = key;
      this.progress = 0;
    }
    if(actions[this.seed][this.progress]) actions[this.seed][this.progress](this);
    displayBox.display(this.seed+inputs[this.seed].substring(0,this.progress),inputs[this.seed].substring(this.progress,this.progress+1));
  };

  var inputs = 
  {
    "":"",
    " ":"",
    "!":"",
    "a":"",
    "b":"lock ",
    "c":"rouch ",
    "d":"ance ",
    "e":"",
    "f":"ight! ",
    "g":"",
    "h":"adouken!!!!!!!!!!",
    "i":"",
    "j":"ump ",
    "k":"ick ",
    "l":"eft ",
    "m":"",
    "n":"",
    "o":"",
    "p":"unch ",
    "q":"",
    "r":"ight ",
    "s":"",
    "t":"",
    "u":"",
    "v":"",
    "w":"",
    "x":"",
    "y":"",
    "z":""
  };
  
  var actions = 
  {
    "":[null],
    " ":[null],
    "!":[null],
    "a":[null],
    "b":[null,null,null,null,null],
    "c":[null,null,null,null,null,null],//"crouch"
    "d":[null,null,null,null],//"dance"
    "e":[null],
    "f":[null,null,null,null,null],//"fight"
    "g":[null],
    "h":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],//"hadouken!!!!!!!!!!"
    "i":[null],
    "j":[null,null,null,null],//"jump"
    "k":[null,null,null,null,function(p){ if(p.x == p.opponent.x-1 || p.x == p.opponent.x+1) p.opponent.damage(10);}],//"kick"
    "l":[null,null,null,null,function(p){ p.x--; }],//"left"
    "m":[null],
    "n":[null],
    "o":[null],
    "p":[null,null,null,null,null,function(p){ if(p.x == p.opponent.x-1 || p.x == p.opponent.x+1) p.opponent.damage(20);}],//"punch"
    "q":[null],
    "r":[null,null,null,null,null,function(p){ p.x++; }],//"right"
    "s":[null],
    "t":[null],
    "u":[null],
    "v":[null],
    "w":[null],
    "x":[null],
    "y":[null],
    "z":[null]
  };

  this.draw = function(canv)
  {
    displayBox.draw(canv, this.x, this.color, this.fadedColor, this.darkColor);
  };
};

var DisplayBox = function()
{
  this.displayString = "";
  this.nextString = "f";
  this.display = function(str,next)
  {
    if(str == " ") str = "";
    if(next == "") next = "?";
    this.displayString = str;
    this.nextString = next;
  };
  
  this.draw = function(canv, pos, promptColor, enteredColor, validColor)
  {
    if(this.nextString == "?" && this.displayString != "")
      this.displayString = "";
      
    if(this.nextString == " ")
    {
      canv.context.fillStyle = validColor;
      for(var i = 0; i < this.displayString.length; i++)
        canv.context.fillText(this.displayString.charAt(i), canv.canvas.width/6*pos-(25*(this.displayString.length-1)/2)+(25*i), 140);
    }
    else
    {
      canv.context.fillStyle = enteredColor;
      for(var i = 0; i < this.displayString.length; i++)
        canv.context.fillText(this.displayString.charAt(i), canv.canvas.width/6*pos-(25*this.displayString.length/2)+(25*i), 140);
      canv.context.fillStyle = promptColor;
      canv.context.fillText(this.nextString,                canv.canvas.width/6*pos-(25*this.displayString.length/2)+(25*this.displayString.length), 140);
    }
  };
};
