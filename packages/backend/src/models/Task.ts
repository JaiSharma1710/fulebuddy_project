import { Schema, model, Document } from 'mongoose';

export interface ITask extends Document {
    title: string;
    description: string;
    createdBy: Schema.Types.ObjectId;
    sharedWith: any[];
}

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sharedWith: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export const Task = model<ITask>('Task', taskSchema); 