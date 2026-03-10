import app from "./src/app.js";
import 'dotenv/config'
import connectDB from "./src/config/db.js";


//server and db
const port = process.env.PORT || 4001
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`server is running on port http://localhost:${port}`);
    })
})