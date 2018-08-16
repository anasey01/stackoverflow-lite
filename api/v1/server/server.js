import express from "express";
import routes from "./routes/route";

const app = express();

//USE ROUTES
app.use("/api/v1", routes);

//Set Up PORT
app.set('port', process.env.PORT || 3000);

//FIRE Up Server to listen on PORT
app.listen(app.get("port"), ()=>{
    console.log(`Action happening on port ${app.get("port")}`);
});