import {app} from './src/app.js'
import { connectMongoDb } from './src/config/db.js'
const URI=process.env.URI;


connectMongoDb(URI)

app.get('/', (req, res) => {
    console.log('GET request to /');
    res.status(200).json({ message: "welcome to dsasheet" });
});

app.listen(4000,()=>{
    console.log("server start at port 4000")
})

