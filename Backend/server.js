import {} from 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import loginrouter from './routes/loginrouter.js';
import cors from 'cors';
import userRouter from './routes/userrouter.js';

const app = express();
app.use(express.json()); 
app.use(cors());

app.use('/api', loginrouter);

app.use('/api',userRouter);

app.use('/',(req,res)=>{
    res.send("This is home router");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => { 
    try{
        await connectDB();
        console.log("server running on",{PORT});
    }catch(err){
        console.log("Error in lisening",err);
    }
}
);