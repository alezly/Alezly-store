const express = require('express');
const cors = require('cors')
const routerApi = require('./products/routes')
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
const whiteList = ['http://127.0.0.1:5500']
const options = {
  origin: (origin, callback) =>{
    if(whiteList.includes(origin) || !origin){
      callback(null, true)
    }else{
      callback(new Error('No permition'))
    }
  }
}
app.use(cors(options));
//Los endpoints especificos deben declararsen antes de los endpoints dinamicos.

app.get("/api", (req, res) =>{
  res.send("Hola mi server en Express");
});

app.get('/api/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler);

app.listen(port, () =>{
  console.log("My port: " + port);
});
