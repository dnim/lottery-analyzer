var dateFormat = "dd-mm-yyyy";
var parsedDateFormat = undefined;

$(document).ready(function () {


  parsedDateFormat = $.fn.datepicker.DPGlobal.parseFormat(dateFormat);
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
        this.parentNode.children[2].value = "black"
      } else {
        cl.remove("btn-black");
        cl.add("btn-warning");
        this.parentNode.children[2].value = "yellow"
      }
    }
  };

  // prerate datepicker (see http://eternicode.github.io/bootstrap-datepicker/)
  // TODO: put settings in some more appropriate place (.properties files, for instance)

  convertDrawsDateToReadableFormat();

  document.getElementById("new-draw-date-visible").value = convertLongToFormattedDate(new Date().getTime());

  var datePicker = $(".datepicker")
    .datepicker({ 
      autoclose: true, 
      todayHighlight: true,
      format: dateFormat,
      todayBtn: true,
      language: "ru" // ? doesn't work
    });



  var formWithDraw = document.getElementById("send-new-draw-form");
  if(formWithDraw.addEventListener){
    formWithDraw.addEventListener("submit", handleNewDrawFormBeforeSubmit, false);  //Cool modern browser!
  }
  else if (formWithDraw.attachEvent){
    formWithDraw.attachEvent('onsubmit', handleNewDrawFormBeforeSubmit);          //The evil IE needs extra
  }

});



// TODO: put functions in some scope/ object
var convertDrawsDateToReadableFormat = function(){
  var drawsDates = document.querySelectorAll(".draws .draw-date")
  for (var i = 0; i < drawsDates.length; i++) {
    drawsDates[i].textContent = convertLongToFormattedDate(parseFloat(drawsDates[i].textContent)); 
  };
}

var handleNewDrawFormBeforeSubmit = function () {
  document.getElementsByName("new-draw-date")[0].value = 
                        convertFormattedDateToLong(document.getElementById("new-draw-date-visible").value);

};

var convertFormattedDateToLong = function(formattedDate){
  return $.fn.datepicker.DPGlobal.parseDate(formattedDate, parsedDateFormat, "en").getTime();
}; 

var convertLongToFormattedDate = function(dateAsLong){
  return $.fn.datepicker.DPGlobal.formatDate(new Date(dateAsLong), parsedDateFormat, "en");    
}; 
