var db = require("../models");

module.exports = function(app) {
//  var favicon = require("serve-favicon");
//  console.log("favicon location: " + __dirname + "\\favicon.ico");
//  app.use(favicon(__dirname + "\\favicon.ico"));

  // Load index page
  app.get("/", function(req, res) {
    db.Journal.findAll({}).then(function(dbJournals) {
      res.render("index", {
        msg: "Welcome!",
        journals: dbJournals
      });
    });
  });

  // retrieve all journals with tags tagging along
  // Sorta TESTED
  app.get("/journals/", function(req, res) {
    // Get all journal entries
    db.Journal.findAll({
      // Make sure to include the tags
      include: [
        {
          model: db.Tag,
          as: "tags",
          required: false,
          // Pass in the TAG attributes that you want to retrieve
          attributes: ["id", "name"],
          through: {
            // This block of code allows you to retrieve the properties of the join table
            model: db.JournalTag,
            as: "JournalTags"
          }
        }
      ]
    }).then(function(dbJournal) {
      // If everything goes well respond with the journals
      dbJournal.reverse();
      // console.log(dbJournal);
      res.render("allEntries", {
        journals: dbJournal
      });
    });
  });

  // retrieve all tags with journals tagging along
  // UNTESTED
  app.get("/tags/", function(req, res) {
    // Get all tag entries
    db.Tag.findAll({
      // Make sure to include the Journals
      include: [
        {
          model: db.Journal,
          as: "journals",
          required: false,
          // Pass in the journal attributes that you want to retrieve
          attributes: ["id", "description"],
          through: {
            // This block of code allows you to retrieve the properties of the join table
            model: db.JournalTag,
            as: "JournalTags"
          }
        }
      ]
    }).then(function(dbTag) {
      // If everything goes well respond with the journals
      res.render("allTags", {
        tags: dbTag
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
