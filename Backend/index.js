const ConnectTomongo = require('./db');
const express = require('express')
const app = express()
const port = 5000
var cors = require('cors') // 

 
app.use(cors())
app.use(express.json());

// Available routes
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/notes', require('./Routes/notes'));



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

ConnectTomongo();
