var UserQ = function(s)
{
  var ME = new User(-1,"");
  var cells = [];

  var register = function(name)
  {
    s.emit('requestIdForName',name);
  };
  var registrationSuccessful = function(data)
  {
    ME = new User(data.id, data.name);
    view.removeChild(regSelector);
    s.emit('requestQueue');
  };

  this.clear = function()
  {
    cells = [];
    for(var i = 0; i < cells.length; i++)
      view.removeChild(cells[i]);
  };

  this.setQueue = function(queue)
  {
    this.clear();
    for(var i = 0; i < queue.length; i++)
      this.enqueue(new User(queue[i].id, queue[i].name));
  };

  this.enqueue = function(user)
  {
    cells.push(createCell(user));
    view.appendChild(cells[cells.length-1);
  };

  this.remove = function(id)
  {

  };

  var createCell = function(data)
  {
    var c = document.createElement('div');
    c.data = data;
    c.innerHTML = cellObj.display;
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
  s.on('newUser',      registrationSuccessful);
  s.on('queueSync',    queueSync);
  
  document.getElementById('queue_container').appendChild(view);
};
