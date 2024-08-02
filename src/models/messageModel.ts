import { Schema, model, Document } from 'mongoose';

interface IMessage extends Document {
    text: string;
    category: string;
    user: Schema.Types.ObjectId;
}

const messageSchema = new Schema<IMessage>({
    text: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Love Messages',
            'Birthday Messages',
            'Graduation Messages',
            'Encouragement Messages',
            'Holiday Messages',
            'Christmas Messages',
            'New Year Messages',
            'Valentine\'s Day Messages',
            'Thanksgiving Messages',
            'Friendship Messages',
            'Happy Easter',
            'Sympathy Messages',
            'Apology Messages',
            'Anniversary Messages',
            'Baby Shower Messages',
            'Wedding Messages',
            'Farewell Messages',
            'Welcome Messages',
            'Mother\'s Day Messages',
            'Father\'s Day Messages',
        ],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

const Message = model<IMessage>('Message', messageSchema);

export default Message;
