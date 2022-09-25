import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const JobSchema = new Schema(
  {
    company: { type: String, required: true, minlength: 2, maxlength: 20 },
    jobTitle: { type: String, required: true, minlength: 2, maxlength: 25 },
    hours: { type: Number, required: true, min: 0 },
    rate: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, maxlegth: 200, default: '' },
    sellerId: { type: Schema.Types.ObjectId, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

JobSchema.virtual('seller', {
  localField: 'sellerId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
