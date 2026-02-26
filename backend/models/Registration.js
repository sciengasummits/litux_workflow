import mongoose from 'mongoose';

const RegistrationSchema = new mongoose.Schema({
    conference: { type: String, default: 'liutex', index: true }, // 'liutex' | 'foodagri'
    title: { type: String, default: '' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    country: { type: String, default: '' },
    company: { type: String, default: '' },
    address: { type: String, default: '' },
    registrationCategory: { type: String, default: '' }, // e.g. "Speaker Presentation (In-Person)"
    accommodation: { type: String, default: '' },
    sponsorship: { type: String, default: '' },
    accompanyingPerson: { type: Boolean, default: false },
    totalAmount: { type: Number, default: 0 },
    description: { type: String, default: '' },
    status: { type: String, default: 'Pending' },
    txnId: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Registration', RegistrationSchema);

