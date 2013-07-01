var UserQ = function(delegate, s)
{
  var self = this;
  var me = new User(-2,"ME");
  this.users = [];
  var cells = [];

  var register = function(name)
  {
    s.emit('requestIdForName',name);
  };
  var registrationSuccessful = function(data)
  {
    me = new User(data.id, data.name);
    delegate.selfWasRegistered(me);
    view.removeChild(regSelector);
    s.emit('requestQueue');
  };

  var clear = function()
  {
    for(var i = 0; i < cells.length; i++)
      view.removeChild(cells[i]);
    cells = [];
  };

  var setQueue = function(queue)
  {
    clear();
    this.users = [];
    for(var i = 0; i < queue.length; i++)
    {
      if(queue[i])
      {
        this.users.push(new User(queue[i].id, queue[i].name));
        enqueue(this.users[this.users.length-1]);
      }
    }
    delegate.newQueue(this.users);
  };

  var enqueue = function(user)
  {
    cells.push(createCell(user));
    view.appendChild(cells[cells.length-1]);
  };

  var createCell = function(data)
  {
    var c = document.createElement('div');
    c.data = data;
    if(c.data.id == me.id)
      c.innerHTML = data.display+" <-YOU";
    else
      c.innerHTML = data.display;
    return c;
  };
  
  var view = document.createElement('div');

  var regSelector = document.createElement('div');
  regSelector.innerHTML = "Choose Name:<br />";
  var nameInput   = document.createElement('input');
  nameInput.type = "text";
  var nameConfirm = document.createElement('button');
  nameConfirm.onclick = function(){ if(nameInput.value) register(nameInput.value); };
  regSelector.appendChild(nameInput);
  regSelector.appendChild(nameConfirm);
  view.appendChild(regSelector);
  var cells = [];
  s.on('nameAccepted', registrationSuccessful);
  s.on('newUser',      function(d) { s.emit('requestQueue'); });
  s.on('queueSync',    setQueue);
  
  document.getElementById('queue_container').appendChild(view);
};
