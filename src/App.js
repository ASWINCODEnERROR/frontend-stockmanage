import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import PublicRoutes from './router/public/PublicRoutes';
import AdminRoutes from './router/private/AdminRoutes';


function App() {
  return (
   <>
   <Router>
        <Routes>
          <Route exact path="/*" element={<PublicRoutes/>}></Route>
          <Route exact path='/admin*'  element={<AdminRoutes/>} ></Route>
          
        </Routes>
      </Router>
      </>
  );
}

export default App;
