// TODO: add logic to handle draws / statistics and so on

exports.newdraw = function (db){
  // TODO: add to the db new entry, render it on the UI
  return function (req, res) {
    res.render("draws", {
      requestedData: req.body["ball-1"]
    });
  }
};

exports.showdraws = function (db) {
  return function (req, res) {
    var users = db.get("user");
    users.findOne({}, function(e, user){
      res.render("draws", { 
        user: user
      });
    });
    // for(var i=1; i<7;i++) balls.add(1)
  };
};