import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import Login from './components/login';
import Register from './components/Register';
import Layout from './components/layout';
import Dashboard from './components/dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}> 
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/Dashboard" element={<Dashboard />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;


