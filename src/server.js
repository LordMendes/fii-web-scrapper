const express = require('express');
const routes = require('./shared/routes')

const app = express();
const PORT = process.env.PORT ||3333;

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server runing on port: ${PORT}`)
})
