$(document).ready(function () {
  var newDrawTemplate = Handlebars.compile($("#ball-form").html());
  var renderOptions = Handlebars.registerHelper("renderOptions", function () {
    var out = ""; 
    for(var i = 0; i < 100; i++) out+= "<option value=\"" + i + "\">" + i + "</option>";
    return out;
  });
  var drawForm = "";
  for (var j = 1; j < 7 ; j++ ) drawForm += newDrawTemplate( {index:j} );
  // document.getElementById("add-new-draw").html( newDrawTemplate( {index:1} ) );
  $("#add-new-draw").html( drawForm );

  var colorChangeButtons = document.querySelectorAll(".btn.color-changer") 
  for (var i = 0; i < colorChangeButtons.length; i++) {
    colorChangeButtons[i].onclick = function (event) {
      var cl = this.classList;
      if(cl.contains("btn-warning")){
        cl.remove("btn-warning");
        cl.add("btn-black");
        this.parentNode.children[1].value = "black"
      } else {
        cl.remove("btn-black");
        cl.add("btn-warning");
        this.parentNode.children[1].value = "yellow"
      }
    }
  };
});

