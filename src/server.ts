import mongoose from "mongoose";
import app from "./app";


const port: number = 5000;

async function main() {
    try {
        await mongoose.connect('mongodb+srv://mongodb:mongodb@cluster0.q4bfyf2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log("database connected");

        app.listen(port, () => {
            console.log("server is running on http://localhost:", port);
        })
    } catch (error) {
        console.log("database connection error", error);
    }
}

main();