const { Chat } = require('../../models/chatSchema.Schema');
const Student = require('../../models/student.Schema');

const { User } = require('../../models/user.Schema');

const getAllStudents = async () => {
    try {
        return await Student.find();
    } catch (error) {
        throw error;
    }
};

const getAllPendingStudents = async () => {
    try {
        const pendingStudents = await Student.find({ status: 'pending' });
        return pendingStudents;
    } catch (error) {
        throw error;
    }
};


async function addStudent(studentData) {
    let user = await User.findOne({ email: studentData.email });

    try {
        studentData = {
            subjects: studentData.subjects,
            age: studentData.age,
            weeklySchedule: [],
            hours: null,
            status: "pending",
            user: user._id,
            chats: []
        }
        const newStudent = new Student(studentData);
        const savedStudent = await newStudent.save();
        return savedStudent;
    } catch (err) {
        throw err;
    }
};

async function acceptStudent(id) {
    try {
        const student = await Student.findOne({ _id: id });

        if (!student) {
            throw new Error('Student not found');
        }

        // שימוש ב-Promise.all לביצוע פעולות אסינכרוניות במקביל
        const chatPromises = student.subjects.map(async (sub) => {
            let chat = await Chat.findOne({ roomName: sub });
            

            if (chat) {
                chat.participants.push(student.user); 
                await chat.save(); 
            } else {
                throw new Error('chat not found');
            }

            student.chats.push(chat._id); 
        });

        await Promise.all(chatPromises); 

        student.status = 'accepted';

        const savedStudent = await student.save();
        return savedStudent;
    } catch (err) {
        throw err;
    }
}




module.exports = {
    addStudent, getAllStudents, getAllPendingStudents,acceptStudent
};
