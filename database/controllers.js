const Entry = require('./model');

const saveEntry = (req, res) => {
  const { _id, entry_id } = req.body;
  Entry.findOneAndUpdate({ entry_id }, req.body, {upsert: true, setDefaultsOnInsert: true}, function(err, doc) {
    if (err) {
      res.sendStatus(400);
    } else {
      res.send(doc);
    }
  });
};

const getEntries = (req, res) => {
  Entry.find({}, function (err, docs) {
    if (err) {
      res.sendStatus(400);
    } else {
      res.send(docs);
    }
  });
};

const deleteEntry = (req, res) => {
  const { entry_id } = req.params;
  Entry.findOneAndRemove({ entry_id }, function (err) {
    if (err) {
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
}

module.exports = {
  saveEntry,
  getEntries,
  deleteEntry
}
