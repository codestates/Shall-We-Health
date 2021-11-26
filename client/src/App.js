import './App.css';
import { Route, Switch } from 'react-router-dom';
import NavigationBar from './pages/NavigationBar';
import Home from './pages/Home';
import Footer from './pages/Footer'
import View from './pages/View';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import FindPw from './pages/FindPw';
import FindParter from './pages/FindPartner'
import Board from './pages/Board'
import MyPage from './pages/MyPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <div className="App">
      <NavigationBar/>
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
      </Switch>
    </div>
  );
}

export default App;
