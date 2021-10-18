import React, { useEffect, useState } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import $ from 'jquery';
import '../../styles/LoginStyle/Login.css';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick.min.js';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';
//===api start===
import { authURL } from '../../utils/config';
import axios from 'axios';
//===api end====
import { useAuth } from '../../context/auth';

import ForgetPassword from './ForgetPassword';

// ===icon start===
import { FaFacebookSquare, FaGoogle } from 'react-icons/fa';
// ===icon end===

//===import img start===
import loginLogo from '../../img/logo.svg';
import slider1 from '../../img/pic1.webp';
import slider2 from '../../img/pic2.webp';
import slider3 from '../../img/pic3.webp';
import Swal from 'sweetalert2';
//===import img end===

//===第三方登入===
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { v4 as uuidv4 } from 'uuid';

function Login(props) {
  // const [user, setUser] = useState([]);
  // const [email, setEmail] = useState('ming@test');
  // const [password, setPassword] = useState('123456');
  const { auth, setAuth } = useAuth();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  function handleChange(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    $('.login-display-photo-box').slick({
      dots: false,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 2800,
      fade: true,
      cssEase: 'linear',
    });
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     let result = await axios.post(`${authURL}/login`, {
  //       email,
  //       password,
  //     });
  //     console.log(result.data); //for check
  //     setUser(result.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append('email', loginData.email);
      formData.append('password', loginData.password);
      let response = await axios.post(`${authURL}/login`, formData, {
        withCredentials: true,
      });
      setAuth(true);
      console.log('response', response);
      console.log('loginData', loginData);
    } catch (e) {
      console.error(e.response);
      Swal.fire({
        icon: 'error',
        title: '登入失敗',
        text: '請重新輸入帳號密碼!',
      });
      // swal('登入失敗', '請重新輸入帳號密碼!', 'error');
    }
  };
  console.log(auth);
  // 準備 INSERT INTO 資料庫 end

  //===第三方登入 star
  //FB
  const responseFacebook = async (res) => {
    // console.log('Hello FB', res.accessToken);
    let response = await axios.post(
      `${authURL}/facebook`,
      {
        access_token: res.accessToken,
      },
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    if (response.data) {
      setAuth(true);
    }
  };

  const responseGoogle = async (res) => {
    // console.log('Hello Google', res.accessToken);
    let response = await axios.post(
      `${authURL}/google`,
      {
        access_token: res.accessToken,
      },
      {
        withCredentials: true,
      }
    );

    console.log(response.data);
    if (response.data) {
      setAuth(true);
    }
  };
  const onFailure = (error) => {
    console.log(error);
  };
  //===第三方登入 end

  return (
    <>
      {auth ? (
        <Redirect to="/" />
      ) : (
        <div>
          <div className="d-flex">
            <div className="login-w-50-l login-bg-pic p-3 position-relative">
              <div className="login-display-photo-box black-mask">
                <div className="login-slick-photo-box">
                  <img src={slider1} alt="" title="" className="cover-fit" />
                </div>
                <div className="login-slick-photo-box">
                  <img src={slider2} alt="" title="" className="cover-fit" />
                </div>
                <div className="login-slick-photo-box">
                  <img src={slider3} alt="" title="" className="cover-fit" />
                </div>
              </div>
              <div className="position-absolute login-logobox">
                <figure className="login-logo">
                  <img src={loginLogo} alt="logo" />
                </figure>
              </div>
            </div>
            <div className="login-w-50-l p-5 align-self-center">
              <form onSubmit={handleSubmit} novalidate>
                <h2 className="text-center pb-5 login-title">會員登入</h2>
                <div className="mb-3">
                  <label
                    htmlFor="InputEmail1"
                    className="form-label login-account"
                  >
                    帳號
                  </label>
                  <input
                    type="email"
                    className="form-control login-input"
                    id="InputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="請輸入您的email"
                    name="email"
                    value={loginData && loginData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="InputPassword1"
                    className="form-label login-password"
                  >
                    密碼
                  </label>
                  <input
                    type="password"
                    className="form-control login-input"
                    id="InputPassword1"
                    placeholder="請輸入您的密碼"
                    name="password"
                    value={loginData && loginData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 text-center login-member">
                  <button type="submit" className="btn login-btn">
                    登入
                  </button>
                </div>
                <div className="mb-3 text-center">
                  <ForgetPassword />
                  <span>&nbsp;&nbsp; &nbsp;&nbsp;</span>
                  <Link className="login-signUp btn" to="/signup">
                    註冊會員
                  </Link>
                </div>
                <hr />
                <div className="mb-3">
                  <h6 className="login-fast">快速登入</h6>
                  <span>&nbsp;&nbsp;</span>
                  <div className="login-social-container">
                    <FacebookLogin
                      // className="login-icon login-icon-FB"
                      textButton="&nbsp;&nbsp;Facebook 登入"
                      cssClass="btn btnFacebook"
                      appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
                      // fields="name,email,picture"
                      autoLoad={false}
                      callback={responseFacebook}
                      icon={
                        <FaFacebookSquare
                          className="fbIcon"
                          style={{ marginLeft: '5px' }}
                        />
                      }
                    >
                      Facebook登入
                    </FacebookLogin>
                    <span>&nbsp;&nbsp;</span>
                    <GoogleLogin
                      className="btnGoogle"
                      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                      buttonText="Google登入"
                      onSuccess={responseGoogle}
                      onFailure={onFailure}
                      cookiePolicy={'single_host_origin'}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default withRouter(Login);
