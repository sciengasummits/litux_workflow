import mongoose from 'mongoose';

const SiteContentSchema = new mongoose.Schema({
  conference: { type: String, default: 'liutex', index: true }, // 'liutex' | 'foodagri'
  key: { type: String, required: true }, // e.g. 'hero', 'about', 'stats', etc.
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  updatedAt: { type: Date, default: Date.now }
});

// Compound unique: each conference has its own set of content keys
SiteContentSchema.index({ conference: 1, key: 1 }, { unique: true });

SiteContentSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('SiteContent', SiteContentSchema);

