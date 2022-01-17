import { number } from "joi";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
    type:{
        type: String,
        required: true
    },
    name :{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    sizes:{
        type: Number,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    }
},{timestamps: true})

export default mongoose.model('Product',productSchema,'products');