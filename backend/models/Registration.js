import mongoose from 'mongoose';

const RegistrationSchema = new mongoose.Schema({
    conference:         { type: String, default: 'liutex', index: true },
    title:              { type: String, default: '' },
    name:               { type: String, required: true },
    email:              { type: String, required: true },
    phone:              { type: String, default: '' },
    country:            { type: String, default: '' },

    // Canonical field: "affiliation" (sent by all conference sites).
    // Legacy field: "company" — kept for backward compatibility with older records.
    affiliation:        { type: String, default: '' },
    company:            { type: String, default: '' },

    address:            { type: String, default: '' },

    // Canonical field: "category" (sent by all conference sites).
    // Legacy field: "registrationCategory" — kept for backward compatibility.
    category:           { type: String, default: '' },
    registrationCategory: { type: String, default: '' },

    sponsorship:        { type: String, default: '' },
    accommodation:      { type: String, default: '' },
    accompanyingPerson: { type: Boolean, default: false },
    description:        { type: String, default: '' },

    // Canonical field: "amount" (sent by all conference sites).
    // Legacy field: "totalAmount" — kept for backward compatibility.
    amount:             { type: Number, default: 0 },
    totalAmount:        { type: Number, default: 0 },

    status:             { type: String, default: 'Pending' },
    txnId:              { type: String, default: '' },
    createdAt:          { type: Date, default: Date.now },
});

export default mongoose.model('Registration', RegistrationSchema);
