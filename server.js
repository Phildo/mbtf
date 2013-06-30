var io = require('socket.io').listen(41967);
io.set('log level',1);

var idCounter = 0;
var userStubs = [];

var emitState = function(s)
{
  s.emit('queue',q.getQueue);
};

var connection = function(s)
{ 
  //io.sockets.emit('event',data);

  var idRequestedForName = function(name)
  {
    userStubs[idCounter] = {"id":idCounter,"name":name};
    s.id = idCounter;
    s.name = name;
    s.emit('nameAccepted', userStubs[idCounter]);
    s.broadcast.emit('newUser', userStubs[idCounter]);
    idCounter = (idCounter+1)%100; //REALLY bad way to ensure unique IDs... shut up.
  };
  s.on('requestIdForName',idRequestedForName);

  var requestQueue = function(data)
  {
    s.emit('queueSync',userStubs);
  };
  s.on('requestQueue',requestQueue);

  var disconnect = function(data) 
  { 
    userStubs.splice(s.id,1);
    s.broadcast.emit('queueSync',userStubs);
  };
  s.on('disconnect',disconnect);
};
io.sockets.on('connection',   connection);
