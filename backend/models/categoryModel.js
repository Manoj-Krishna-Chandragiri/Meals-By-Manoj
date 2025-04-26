import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true
    }
});

// Avoid model recompilation errors
const categoryModel = mongoose.models.category || mongoose.model("category", categorySchema);

export default categoryModel;
