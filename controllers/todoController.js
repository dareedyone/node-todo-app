var bodyParser = require("body-parser");
var urlencoderParser = bodyParser.urlencoded({ extended: false });
let mongoose = require("mongoose");

//connect to db
mongoose.connect(
  "mongodb+srv://test:test@cluster0-aiarr.mongodb.net/test?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
);

//create schema
var todoSchema = new mongoose.Schema({
  item: String,
});
var Todo = mongoose.model("Todo", todoSchema);

//save item into db - runs everytime app is launched
// var itemOne = Todo({ item: "do excersice" }).save(function (err) {
//   if (err) throw err;
//   console.log("item saved");
// });
//dummy data
// var data = [
//   { item: "coreman" },
//   { item: "play ball" },
//   { item: "spyspy" },
// ];
module.exports = function (app) {
  app.get("/todo", function (req, res) {
    //get data from mongoDb and pass it to the view

    Todo.find({}, function (err, data) {
      if (err) throw err;
      res.render("todo", { todos: data });
    });
  });

  app.post("/todo", urlencoderParser, function (req, res) {
    //get data from the view and add it to mondb
    let newTodo = Todo(req.body).save(function (err, data) {
      if (err) throw err;
      res.render("todo", { todos: data });
    });
    // data.push(req.body);

    // res.json();
  });

  app.delete("/todo/:item", function (req, res) {
    //delete requested item from Mongodb
    Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function (
      err,
      data
    ) {
      if (err) throw err;
      res.json(data);
    });
    // data = data.filter(function (todo) {
    //   return todo.item.replace(/ /g, "-") !== req.params.item;
    // });
  });
};
