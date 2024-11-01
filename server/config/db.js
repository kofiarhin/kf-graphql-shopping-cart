import mongoose from "mongoose"

const connectDB = async() => {
    try {
        const connnect = await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to database")
    } catch (error) {
        console.log(error.message)
        process.emit(1)
    }

}

export default connectDB