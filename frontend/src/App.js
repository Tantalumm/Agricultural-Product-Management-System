import { Navigate, Route ,Routes} from 'react-router-dom';
import './App.css';
import CreateItem from './pages/Item/CreateItem.js';
import Header from './pages/header/Header.js';
import Login from './pages/User/Login.js';
import Register from './pages/User/Register.js';
import Homepage from './pages/HomePage/HomePage.js';
function App() {
  return (
    <>
      <Header />
       <Routes>
        <Route path='/' element={<ProtectedRoutes><Homepage/></ProtectedRoutes>} />
        <Route path='/CreateItem' element={<ProtectedRoutes><CreateItem/></ProtectedRoutes>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Register' element={<Register/>} />
       </Routes>
    </>
  );
}

export function ProtectedRoutes(props){
  if(localStorage.getItem("user")){
    return props.children
  }
  else{
    return <Navigate to="/login"/>;
  }
}

export default App;
