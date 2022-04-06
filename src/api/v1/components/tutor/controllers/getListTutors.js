import User from "../../users/model";
import Tutor from "../model";

function getNumberOfDays(start, end) {
  const date1 = new Date(start);
  const date2 = new Date(end);
  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = date2.getTime() - date1.getTime();
  const diffInDays = Math.round(diffInTime / oneDay);
  return diffInDays;
}

const getListTutors = (req, res) => {
  Tutor.find({}, async (err, tutors) => {
    if (err) {
      return res.status(500).json({ message: e });
    }
    let results = tutors.map(async (tutor) => {
      const user = await User.findOne({ _id: tutor.userId });
      if (user !== null) {
        const today = new Date();
        const currentDay =
          today.getMonth() +
          1 +
          "/" +
          today.getDate() +
          "/" +
          today.getFullYear();
        const ageOfAccount = getNumberOfDays(user.createdAt, currentDay);
        return {
          fullname: user.fullname,
          hometown: user.hometown,
          introduction: tutor.introduction,
          ageOfAccount: ageOfAccount,
        };
      }
    });
    Promise.all(results).then((result) => {
      return res.status(200).json(result.filter((r) => r != null));
    });
  });
};

export default getListTutors;
