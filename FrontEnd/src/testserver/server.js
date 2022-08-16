const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
let count = 0;
let firstCount = 0;
let mafiaCount = 0;
let citizenCount = 0;
let roles = ["mafia", "citizen"];
let gameReady = 0;
let answerCount = 0;
let discussCount = 0;
let gameSetCount = 0;
let finalCount = 0;

// let modalshow = false;
io.on("connection", (socket) => {
  socket.on("getReady", () => {
    ++count;

    io.sockets.emit("getReady", { count: count });
  });
  socket.on("getCount", () => {
    //들어왔을 때 들어온 사람만 현재 준비완료 값을 받으면 됨으로 io 안씀
    socket.emit("getCount", { count: count });
  });
  Number();
  socket.on("selectFirst", () => {
    ++firstCount;
    io.sockets.emit("selectFirst", { firstCount: firstCount });
  });

  socket.on("setRole", (roomLimit) => {
    console.log(roomLimit.roomLimit);
    let rand = Math.floor(Math.random() * roles.length);
    let role = roles[rand];
    if (role === "mafia") {
      mafiaCount++;
    } else {
      citizenCount++;
    }
    if (roomLimit.roomLimit === 4) {
      if (mafiaCount === 1) {
        roles.shift();
      } else if (citizenCount === 3) {
        roles.pop();
      }
    } else if (roomLimit.roomLimit === 6) {
      if (mafiaCount === 2) {
        roles.shift();
      } else if (citizenCount === 4) {
        roles.pop();
      }
    } else if (roomLimit.roomLimit === 8) {
      if (mafiaCount === 3) {
        roles.shift();
      } else if (citizenCount === 5) {
        roles.pop();
      }
    }
    socket.emit("setRole", { role: role });
    console.log("mafia : ", mafiaCount, "citizen : ", citizenCount);
  });
  socket.on("gameReady", () => {
    ++gameReady;
    io.sockets.emit("gameReady", { gameReady: gameReady });
  });
  socket.on("gameReadyCount", () => {
    socket.emit("gameReadyCount", { gameReady: gameReady });
  });

  socket.on("yes", (num) => {
    ++answerCount;
    console.log("ans", answerCount);
    io.sockets.emit("yes", { answerCount: answerCount });
    if (answerCount === num) {
      answerCount = 0;
    }
  });
  socket.on("no", (num) => {
    ++answerCount;
    console.log("ans", answerCount);
    io.sockets.emit("no", { answerCount: answerCount });
    if (answerCount === num) {
      answerCount = 0;
    }
  });

  socket.on("discussCount", () => {
    ++discussCount;
    console.log(discussCount);
    io.sockets.emit("discussCount", { discussCount: discussCount });
  });
  socket.on("gameSet", () => {
    ++gameSetCount;
    io.sockets.emit("gameSet", { gameSetCount: gameSetCount });
  });

  socket.on("selectFinal", () => {
    ++finalCount;
    io.sockets.emit("selectFinal", { finalCount: finalCount });
  });
  socket.on("firstMatchConfirm", () => {
    io.sockets.emit("firstMatchConfirm");
  });
  socket.on("leaveSession", (role, roomLimit) => {
    count = 0;
    firstCount = 0;
    gameReady = 0;
    answerCount = 0;
    discussCount = 0;
    gameSetCount = 0;
    finalCount = 0;
    mafiaCount = 0;
    citizenCount = 0;
    roles = ["mafia", "citizen"];
    //   console.log(roomLimit);
    //   console.log(
    //     "count",
    //     count,
    //     "firstCount",
    //     firstCount,
    //     "gameReady",
    //     gameReady,
    //     "answerCount",
    //     answerCount,
    //     "discussCount",
    //     discussCount,
    //     "gameSetCount",
    //     gameSetCount,
    //     "finalCount",
    //     finalCount,
    //     "mafiaCount",
    //     mafiaCount,
    //     "citizenCount",
    //     citizenCount
    //   );
    //   --count;
    //   --firstCount;
    //   --gameReady;
    //   --answerCount;
    //   --discussCount;
    //   --gameSetCount;
    //   --finalCount;
    //   if (roomLimit === 4) {
    //     if (role === "mafia") {
    //       --mafiaCount;

    //       if (citizenCount === 3) {
    //         roles = ["mafia"];
    //       } else {
    //         roles = ["mafia", "citizen"];
    //       }
    //     } else {
    //       --citizenCount;
    //       if (mafiaCount === 1) {
    //         roles = ["citizen"];
    //       }
    //     }
    //   } else if (roomLimit === 6) {
    //     if (role === "mafia") {
    //       --mafiaCount;

    //       if (citizenCount === 4) {
    //         roles = ["mafia"];
    //       } else {
    //         roles = ["mafia", "citizen"];
    //       }
    //     } else {
    //       --citizenCount;
    //       if (mafiaCount === 2) {
    //         roles = ["citizen"];
    //       }
    //     }
    //   } else if (roomLimit === 8) {
    //     if (role === "mafia") {
    //       --mafiaCount;

    //       if (citizenCount === 5) {
    //         roles = ["mafia"];
    //       } else {
    //         roles = ["mafia", "citizen"];
    //       }
    //     } else {
    //       --citizenCount;
    //       if (mafiaCount === 3) {
    //         roles = ["citizen"];
    //       }
    //     }
    //   }
    //   console.log(
    //     "count",
    //     count,
    //     "firstCount",
    //     firstCount,
    //     "gameReady",
    //     gameReady,
    //     "answerCount",
    //     answerCount,
    //     "discussCount",
    //     discussCount,
    //     "gameSetCount",
    //     gameSetCount,
    //     "finalCount",
    //     finalCount,
    //     "mafiaCount",
    //     mafiaCount,
    //     "citizenCount",
    //     citizenCount
    //   );
  });
});

// server.use(cors())s
// server.get("/", function(req, res) {
//     res.send("hello world")
// })

server.listen(4000, () => {
  console.log("server start");
});
