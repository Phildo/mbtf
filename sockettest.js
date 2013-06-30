var io = require('socket.io').listen(9876);
io.set('log level',1);

var connection = function(s)
{ 
  console.log('connection!');
  
  var logRequested = function(data)
  {
    console.log('logToServer');
    console.log(data);
  };
  s.on('logToServer',logRequested);

  var emitToClient = function(data)
  {
    console.log('emitToMe');
    s.emit('emittedToMe',data);//will only send to client 's'
  };
  s.on('emitToMe', emitToClient);

  var broadcastEmitFromClient = function(data)
  {
    console.log('broadcastEmitFromMe');
    s.broadcast.emit('broadcastEmittedFromMe',data);//will send to all clients but 's'
  };
  s.on('broadcastEmitFromMe', broadcastEmitFromClient);

  var emitFromSockets = function(data)
  {
    console.log('emitFromSockets');
    io.sockets.emit('emittedFromSockets',data);//will send to all clients
  }
  s.on('emitFromSockets',emitFromSockets);

  var disconnect = function(data) 
  { 
    console.log('disconnection!');
  };
  s.on('disconnect',disconnect);
};
io.sockets.on('connection', connection);
