const Entry = require('./model');

const saveEntry = (req, res) => {
  console.log('im inside the saveEntry function!');
  console.log(req.body);
  let entryDoc = new Entry(req.body);
  entryDoc.save(req.body, function(err, result) {
    if (err) {
      res.sendStatus(400);
    } else {
      console.log('result of saveEntry:', result);
      res.send(result);
    }
  })
};

// Model.update({_id: id}, obj, {upsert: true, setDefaultsOnInsert: true}, cb);

const getEntries = (req, res) => {
  Entry.find({}, function (err, docs) {
    if (err) {
      res.sendStatus(400);
    } else {
      console.log('entries:', docs);
      res.send(docs);
    }
  })
};

module.exports = {
  saveEntry,
  getEntries
}