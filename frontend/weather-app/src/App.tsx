import * as React from 'react';
import { Link} from 'react-router-dom';
import Main from './components/Main';

export default function App() {
  return (
    <>  
      <div>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul>
        <hr />
        <Main />       
      </div>   
    </>
  )
}