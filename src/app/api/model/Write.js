import mongoose from 'mongoose';

const WriteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },    
    imageUrl:{
        type:String,
        required:false,
    }
  },
  { timestamps: true }
);

export default mongoose.models.Write || mongoose.model('Write', WriteSchema);
