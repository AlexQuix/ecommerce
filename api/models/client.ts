import {model, Schema, Types} from "mongoose";

const ClientSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: "Users"
    },
    directions: [String],
    shoping_cart: [{
        id: Types.ObjectId, 
        quantity: {
            type: Number,
            default: 1
        },
        product: {
            type: Types.ObjectId,
            ref: "Products"
        }
    }],
    favorites: [{
        type: Types.ObjectId,
        ref: "Products"
    }]
});

const Client = model("Clients", ClientSchema);
export default Client;