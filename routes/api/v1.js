
/*
 * REST API Implementation
 */

exports.hello_world = function(req, res){
  res.send([{name:'wine1'}, {name:'wine2'}]);
};
