module.exports = function(sequelize, DataTypes) {
  var Journal = sequelize.define("Journal", {
    title: {
      allowNull: true,
      type: DataTypes.TEXT,
      defaultValue: "No Title"
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true
      }
    }
  });
  Journal.associate = function(models) {
    Journal.belongsToMany(models.Tag, {
      through: "JournalTags",
      as: "tags",
      foreignKey: "journalId"
    });
  };
  Journal.associate = function(models) {
    Journal.belongsTo(models.User);
  };
  return Journal;
};
