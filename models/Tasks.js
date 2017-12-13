const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const TaskSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
      type: Date,
      default: Date.now()
  }
});



mongoose.model('tasks', TaskSchema);