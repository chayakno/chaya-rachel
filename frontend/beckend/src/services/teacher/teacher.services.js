const { Teacher } = require('../../models/teacher.Schema');

const { User } = require('../../models/user.Schema');

const {Chat}=require('../../models/chatSchema.Schema')


async function addTeacher(teacherData) {
    let user = await User.findOne({ email: teacherData.email });

    try {

        teachertData = {
            subjects: teacherData.subjects,
            weeklySchedule: [],
            students: [],
            chats: [],
            user: user._id,
            extraHoursPreference: true,
            status: 'pending'

        }
        const newTeacher = new Teacher(teachertData);
        const savedStudent = await newTeacher.save();
        return savedStudent;
    } catch (err) {
        throw err;
    }
};

async function acceptTeacher(id) {


    try {
        const teacher = await Teacher.findOne({ _id: id });

        if (!teacher) {
            throw new Error('Teacher not found');
        }
        const user=await User.findOne({_id:teacher.user})

        const chatRoom = new Chat({
            roomName: teacher.subjects[0],
            participants: [],
            messages: []
        });

        const newChat = await chatRoom.save();

        teacher.chats.push(newChat._id); // הוספת הצ'אט למערך הצ'אטים
        teacher.status = 'accepted';

       
        const savedTeacher = await teacher.save();
        return savedTeacher;
    } catch (err) {
        throw err;
    }
};


module.exports = {
    addTeacher,acceptTeacher
};
