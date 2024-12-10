import {app} from './src/app.js'
import { connectMongoDb } from './src/config/db.js'


connectMongoDb('mongodb://127.0.0.1:27017/DSA?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.1')

app.get('/', (req, res) => {
    console.log('GET request to /');
    res.status(200).json({ message: "welcome to dsasheet" });
});

app.listen(4000,()=>{
    console.log("server start at port 4000")
})

