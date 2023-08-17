import './App.css';
import AnimalDetail from './components/AnimalDetail';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Create from './components/Create';
import Delete from './components/Delete';
import FullList from './components/FullList';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login/>}></Route>
          <Route path='/details' element={<AnimalDetail/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/create-animal' element={<Create/>}></Route>
          <Route path='/delete-animal' element={<Delete/>}></Route>
          <Route path='/full-list' element={<FullList/>}></Route>
          <Route path="*" element={<Login/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
