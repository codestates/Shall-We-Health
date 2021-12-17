import './App.css';
import { Route, Switch } from 'react-router-dom';
import NavigationBar from './pages/NavigationBar';
import { StickyNav } from 'react-js-stickynav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import useTheme from './hooks/useTheme';
import Home from './pages/Home';
import Footer from './pages/Footer';
import View from './pages/View';
import SignUp from './pages/SignUp';
import FindPw from './pages/FindPw';
import FindPartner from './pages/FindPartner';
import Board from './pages/Board';
import MyPage from './pages/MyPage';
import AdminPage from './pages/AdminPage';
import VerifyEmail from './components/SignUp/VerifyEmail';
import UpdatePw from './components/FindPw/UpdatePw'
import Chat from './components/View.js/Chat';
import Pagination from './components/Pagination/Pagination';
import NaverLogin from './pages/NaverLogin';
import FindPartnerModify from './pages/FindPartnerModify';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import axios from "axios"
import { login } from './actions';

function App() {
  const [theme, themeToggler] = useTheme();
  const dispatch = useDispatch();

  const isAuthenticated = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVER_API}/user/auth`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.data) {
          const { isLogin, decoded } = res.data.data
          dispatch(
            login({
              isLogin: isLogin,
              isAdmin: decoded.isAdmin,
              isOauth: decoded.isOauth,
              id: decoded.id,
              nickname: decoded.nickname,
              email: decoded.email,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const style = () => {
    return (
      <style jsx>{`
        .nav {
          transition: all 0.1s linear;
          position: fixed;
          z-index: 2000;
          height:45px;
          font-weight: 350;
        }
        .scrollNav {
          transition: all 0.5s ease-in;
          z-index: 2000;
          background: var(--nav-color);
          width: 100%;
          color:var(--font-color2);
          font-weight: 700;
          
        }
        .styl {
          padding-top: 0px;
        }
      `}</style>
    )
  }

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (

    <div className='App' data-theme={theme}>
      {style()}
      <StickyNav length='45'><NavigationBar /></StickyNav>
      <div className='area-nav'></div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/signup' component={SignUp} />
        <Route path='/find-pw' component={FindPw} />
        <Route path='/board' component={Board} />
        <Route path='/find-partner' component={FindPartner} />
        <Route path='/modify/:postId' component={FindPartnerModify} />
        <Route path='/view/:postId' component={View} />
        <Route path='/mypage' component={MyPage} />
        <Route path='/admin' component={AdminPage} />
        <Route path='/chat' component={Chat} />
        <Route path='/pagination' component={Pagination} />
        <Route path='/verify-email/:token' component={VerifyEmail} />
        <Route path='/updatepw/:token' component={UpdatePw} />
        <Route path='/naver' component={NaverLogin} />
      </Switch>
      <Footer />
      {theme === 'light' ? (
        <div className='btn-theme dark' onClick={() => { themeToggler() }}><FontAwesomeIcon className='icon-theme' icon={faMoon} /><div>다크 모드로 보기</div></div>
      ) : (
        <div className='btn-theme light' onClick={() => { themeToggler() }}><FontAwesomeIcon className='icon-theme' icon={faSun} /><div>라이트 모드로 보기</div></div>
      )}
    </div>
  );
}

export default App;
