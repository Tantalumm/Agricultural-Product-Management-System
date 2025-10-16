import { Route ,Routes} from 'react-router-dom';
import './App.css';
import CreateItem from './pages/Item/CreateItem.js';
import Header from './pages/header/Header.js';
function App() {
  return (
    <>
      <Header />
       <Routes>
        <Route path='/CreateItem' element={<CreateItem/>} />
       </Routes>
    </>
  );
}

export default App;
