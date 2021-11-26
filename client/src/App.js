import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import NavigationBar from './pages/NavigationBar';
import Home from './pages/Home';
import Footer from './pages/Footer';
import View from './pages/View';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import FindPw from './pages/FindPw';
import FindParter from './pages/FindPartner';
import Board from './pages/Board';
import MyPage from './pages/MyPage';
import AdminPage from './pages/AdminPage';
import Chat from './components/View.js/Chat'

function App() {
  return (
    <div className='App'>
      <div>
        <Link to='/'> 홈 </Link>
        <Link to='/login'> 로그인 </Link>
        <Link to='/signup'> 회원가입 </Link>
        <Link to='/find-pw'> 비밀번호찾기 </Link>
        <Link to='/footer'> 푸터 </Link>
        <Link to='/board'> 게시판 </Link>
        <Link to='/find-partner'> 파트너찾기 </Link>
        <Link to='/view'> 뷰 </Link>
        <Link to='/mypage'> 마이페이지 </Link>
        <Link to='/admin'> 관리자페이지 </Link>
        <Link to='/chat'> 채팅 </Link>
      </div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
        <Route path='/find-pw' component={FindPw} />
        <Route path='/footer' component={Footer} />
        <Route path='/board' component={Board} />
        <Route path='/find-partner' component={FindParter} />
        <Route path='/view' component={View} />
        <Route path='/mypage' component={MyPage} />
        <Route path='/admin' component={AdminPage} />
        <Route path='/chat' component={Chat} />
      </Switch>
    </div>
    
  );
}

export default App;
