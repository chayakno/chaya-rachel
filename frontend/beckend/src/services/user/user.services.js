
const { User, validUserSchema } = require('../../models/user.Schema');
const { createSecretToken } = require("../../util/secretToken");
const bcrypt = require("bcryptjs");

async function updateUserStatus(userId, exists) {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        user.exists = exists;
        await user.save();
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function addUser(studentData, res) {
    try {
       
        let user = await User.findOne({ email: studentData.email });
        if (user) {
            throw new Error("Email already exists");
        }

        
        user = await User.findOne({ userId: studentData.userId });
        if (user) {
            throw new Error("User ID already exists");
        }

        
        const newUser = {
            userId: studentData.userId,
            name: studentData.name,
            email: studentData.email,
            phone: studentData.phone
        };

        
        const { error } = validUserSchema.validate(newUser);
        if (error) {
            throw new Error(error.details[0].message);
        }

      
        const newStudent = new User(newUser);
        const savedStudent = await newStudent.save();

      
        const token = createSecretToken(newStudent._id);
        
       
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res
            .status(201)
            .json({ message: "User signed in successfully", success: true, user });



        return savedStudent;

    } catch (err) {
        throw new Error(err.message);
    }
}



module.exports = {
    addUser,
    updateUserStatus

};