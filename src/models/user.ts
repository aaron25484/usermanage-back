import { Schema, model, Document, Types } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    friends: Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const User = model<IUser>('User', userSchema);

export default User;
