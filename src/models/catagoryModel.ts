import { Schema, model, Document } from 'mongoose';

interface ICategory extends Document {
    name: string;
}

const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

const Category = model<ICategory>('Category', categorySchema);

export default Category;
