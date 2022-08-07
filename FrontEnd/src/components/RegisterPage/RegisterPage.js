import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser, check_id } from "../../_actions/user_action";
// import { useParams, useLocation, useNavigate } from "react-router-dom";

function RegisterPage(props) {
  // const params = useParams();
  // const location = useLocation();
  // const navigate = useNavigate();

  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Id, setId] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [ConfirmId, setConfirmId] = useState(false);

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
    setConfirmId(false);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };
  const onCheckId = (evnet) => {
    let body = {
      id: Id,
    };
    dispatch(check_id(body)).then((response) => {
      if (response.payload.message == "fail") {
        alert("중복된아이디 입니다.");
      } else {
        setConfirmId(true);
      }
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인 불일치");
    }
    if (!ConfirmId) {
      return alert("중복확인을 진행해주세요");
    }

    // let body = {
    //   email: Email,
    //   name: Name,
    //   password: Password,
    // };

    // dispatch(registerUser(body)).then((response) => {
    //   if (response.payload.Success) {
    //     props.navigate("/login");
    //   } else {
    //     alert('회원가입 실패용"');
    //   }
    // });
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
      {" "}
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>ID</label>
        <input type="id" value={Id} onChange={onIdHandler}></input>
        <button onClick={onCheckId}></button>

        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler}></input>

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler}></input>

        <label>Password</label>
        <input
          type="password"
          value={Password}
          onChange={onPasswordHandler}
        ></input>

        <label>confirm Password</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        ></input>

        <br></br>
        <button type="submit">회원 가입</button>
      </form>
    </div>
  );
}

export default RegisterPage;
