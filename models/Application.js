/*
  Schema for the application submission
*/

import mongoose from "mongoose";
import { UUID } from "bson";

// TODO: Setup GridFS and handle sylabbus upload, download etc. operations, further checks may be added
const courseSchema = new mongoose.Schema({
  id: { type: UUID, required: true },
  foreignCourseName: {
    type: String,
    required: true,
    trim: true,
    minLength: 4,
    maxLength: 50,
  },
  ects: { type: Number, required: true, min: 0 },
  totalCourseHours: { type: Number, required: true, min: 0 },
  courseCategory: {
    type: [String],
    default: undefined,
    required: true,
  },
  metuCourseName: {
    type: String,
    required: true,
    trim: true,
    minLength: 4,
    maxLength: 50,
  },
  metuCourseCode: { type: Number, required: true, min: 1000000, max: 9999999 },
  metuCredits: { type: Number, required: true, min: 0 },
  metuEcts: { type: Number, required: true, min: 0 },
  isSigned: { type: Boolean, required: true },
});

const applicationSchema = new mongoose.Schema({
  studentId: { type: Number, required: true, min: 1000000, max: 9999999 },
  fullName: {
    type: String,
    required: true,
    trim: true,
    minLength: 4,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    match: [
      /^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email",
    ],
  },
  year: { type: Number, required: true, min: 2023, max: 3000 },
  gpa: { type: Number, required: true, min: 0, max: 4 },
  foreignUniversity: {
    type: String,
    required: true,
    trim: true,
    minLength: 4,
    maxLength: 50,
  },
  foreignCountry: {
    type: String,
    required: true,
    trim: true,
    minLength: 4,
    maxLength: 50,
  },
  term: { type: Number, required: true, min: 1, max: 8 },
  courses: [courseSchema],
});

module.exports =
  mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);
