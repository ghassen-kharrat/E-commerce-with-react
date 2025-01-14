const express = require("express");
const connect=require("./models/index")
const routerAdmin=require('./routes/adminRoute')
const routerCategories=require('./routes/categoriesRoute')
const routerProduct=require("./routes/ProductRoute")
const cors =require('cors')
let app = express();
app.use (cors())
app.use(express.json())
app.use(express.static(__dirname + "/../client/dist"));
app.use("/api/admin",routerAdmin)
app.use("/api/cat",routerCategories)
app.use("/api/prod",routerProduct)

let port = 3000;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
