const express = require('express');
const routes = require('./shared/routes')

const app = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server runing on port: ${process.env.PORT || 3000}`)
})
