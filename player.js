var Player = function(id, position, fight)
{
  this.id = id;
  this.x = position;
  this.fight = fight;
  
  this.opponent = null;
  this.health = 100;
  this.seed = "";
  this.progress = 0;
  
  var displayBox = new DisplayBox();

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
    actions[this.seed][this.progress];//(this);
    displayBox.display(this.seed+inputs[this.seed].substring(0,this.progress),inputs[this.seed].substring(this.progress,this.progress+1));
    //console.log("key:"+key+" seed:"+this.seed+" progress:"+this.progress+" next:"+inputs[this.seed].charAt(this.progress));
  };

  var inputs = 
  {
    "":"",
    " ":"",
    "!":"",
    "a":"",
    "b":"lock ",
    "c":"rouch ",
    "d":"own ",
    "e":"",
    "f":"ight ",
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
    "":[function(p){}],
    " ":[function(p){}],
    "!":[function(p){}],
    "a":[function(p){}],
    "b":[function(p){},function(p){},function(p){},function(p){},function(p){}],
    "c":[function(p){},function(p){},function(p){},function(p){},function(p){},function(p){}],//"crouch"
    "d":[function(p){},function(p){},function(p){},function(p){}],//"down"
    "e":[function(p){}],
    "f":[function(p){},function(p){},function(p){},function(p){},function(p){}],//"fight"
    "g":[function(p){}],
    "h":[function(p){},function(p){},function(p){},function(p){},function(p){},function(p){},function(p){},function(p){},function(p){},function(p){},function(p){},function(p){},function(p){},function(p){},function(p){},function(p){},function(p){},function(p){},function(p){}],//"hadouken!!!!!!!!!!"
    "i":[function(p){}],
    "j":[function(p){},function(p){},function(p){},function(p){}],//"jump"
    "k":[function(p){},function(p){},function(p){},function(p){}],//"kick"
    "l":[function(p){},function(p){},function(p){},function(p){}],//"left"
    "m":[function(p){}],
    "n":[function(p){}],
    "o":[function(p){}],
    "p":[function(p){},function(p){},function(p){},function(p){},function(p){}],//"punch"
    "q":[function(p){}],
    "r":[function(p){},function(p){},function(p){},function(p){},function(p){}],//"right"
    "s":[function(p){}],
    "t":[function(p){}],
    "u":[function(p){}],
    "v":[function(p){}],
    "w":[function(p){}],
    "x":[function(p){}],
    "y":[function(p){}],
    "z":[function(p){}]
  };
};

var DisplayBox = function()
{
  this.displayString = "";
  this.nextString = "?";
  this.display = function(str,next)
  {
    if(str == " ") str = "";
    if(next == "") next = "?";
    this.displayString = str;
    this.nextString = next;
    console.log(str+"("+next+")");
  };
};
