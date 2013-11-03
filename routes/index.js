
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.userlist = function(db){
  return function(req, res){
    var users = db.get("user");
    users.find({},{}, function(e, docs){
      res.render("users", {
        "users":docs
      });
    });
  };    
};