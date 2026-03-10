import mongoose from "mongoose";
const mongo_uri = process.env.MONGU_URI
const connectDB = async () => {
    try {
        await mongoose.connect(mongo_uri)
            .then(() => {
                console.log('DB CONNECTED SUCCESSFULLY');
            })
    }
    catch (err) {
        console.log('DB CONNECTION FAILED', err);
    }
}

export default connectDB