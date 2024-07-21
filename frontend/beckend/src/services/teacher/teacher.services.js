const { Teacher } = require('../../models/teacher.Schema');

const { User } = require('../../models/user.Schema');

const {Chat}=require('../../models/chatSchema.Schema')
const sendMail = require('../../email')
const bcrypt = require("bcryptjs");


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
        const savedTeacher = await newTeacher.save();
        return savedTeacher;
    } catch (err) {
        throw err;
    }
};

async function acceptTeacher(id) {

    try {
        const teacher = await Teacher.findOne({ _id: id }).populate('user');

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

        teacher.chats.push(newChat._id); 
        teacher.status = 'accepted';
        const longUserId = await bcrypt.hash(teacher.user.name, 12);
        teacher.user.userId = longUserId
        await teacher.user.save();
        sendMail(teacher.user.email," קבלה ןהצטרפות לעבודה👻", `${teacher.user.userId}`, `<b>hi ${teacher.user.name} you join successecfully to our school your password is  ${teacher.user.userId}</b>`);

        const savedTeacher = await teacher.save();
        return savedTeacher;
    } catch (err) {
        throw err;
    }
};
const getAllPendingSTeachers = async () => {
    try {
        const PendingSTeachers = await Teacher.find({ status: 'pending' }).populate('user');
        return PendingSTeachers;
    } catch (error) {
        throw error;
    }
};




module.exports = {
    addTeacher,acceptTeacher,getAllPendingSTeachers
};
