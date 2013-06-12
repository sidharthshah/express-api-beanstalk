
/*
 * REST API Implementation
 */

exports.contactsAll = function (req, res) {
  res.send([{name: 'Sidharth Shah', mobile: '9911990099'}, {name: 'Manan Shah', mobile: '1122001122'}]);
};

exports.contactsFindByID = function (req, res) {
  console.log(req.params.id);
  res.send([{name: 'Sidharth Shah', mobile: '9911990099'}]);
};

exports.contactsAddNew = function (req, res) {
  console.log("Add New Called");
  res.send([{status: 1, msg: 'Success'}]);
};

exports.contactsUpdate = function (req, res) {
  console.log("Update Called");
  res.send([{status: 1, msg: 'Success'}]);
};

exports.contactsDelete = function (req, res) {
  console.log("Delete Called");
  res.send([{status: 1, msg: 'Success'}]);
};
