var UserQ = function()
{
  var view = document.createElement('div');
  var cells = [];

  var clear = function()
  {
    for(var i = 0; i < cells.length; i++)
      view.removeChild(cells[i]);
  };

  var setQueue = function(queue)
  {
    for(var i = 0; i < queue.length; i++)
    {
      enqueue(queue[i]);
    }
  };

  var enqueue = function(cellObj)
  {

  };

  var remove = function(id)
  {

  };

  var createCell = function(cellObj)
  {
    var v = document.createElement('div');
    v.innerHTML = cellObj.display;
  };
};
