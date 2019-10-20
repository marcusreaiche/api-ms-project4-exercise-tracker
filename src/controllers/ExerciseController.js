const User = require("../models/User");
const Exercise = require("../models/Exercise");
const { filterExercises } = require("../helpers/helpers");

class ExerciseController {
  async store(req, res, next) {
    const {userId, description, duration, date} = req.body;
    // Checks if user exists in database
    const user = await User.findById(userId).catch(e => {
      return next(e);
    });
    if (user) {
      if (date) {
        req.body.date = new Date(date);
      }
      // Saves exercise to database
      const { _id: exercise_id } = await Exercise.create(req.body).catch(e => next(e));
      res.status(201).json({
        _id: userId,
        username: user.username,
        description,
        duration: Number(duration),
        date: req.body.date.toDateString()
      });
    }
  }
  
  async show(req, res, next) {
    const {userId, from, to, limit} = req.query;
    // userId is required
    if (!userId) {
      return res.status(400).json({error: "userId is required"});
    }
    const user = await User.findById(userId).catch(e => next(e));
    
    if (user) {
      let exercises = await Exercise.find({userId}).sort([["date", "-1"]]);
      // Apply the filters through JavaScript
      exercises = filterExercises(exercises, req.query);
      
      return res.json({
        _id: userId,
        username: user.username,
        count: exercises.length,
        log: exercises.map(exercise => {
          const {description, duration, date} = exercise;
          return {
            description, 
            duration, 
            date: date.toDateString()
          };
        })
      });
    }
  }
}

module.exports = new ExerciseController();