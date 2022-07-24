import './App.css';
import { BrowserRouter } from 'react-router-dom'
import { Router } from './routers/index'
import { Button } from 'antd';
import 'antd/dist/antd.css';

function App() {
  // console.log('----------------------------------', process.env.REACT_APP_ENV)
  return (
    <div className="App">
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
    </div>
  );
}

export default App;
