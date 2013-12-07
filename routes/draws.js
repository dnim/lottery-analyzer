// TODO: add logic to handle draws / statistics and so on

exports.newdraw = function (db){
  return function (req, res) {
    console.log(req.body)
    var user = db.get("user").findOne({name:'andrew'}, function(e, user){
      console.log(">> " + user);
      user.draws.push(populateDraw(req.body));
      // user.password = "123";
      db.get("user").update({name:'andrew'}, user);
      res.render("draws", {
        requestedData: req.body["ball-1"],
        user:user
      });
    });
  }

  function populateDraw(rawDrawFromUi){
    var balls = [];
    for (var i = 1; i < 7; i++) {
      var ball = { 
                    number:parseInt(rawDrawFromUi["ball-" + i]),
                    color:rawDrawFromUi["ball-" + i + "-color"]
                  } 
      balls.push(ball)
    };
    return {date:rawDrawFromUi["new-draw-date"], balls:balls};
  }
};

exports.deletedraw = function (db) {
  return function (req, res){
    // TODO: 
  }
}

exports.showdraws = function (db) {
  return function (req, res) {
    var users = db.get("user");
    users.findOne({name:'andrew'}, function(e, user){
      res.render("draws", { 
        user: user
      });
    });
  };
};