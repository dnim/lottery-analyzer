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
