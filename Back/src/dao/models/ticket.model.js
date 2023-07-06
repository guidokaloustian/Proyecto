import mongoose from "mongoose";

const ticketsSchema = new mongoose.Schema({
    code: {
        type: String,
        unique:true
    },
    purchase_datetime: {
        type: Date,
        required: true,
        default: Date.now()
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Users',
    }
})

export const ticketsModel = mongoose.model('Tickets', ticketsSchema);