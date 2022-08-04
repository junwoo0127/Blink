const app = require("express")();
const server = require("http").createServer(app);
const cors =require('cors')
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
let count=0;
let firstCount = 0;
// let modalshow = false;
io.on("connection", (socket) => {
  console.log("data")
  socket.on("getReady" , ()=> {
    ++count;
  
    socket.emit("getStart", {count:count});
  })
  socket.on("getCount",()=> {
    socket.emit("getCount", {count:count})
  })
  socket.on("selectFirst", ()=> {
    ++firstCount;
    socket.emit("selectFirst", {firstCount: firstCount})
  })
  socket.on("getLoveCount", () => {

    socket.emit("getLoveCount", {firstCount:firstCount})
  })
});
  
// server.use(cors())s
// server.get("/", function(req, res) {
//     res.send("hello world")
// })

server.listen(4000, () => {
  console.log("server start");
});
