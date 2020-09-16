module.exports = function (sequelize, DataTypes) {
    const Exercises = sequelize.define("exercises", {
        name: { type: DataTypes.STRING, allowNull: false },
        primary: { type: DataTypes.STRING, allowNull: false },
        secondary:  { type: DataTypes.STRING },
        auxillary:  { type: DataTypes.STRING },
        push: { type: DataTypes.BOOLEAN, allowNull: false },
        upper: { type: DataTypes.BOOLEAN, allowNull: false },
        equipType: { type: DataTypes.STRING, allowNull: false },
        
    });

    return Exercises;

};
