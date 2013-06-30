var Stage = function()
{
  this.drawCanv = new Canv(640,320);
  this.dispCanv = new Canv(640,320);
  this.dispCanv.canvas.style.border = "1px solid black";
  this.drawCanv.context.fillStyle = "#000000";
  this.drawCanv.context.strokeStyle = "#000000";
  this.drawCanv.context.lineWidth = 2;
  this.drawCanv.context.font = "20pt vg_font";
  this.drawCanv.context.textAlign = "center";

  this.draw = function()
  {
    this.dispCanv.context.fillStyle = "#FFFFFF";
    this.dispCanv.context.fillRect(0,0,this.dispCanv.canvas.width,this.dispCanv.canvas.height);
    this.drawCanv.blitTo(this.dispCanv);
  };

  document.getElementById("stage_container").insertBefore(this.dispCanv.canvas, document.getElementById("shadow"));
};
