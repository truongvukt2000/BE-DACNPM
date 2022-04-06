import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  introduction: String,
  education: String,
  experience: String,
  profession: String,
  schedule: Date,
  languages: String,
  teachingStyles: String,
  certificates: String,
  interests: {
    type: String,
  },
  fullname: {
    type: String,
  },
});

export default mongoose.model("Tutor", tutorSchema);
