import { Route ,Routes} from 'react-router-dom';
import './App.css';
import CreateItem from './pages/Item/CreateItem.js';
import Header from './pages/header/Header.js';
import Login from './pages/User/Login.js';
function App() {
  return (
    <>
      <Header />
       <Routes>
        <Route path='/CreateItem' element={<CreateItem/>} />
        <Route path='/Login' element={<Login/>} />
       </Routes>
    </>
  );
}

export default App;
