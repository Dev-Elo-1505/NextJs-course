import mongoose from 'mongoose'

export interface IContact {
  name: string;
  email: string;
  message: string;
  status: 'pending' | 'resolved'
}

const ContactSchema = new mongoose.Schema<IContact>({
    name: String,
    email: String,
    message: String,
    status: {
        type: String,
        default: 'pending'
    }
}, {timestamps: true})

export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema)