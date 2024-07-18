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
            status:'pending'

        }
        const newTeacher = new Teacher(teachertData);
        const savedTeacher = await newTeacher.save();
        return savedTeacher;
    } catch (err) {
        throw err;
    }
};

const getAllPendingSTeachers = async () => {
    try {
        const PendingSTeachers = await Teacher({ status: 'pending' });
        return PendingSTeachers;
    } catch (error) {
        throw error;
    }
};

module.exports = {
   addTeacher,getAllPendingSTeachers
};
