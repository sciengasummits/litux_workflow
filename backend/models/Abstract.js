import mongoose from 'mongoose';

const AbstractSchema = new mongoose.Schema({
    title: { type: String, default: '' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    organization: { type: String, default: '' },
    country: { type: String, default: '' },
    interest: { type: String, default: '' },  // e.g. "Oral Presentation"
    topic: { type: String, default: '' },  // track / topic of discussion
    address: { type: String, default: '' },
    fileName: { type: String, default: '' },  // uploaded file name
    fileUrl: { type: String, default: '' },  // uploaded file URL
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Abstract', AbstractSchema);
