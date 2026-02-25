import mongoose from 'mongoose';

const SiteContentSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // e.g. 'hero', 'about', 'stats', etc.
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  updatedAt: { type: Date, default: Date.now }
});

SiteContentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('SiteContent', SiteContentSchema);
