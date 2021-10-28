//import
const express = require("express");
const userRouter = require("./routers/user");
const imageRouter = require("./routers/image");

//create app & middleware
const app = express();
const jsonParser = express.json();
//routing and connecting routers
app.use(jsonParser);
app.use("/users", userRouter);
app.use("/images", imageRouter);

// port & listen
const PORT = 4000;
app.listen(PORT, () => console.log(`Hi and welcome to radio ${PORT}`));
