import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from "./pages/HomePage"
import GenericTable from './components/genericTable/GenericTable'
import LoginPage from './pages/login-page/LoginPage'


function App() {

  return (
    <Router>
      <Routes>
          <Route path="/" element={<LoginPage />}>
          {/* <Route path="/" element={<HomePage />}> */}
            <Route path="chef" element={<GenericTable entity="chef" />} />
            <Route path="restaurant" element={<GenericTable entity="restaurant" />} />
            <Route path="dish" element={<GenericTable entity="dish" />} />
          </Route>
      </Routes>
    </Router>
  )
}

export default App
