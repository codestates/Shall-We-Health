import NavigationBar from './pages/NavigationBar';
import Board from './pages/Board'
import AdminPage from './pages/AdminPage';
import { StickyNav } from 'react-js-stickynav'
import './App.css';
import Modal from './components/etc/Modal';
import Confirm from './components/etc/Confirm';
import Issue from './components/Issue';
import Withdraw from './components/Withdraw';
import ModalIssue from './components/AdminPage/ModalIssue'
import Footer from './pages/Footer'
import Loading from './components/etc/Loading';

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
    <div className="App">
      {style()}
      <StickyNav length='45'><NavigationBar/></StickyNav>
      <div className='area-nav'></div>
      <Board/>
      {/* <Modal/> */}
      {/* <Confirm/> */}
      {/* <Withdraw/> */}
      {/* <Issue/> */}
      {/* <AdminPage/> */}
      {/* <ModalIssue/> */}
      <Footer/>
      {/* <Loading/> */}
    </div>
  );
}

export default App;
