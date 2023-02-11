import express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const port:number = +process.env.PORT!;

app.get("/", (req, res) => {
    return res.json({message: "hello world"});
});

app.listen(port, () =>{
    console.log(`Listening on: ${port}`);
})