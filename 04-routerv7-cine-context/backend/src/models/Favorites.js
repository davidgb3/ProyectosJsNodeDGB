import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    id_user: {
        type: String,
        required: true,
    },
    id_movie: {
        type: Number,
        required: true,
    },
}); 

export const Favorite = mongoose.model('Favorite', favoriteSchema);