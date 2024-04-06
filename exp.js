const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());

//post
app.post("/post", (req, res) => {
  console.log("POST REQUEST SECCESSFUL");
  console.log(req.body);
  res.send("Data POST request recieved");
});
// delete
app.delete("/delete", (req, res) => {
  console.log("Delete request successful");
  console.log(req.body);
  res.send("Data delete request recieved");
});
// put
app.put("/put", (req, res) => {
  console.log("PUT Request successful");
  console.log(req.body);
  res.send("Data Update Request Recieved");
});
//get
app.get("/", (req, res) => {
  console.log("Get request successfull!");
  res.send("hello :)");
});
app.listen(PORT, () => {
  console.log(`server started ${PORT}`);
});
