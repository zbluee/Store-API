import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Product name must be provided']
    },
    price : {
        type : Number,
        required : [true, 'Product price must be provide']
    },
    featured : {
        type : Boolean,
        default : false
    },
    rating : {
        type : Number,
        default : 4.5,
        max : [10, 'must less than 10']
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    company : {
        type : String,
        enum : {
            values : ['ikea', 'liddy', 'caressa', 'marcos'],
            message : '{VALUE} is not supported'
        }   
    }
});

const Product = mongoose.model('Product', productSchema);

export {Product};