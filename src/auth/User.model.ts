import * as mongoose from 'mongoose';
 export const SellerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true}
})

