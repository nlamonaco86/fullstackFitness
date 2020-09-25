// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically 
  // hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created
  //  successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
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
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });
  // add an exercise to the database (admin only eventually)
  app.post("/api/exercises", function(req, res) {
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
      .then(function() {
        console.log(res)
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });
  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};

// // Require models and passport
// var db = require("../models");
// var passport = require("../config/passport");
// const order = require("../config/order.js");

// module.exports = function(app) {
//   // LOGIN route with error handling
//   app.post("/api/login", passport.authenticate("local"), function(req, res) {
//     res.json(req.user);
//   });

//   // SIGNUP route with error handling
//   app.post("/api/signup", function(req, res) {
//     db.User.create({
//       email: req.body.email,
//       password: req.body.password
//     })
//       .then(function() {
//         res.redirect(307, "/api/login");
//       })
//       .catch(function(err) {
//         res.status(401).json(err);
//       });
//   });

//   // LOGOUT route
//   app.get("/logout", function(req, res) {
//     req.logout();
//     res.redirect("/");
//   });

//   // user data client-side route
//   app.get("/api/user_data", function(req, res) {
//     if (!req.user) {
//       // The user is not logged in, send back an empty object
//       res.json({});
//     } else {
//       // Otherwise send back the user's email and id
//       res.json({
//         email: req.user.email,
//         id: req.user.id
//       });
//     }
//   });
// }
// //CREATE
// app.post("/api/orders", function (req, res) {
//   // get values from our incoming request object and map them in an array
//   let vals = Object.entries(req.body).map(e => e[1]);
//   //use that array to call a create function in the model
//   order.create(vals, function (results) {
//     res.json({ id: results.insertId });
//   });
// });
// // FIND ONE
// app.get("/api/orders/:orderNum", (req, res) =>{
//   //read all entries from the orders table
//   order.findOne(req.params.orderNum, (data) => {
//     // //test 
//     console.log("this is the", data)
//     //store them in an object for handlebars to use
//     res.json(data);
//   });
// });
// //UPDATE
// // app.put("/api/orders/issue/:id", (req, res) => {
// //   order.updateIssue(req.params.id, (result) => {
// //     if (result.changedRows == 0) {
// //       return res.status(404).end();
// //     } else {
// //       res.status(200).end();
// //     }
// //   });
// // });
// app.put("/api/orders/complete/:id", (req, res) => {
//   order.updateComplete(req.params.id, (result) => {
//     if (result.changedRows == 0) {
//       // If no rows were changed, then the ID does not exist 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });
// app.put("/api/orders/inProgress/:id", (req, res) => {
//   order.updateInProgress(req.params.id, (result) => {
//     if (result.changedRows == 0) {
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });
// app.put("/api/orders/waiting/:id", (req, res) => {
//   order.updateWaiting(req.params.id, (result) => {
//     if (result.changedRows == 0) {
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });
// //DELETE
// app.delete("/api/orders/:id", (req, res) => {
//   order.delete(req.params.id, (result) => {
//     if (result.affectedRows == 0) {
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });
  
// };
