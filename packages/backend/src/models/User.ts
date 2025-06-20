import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
});

export const User = model('User', userSchema); 