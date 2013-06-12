
/*
 * REST API Implementation
 */

exports.contacts = function(req, res){
  res.send([{name:'Sidharth Shah', mobile: '9911990099'}, {name:'Manan Shah', mobile: '1122001122'}]);
};
