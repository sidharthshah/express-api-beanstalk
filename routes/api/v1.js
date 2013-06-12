
/*
 * REST API Implementation
 */

 var mongo = require('mongodb');

 var Server = mongo.Server,
 Db = mongo.Db,
 BSON = mongo.BSONPure;

 var server = new Server('localhost', 27017, {auto_reconnect: true});
 db = new Db('express-api', server);

 db.open(function(err, db) {
  if(!err) {
    console.log("Connected to 'express-api' database");
    db.collection('contacts', {strict:true}, function(err, collection) {
      if (err) {
        console.log("The 'contacts' collection doesn't exist. Creating it with sample data...");
        populateDB();
      }
    });
  }
});

exports.contactsAll = function (req, res) {
  db.collection('contacts', function (err, collection) {
    collection.find().limit(10).toArray(function (err, items) {
      res.send(items);
    });
  });
};

exports.contactsFindByID = function (req, res) {
  var id = req.params.id;
  db.collection('contacts', function(err, collection) {
    collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
      res.send(item);
    });
  });
};

exports.contactsAddNew = function (req, res) {
  var contact = req.body;
  db.collection('contacts', function(err, collection) {
    collection.insert(contact, {safe:true}, function(err, result) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        console.log('Success: ' + JSON.stringify(result[0]));
        res.send(result[0]);
      }
    });
  });
};

exports.contactsUpdate = function (req, res) {
  var id = req.params.id;
  var contact = req.body;
  console.log(JSON.stringify(contact));
  db.collection('contacts', function(err, collection) {
    collection.update({'_id':new BSON.ObjectID(id)}, contact, {safe:true}, function(err, result) {
      if (err) {
        console.log('Error updating contact: ' + err);
        res.send({'error':'An error has occurred'});
      } else {
        console.log('' + result + ' document(s) updated');
        res.send(contact);
      }
    });
  });
};

exports.contactsDelete = function (req, res) {
  var id = req.params.id;
  db.collection('contacts', function(err, collection) {
    collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
      if (err) {
        res.send({'error':'An error has occurred - ' + err});
      } else {
        console.log('' + result + ' document(s) deleted');
        res.send(req.body);
      }
    });
  });
};
