var io = require('socket.io').listen(41967);
io.set('log level',1);

var idCounter = 0;
var userStubs = [];

var connection = function(s)
{ 
  var idRequestedForName = function(name)
  {
    var userStub = {"id":idCounter,"name":name};
    userStubs.push(userStub);
    s.mbtfObject = userStub;//named mbtfObject because it's unlikely to clash with any socket junk
    s.emit('nameAccepted', userStub);
    s.broadcast.emit('newUser', userStub);
    idCounter = (idCounter+1)%100; //REALLY bad way to ensure unique IDs... shut up.
  };
  s.on('requestIdForName',idRequestedForName);

  var requestQueue = function(data)
  {
    s.emit('queueSync',userStubs);
  };
  s.on('requestQueue',requestQueue);

  var emitEvent = function(data)
  {
    s.broadcast.emit('event',data);
  };
  s.on('emitEvent',emitEvent);

  var disconnect = function(data) 
  { 
    for(var i = 0; s.mbtfObject && i < userStubs.length; i++)
    {
      if(userStubs[i].id == s.mbtfObject.id)
      {
        userStubs.splice(i,1);
        break;
      }
    }
    s.broadcast.emit('queueSync',userStubs);
  };
  s.on('disconnect',disconnect);
};
io.sockets.on('connection',   connection);
