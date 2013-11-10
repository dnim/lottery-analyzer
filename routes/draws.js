// TODO: add logic to handle draws / statistics and so on

exports.newdraw = function (db){
  return function (req, res) {
    res.render("BOOM!");
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