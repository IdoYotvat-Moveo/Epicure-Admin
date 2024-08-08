import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import HomePage from "./pages/HomePage"
import GenericTable from './components/genericTable/GenericTable'
import LoginPage from './pages/login-page/LoginPage'
import * as userService from './services/user.service'

interface PrivateRouteProps {
  element: JSX.Element
}
function App() {

  const PrivateRoute = ({ element }:PrivateRouteProps) => {
    return userService.isAuthenticated() ? element : <Navigate to="/" />
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<PrivateRoute element={<HomePage />} />}>
          <Route path="chef" element={<PrivateRoute element={<GenericTable entity="chef" />} />} />
          <Route path="restaurant" element={<PrivateRoute element={<GenericTable entity="restaurant" />} />} />
          <Route path="dish" element={<PrivateRoute element={<GenericTable entity="dish" />} />} />
        </Route>
      </Routes>
    </Router>

  )

  
}

export default App
