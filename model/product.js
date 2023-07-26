const mongoose = require('mongoose');
const { Schema } = mongoose;

// schema
const productSchema = new Schema({
    title: String, // String is shorthand for {type: String}
    description: {type:String ,unique:true},
    price: {type:Number,min:[0,'wrong price']},
    discountPercentage: {type:Number,min:[0,'wrong min disc'],max:[50,'wrong max disc']},
    rating: {type:Number,min:[0,'wrong min r'],max:[5,'wrong max r'],default:0},
    brand: {type:String ,required:true},
    category: {type:String ,required:true},
    thumbnail: {type:String ,required:true},
    images: [ String ],
  });

//   model
exports.Product = mongoose.model('Product', productSchema);

