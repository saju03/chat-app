import mongoose from "mongoose";


const initDB = async() =>{
    try {
     await mongoose.connect("mongodb://localhost:27017/task_manager") 
     console.log('db connected');
    } catch (error) {
        console.error(error)
        throw new Error('Database Connection Failed')
}

}




export default initDB