const {Teacher} = require('../../models/teacher.Schema');

const { User } = require('../../models/user.Schema');


async function addTeacher(teacherData) {
    let user = await User.findOne({ email: teacherData.email });

    try {

        teachertData = {
            subjects:teacherData.subjects,
            weeklySchedule: [],
            students: [],
            chats: [],
            user: user._id, 
            extraHoursPreference: true,
        }
        const newTeacher = new Teacher(teachertData);
        const savedStudent = await newTeacher.save();
        return savedStudent;
    } catch (err) {
        throw err;
    }
};

module.exports = {
   addTeacher
};
