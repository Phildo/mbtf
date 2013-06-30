var Arena = function()
{
  this.slices = [];
  for(var i = 0; i < 10; i++)
    slices[i] = new ArenaSlice(i);
};

var ArenaSlice = function(x)
{
  this.x = x;
  this.obj = null;
};
