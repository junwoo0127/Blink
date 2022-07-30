import React from "react";
import { Link } from "react-router-dom";
function main() {
  return (
    <div id="main">
      <h1>Join a video session</h1>
      <form onsubmit="joinSession(); return false">
        <p>
          <label>Session:</label>
          <input type="text" id="sessionName" value="SessionA" required />
        </p>
        <p>
          <label>User:</label>
          <input type="text" id="user" value="User1" />
        </p>
        <p>
          <Link to={`/videoroom`}>join</Link>
        </p>
      </form>
    </div>
  );
}

export default main;
