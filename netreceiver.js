var NetReciever = function()
{
  this.s = io.connect('http://phildogames.com:41967'); //lol '41967' == 'FIGHT'... kinda...
  this.s.on('nameAccepted', function(data){ });
  this.s.on('queueSync',    function(data){ });

  this.s.emit('state',syncStateObj);

  var register = function()
  {
    this.s.emit('registered',document.getElementById('rname').value);
  }
};
