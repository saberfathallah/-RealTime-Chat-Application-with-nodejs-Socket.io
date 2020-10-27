import express from 'express'; 
import bodyParser from 'body-parser'; 
import dotenv from 'dotenv'; 

dotenv.config();

const PORT = process.env.APPLICATION_PORT;;
const app = express();  
 
app.use(bodyParser.json()); 

  app.get(
    '/test', (req, res) => {
    return res.status(200).send({ success: true }); 
    },
  );

  app.listen(PORT, () => console.log(`🚀 application ready at ${PORT}`));
