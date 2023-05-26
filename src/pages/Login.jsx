import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ESInput } from "../hook/useInput";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { __login } from "../redux/modules/loginSlice";
import TrueGuard from "../hook/guard/TrueGuard";
import { isLoginActions } from "../../src/redux/modules/authSlice";

function Login() {
  TrueGuard();
  const dispatch = useDispatch();
  const navi = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const chgInputHandler = (e) => {
    const { value, name } = e.target;
    setUser((old) => {
      return { ...old, [name]: value };
    });
  };

  const submitBtnHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(__login(user));
      if (response.type === "LOGIN/fulfilled") {
        dispatch(isLoginActions.login());
        alert("로그인 되었습니다.");
        navi("/profile");
      }
    } catch (error) {
      const errorMsg = error.response.data.errorMessage;
      alert(`${errorMsg}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - Netflix</title>
      </Helmet>
      <Stbackground>
        <Styled>
          <form onSubmit={submitBtnHandler}>
            <StTitle>로그인</StTitle>
            <ESInput
              type="email"
              value={user.email}
              onChange={chgInputHandler}
              name="email"
              placeholder="이메일 주소"
              maxLength="15"
              required
            />
            <ESInput
              type="password"
              value={user.password}
              onChange={chgInputHandler}
              name="password"
              placeholder="비밀번호"
              maxLength="15"
              required
            />
            <StButton>로그인</StButton>
            {/* <StButton>로그아웃</StButton> */}
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="로그인 정보 저장"
            />{" "}
            &nbsp;
            <StLink>도움이 필요하신가요?</StLink>
          </form>

          <p>
            Netflix 회원이 아닌가요? &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <StLink to="/signup1">지금 가입하세요.</StLink>{" "}
          </p>
          <p
            style={{
              fontSize: "12px",
            }}
          >
            이 페이지는 Google reCAPTCHA의 보호를 받아 사용자가 로봇이 아님을
            확인합니다.
            <StLink>자세히 알아보기.</StLink>{" "}
          </p>
        </Styled>
      </Stbackground>
    </>
  );
}

export default Login;

const Styled = styled.div`
  height: 70vh;
  width: 300px; /* 로그인 폼의 너비 */
  margin: 0 auto; /* 로그인 폼을 중앙에 위치시키기 위한 마진 */
  padding: 40px; /* 로그인 폼 주위의 여백 */
  border-radius: 5px; /* 로그인 폼의 모서리를 둥글게 만듭니다 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 로그인 폼 주위에 그림자를 만듭니다 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #252525;
  opacity: 1.2;
  color: gray;
  line-height: 20px;
  font-size: 14px;

  position: relative;
  top: 12vh;
`;

//배경 이미지
const Stbackground = styled.div`
  background-image: url(https://i.ibb.co/vXqDmnh/background.jpg);
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  opacity: 0.8;
`;

//제목
const StTitle = styled.p`
  margin-bottom: 40px;
  font-size: 28px;
  color: #fff;
`;

//버튼
const StButton = styled.button`
  background-color: #e50914; /* 배경 색상 */
  color: #fff;
  padding: 16px;
  border: none;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 15px;
  text-transform: uppercase;
`;
const StLink = styled(Link)`
  color: #fff;
  font-size: 12px;
`;
