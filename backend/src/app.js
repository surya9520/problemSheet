import express from "express";
import { userRouter } from "./routes/usersRouter.js";
import { problemRouter } from "./routes/problemRouter.js";
import { adminRouter } from "./routes/adminRouter.js";
import cookieParser from "cookie-parser";
import { verifiedUser } from "./middlewares/authMiddleware.js";
import { solutionRouter } from "./routes/solutionRouter.js";
import cors from 'cors'
import { adminRemarkRouter } from "./routes/adminRemarkRouter.js";
import { listRouter } from "./routes/listRouter.js";
import { tagRouter } from "./routes/tagRouter.js";
import { checkAdmin } from "./middlewares/checkAdmin.js";


const app = express();
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow cookies to be sent
  }))
app.use('/api',verifiedUser)

//routes for user
app.use('/users', userRouter); 

//routes for dsaproblems
app.use('/api/dsa',problemRouter)

//routes for admin   
app.use('/api/admin/',checkAdmin,adminRouter)

//routes for solution
app.use('/api/solution',solutionRouter)

//routes for remark
app.use('/api/admin/remark',checkAdmin,adminRemarkRouter)

//lists and tags
app.use('/api/admin/lists',checkAdmin, listRouter)

  app.use('/api/admin/tags',tagRouter)
app.get('/api',(req,res)=>{
    res.status(200).json({msg:"hi user"}) 
})

export { app };
 