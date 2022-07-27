import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../_actions/user_action";
import { useParams, useLocation, useNavigate } from "react-router-dom";

function LoginPage(props) {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        props.navigate("/");
      } else {
        alert('Error"');
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler}></input>
        <label>Password</label>
        <input
          type="password"
          value={Password}
          onChange={onPasswordHandler}
        ></input>

        <br></br>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
// withRouter 잘모르겠다
// 원래는 39번줄 props.history.push 에러 문제로 withRouter강의에서씀
// v6에서 사라짐    랜딩페이지도 마찬가지
//  https://11001.tistory.com/176   https://kyung-a.tistory.com/36 https://adjh54.tistory.com/48
//  데이터 없어서 이해못하고 그냥 비슷하게했는데 맞는지는 나중에 알듯?

// withRouter 를 사용하는 이유는 history 객체에 접근할 수 있게 해서
// props.history 이런식으로 가능하게 해줌
//  auth.js 같은  첫번째 부모 컴포넌트같은경우는
// 이미 history 객체에 접근이 가능 그러기에 withRouter가 필요 X

//  강의 출처 https://inf.run/JZyR
