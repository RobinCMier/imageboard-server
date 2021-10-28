//import
const express = require("express");

//create app & middleware
const app = express();

//routing

// port & listen
const PORT = 4000;
app.listen(PORT, () => console.log(`Hi and welcome to radio ${PORT}`));
