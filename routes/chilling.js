const router = require("express").Router();
let Chilling = require("../models/chilling.model");

router.route("/").get((req, res) => {
  Chilling.find()
    .then((chillings) => res.json(chillings))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const title = req.body.title;
  const netflixid = Number(req.body.netflixid);
  const username = req.body.username;
  const pass = req.body.pass;
  const date = Date.parse(req.body.date);
  const people = Number(req.body.people);
  const duration = Number(req.body.duration);
  const language = req.body.language;
  const country = req.body.country;
  const note = req.body.note;

  const newChilling = new Chilling({
    title,
    netflixid,
    username,
    pass,
    date,
    people,
    duration,
    language,
    country,
    note,
  });

  newChilling
    .save()
    .then(() => res.json("Chilling added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Chilling.findById(req.params.id)
    .then((chilling) => res.json(chilling))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/movie/:netflixid").get((req, res) => {
  Chilling.find({ netflixid: req.params.netflixid })
    .then((chilling) => res.json(chilling))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Chilling.findByIdAndDelete(req.params.id)
    .then(() => res.json("Chilling deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Chilling.findById(req.params.id)
    .then((chilling) => {
      chilling.title = req.body.title;
      chilling.netflixid = Number(req.body.netflixid);
      chilling.username = req.body.username;
      chilling.pass = req.body.pass;
      chilling.date = Date.parse(req.body.date);
      chilling.people = Number(req.body.people);
      chilling.duration = Number(req.body.duration);
      chilling.language = req.body.language;
      chilling.country = req.body.country;
      chilling.note = req.body.note;

      chilling
        .save()
        .then(() => res.json("Chilling updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
