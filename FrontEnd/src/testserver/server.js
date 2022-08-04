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
let modalshow = false;
io.on("connection", (socket) => {
  socket.on("getReady", (parNum)=> {
    ++count;
    if(count === parNum){
      modalshow = true;
    }
    socket.emit("getStart", {count:count}, {modalshow: modalshow});
  })

});
  
// server.use(cors())s
// server.get("/", function(req, res) {
//     res.send("hello world")
// })

server.listen(4000, () => {
  console.log("server start");
});
