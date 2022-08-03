import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";

export default function (SpecificComponent, option, adminRoute = null) {
  //                      html  ,  옵션밑에 , 관리자 옵션 없으면 null로
  //null  아무나
  //ture   로그인한유저만 가능
  //false  로그인한유져 불가능

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);

        if (!response.payload.isAuth) {
          // 비로그인상태 일때  로그인 페이지로 전송
          if (option === true) {
            props.history.push("/login");
          }
        } else {
          // 로그인 한 상태
          // 어드민이 아닌데 어드민 페이지 갈려고할때?? 왜 조건 2가지?
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            // 로그인 유저가 출입불가능 페이지 가려할때 / 로그인, 레지스터
            if (option === false) props.history.push("/");
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
