// Require bcrypt for password hashing
const bcrypt = require("bcryptjs");

// User model
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    goal: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dumbbell: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    barbell: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    machine: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    proficiency: {
      type: DataTypes.STRING,
      default: "beginner"
    },
    profilePic: {
      type: DataTypes.STRING,
      default: "./assets/default.jpg"
    }
  });
  // Creating a custom method for User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in the database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks run during various phases of the User Model lifecycle
  // Before a User is created, automatically hash their password
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};
