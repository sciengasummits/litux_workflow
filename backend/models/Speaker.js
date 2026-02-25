import mongoose from 'mongoose';

const SpeakerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: String,
    affiliation: String,
    category: { type: String, enum: ['Committee', 'Plenary', 'Keynote', 'Invited', 'Featured', 'Poster Presenter', 'Student', 'Delegate'], default: 'Delegate' },
    image: String,
    bio: String,
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Speaker', SpeakerSchema);
