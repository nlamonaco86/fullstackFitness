// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically 
  // hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created
  //  successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.User.create({
      name: req.body.name,
      age: req.body.age,
      goal: req.body.goal,
      email: req.body.email,
      password: req.body.password,
      dumbbell: req.body.dumbbell,
      barbell: req.body.barbell,
      universal: req.body.universal,
      proficiency: req.body.proficiency
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  });
  // ********************************** EXERCISES ******************************************** //
  // add an exercise to the database (admin only, eventually)
  app.post("/api/exercises", function (req, res) {
    db.Exercise.create({
      exerName: req.body.exerName,
      main: req.body.main,
      alternate: req.body.alternate,
      auxillary: req.body.auxillary,
      equipment: req.body.equipment,
      upper: req.body.upper,
      push: req.body.push,
      compound: req.body.compound
    })
      .then(function () {
        console.log(res)
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });
  // PERSONALIZE user
  app.get("/api/personalize/:id", function (req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(result => {
        res.json(result);
      });
  });
  // FIND exercises
  app.get("/api/exercises/:muscle", function (req, res) {
    db.Exercise.findAll({
      where: {
        main: req.params.muscle
      }
    })
      .then(exercises => {
        res.json(exercises);
      });
  });

  app.get("/api/exercises/:muscle/anySecondary/:equipReq", function (req, res) {
    db.Exercise.findAll({
      where: {
        main: req.params.muscle,
        equipment: req.params.equipReq
      }
    })
      .then(exercises => {
        res.json(exercises);
      });
  });

  app.get("/api/exercises/:muscle/:secondaryMuscle/anyEquip", function (req, res) {
    db.Exercise.findAll({
      where: {
        main: req.params.muscle,
        alternate: req.params.secondaryMuscle
      }
    })
      .then(exercises => {
        res.json(exercises);
      });
  });

  app.get("/api/exercises/:muscle/:secondaryMuscle/:equipReq", function (req, res) {
    db.Exercise.findAll({
      where: {
        main: req.params.muscle,
        alternate: req.params.secondaryMuscle,
        equipment: req.params.equipReq
      }
    })
      .then(exercises => {
        res.json(exercises);
      });
  });

  //FIND Workouts based on TYPE
  // app.get("/api/workouts/:split", function (req, res) {
  //   // run a different DB request based on each split
  //   if (req.params.split === "Full Body") {
  //     // define the groups required for this split
  //     let inputArray = ["Chest", "Quad", "Back", "Ham", "Bicep", "Calves"];
  //     let resultArray = [];
  //     //choose X exercises at random, push to an array
  //     for (var i = 0; i < inputArray.length; i++ ){
  //       // let item = db.Exercise.findOne({ where: { main: inputArray[i]} })
  //       //   resultArray.push(item);
  //       resultArray.push(inputArray[i])
  //       // console.log(resultArray)
  //     }
  //     // send back the array of objects for front end to assemble into a workout
  //     res.json(resultArray);
  //   }

  //   if (req.params.split === "Arnold Split") {
  //     res.json("You chose ARNOLD");
  //   }
  //   if (req.params.split === "Bro Split") {
  //     res.json("You chose BRO");
  //   }
  //   if (req.params.split === "Push Pull Legs") {
  //     res.json("You chose PPL");
  //   }
  //   if (req.params.split === "Upper Lower") {
  //     res.json("You chose UPPER LOWER");
  //   }
  //   if (req.params.split === "Cardio Only") {
  //     res.json("You chose CARDIO");
  //   }

  // });

};