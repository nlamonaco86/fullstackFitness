// Exercise model
module.exports = function (sequelize, DataTypes) {
    const Exercise = sequelize.define("Exercise", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        primary: {
            type: DataTypes.STRING,
            allowNull: false
        },
        secondary: {
            type: DataTypes.STRING,
            allowNull: false
        },
        auxillary: {
            type: DataTypes.STRING,
            allowNull: false
        },
        equipment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        upper: {
            type: DataTypes.BOOLEAN,
            default: false
        },
        lower: {
            type: DataTypes.BOOLEAN,
            default: false
        },
        compound: {
            type: DataTypes.BOOLEAN,
            default: false
        },
    });
    return Exercise;
};
