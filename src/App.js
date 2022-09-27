
import './App.scss'

import Header from './components/Header/Header';
import { Link, Outlet } from "react-router-dom";
import Scrollbars from 'react-custom-scrollbars';

const App = () => {
  return (
    <div className="app-container">
      <div div className='header-container' >
        <Header />
      </div>
      <div className='main-container'>
        <div className='side-bar'></div>

        <div className='app-content' >
          <Scrollbars>
            <Outlet />
          </Scrollbars>

        </div>

      </div>


    </div >
  );
}

export default App;
