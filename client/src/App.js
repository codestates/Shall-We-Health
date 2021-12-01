import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import NavigationBar from './pages/NavigationBar';
import { StickyNav } from 'react-js-stickynav'
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

function App() {

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
          background: rgb(211, 211, 211);
          width: 100%;
          color:#535353;
          font-weight: 700;
          
        }
        .styl {
          padding-top: 0px;
        }
      `}</style>
    )
  }

  return (

    <div className='App'>
      {style()}
      <StickyNav length='45'><NavigationBar /></StickyNav>
      <div className='area-nav'></div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/signup' component={SignUp} />
        <Route path='/find-pw' component={FindPw} />
        <Route path='/board' component={Board} />
        <Route path='/find-partner' component={FindPartner} />
        <Route path='/view' component={View} />
        <Route path='/mypage' component={MyPage} />
        <Route path='/admin' component={AdminPage} />
        <Route path='/chat' component={Chat} />
        <Route path='/pagination' component={Pagination} />
        <Route path='/verify-email/:token' component={VerifyEmail} />
        <Route path='/updatepw/:token' component={UpdatePw} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
