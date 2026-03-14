import mongoose from 'mongoose';

const MediaSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    mimetype: { type: String, required: true },
    data: { type: String, required: true }, // Base64 encoded data
    conference: { type: String, default: 'liutex' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Media', MediaSchema);
