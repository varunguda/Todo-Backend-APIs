import app from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();

app.listen(process.env.PORT, ()=>{
    console.log(`SERVER IS RUNNING AT PORT ${ process.env.PORT } in ${ process.env.NODE_ENV } mode`);
})