import mongoose from 'mongoose';
import validator from 'validator';

const userData = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate(val) {
            if(!validator.isEmail(val)) {
                throw new Error("Invalid email address");
            }
        }
    },
    password: {
        type: String,
        required: true,
    }
})

const user = mongoose.model('userData', userData);
export default user;