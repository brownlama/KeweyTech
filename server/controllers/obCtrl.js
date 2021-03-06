const axios = require("axios");

const addHit = (req, res) => {
  var { latitude, longitude, accuracy, user_id, fence_id, date } = req.body;
  req.app
    .get("db")
    .add_hit([latitude, longitude, accuracy, user_id, fence_id, date])
    .then(response => {
      getHistory(req, res);
    });
};
/*
MAY HAVE TO RETURN A VALUE FROM <get_history.sql>
*/
const getHistory = (req, res) => {
  req.app
    .get("db")
    .get_history()
    .then(response => {
      res.status(200).send(response);
    });
};
const deleteHistory = (req, res) => {
  var { id } = req.params;
  req.app
    .get("db")
    .delete_history(id)
    .then(response => {
      getHistory(req, res);
    })
    .catch(console.log);
};
const editResolution = (req, res) => {
  var { resolution } = req.body;
  var { id } = req.params;
  req.app
    .get("db")
    .edit_resolution([resolution, id])
    .then(response => {
      getHistory(req, res);
    })
    .catch(console.log);
};
const putHit = (req, res) => {
  var { id } = req.params;
  var { latitude, longitude, date } = req.body;
  req.app
    .get("db")
    .put_hit([latitude, longitude, id, date])
    .then(response => {
      getHistory(req, res);
    });
};
const fetchAvatar = (req, res) => {
  req.app
    .get("db")
    .fetch_avatar(req.params.id)
    .then(response => {
      res.status(200).send(response);
    });
};
const deleteHistoryHits = (req, res) => {
  req.app
    .get("db")
    .delete_history_hits(req.params.key)
    .then(response => {
      getHistory(req, res);
    });
};

module.exports = {
  addHit,
  deleteHistory,
  getHistory,
  editResolution,
  putHit,
  fetchAvatar,
  deleteHistoryHits
};
