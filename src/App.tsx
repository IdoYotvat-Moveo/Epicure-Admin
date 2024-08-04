import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from "./pages/HomePage"
import GenericTable from './components/genericTable/GenericTable'


function App() {

  return (
    <Router>
      <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="chef" element={<GenericTable entity="Chef" />} />
            <Route path="restaurant" element={<GenericTable entity="Restaurant" />} />
            <Route path="dish" element={<GenericTable entity="Dish" />} />
          </Route>
      </Routes>
    </Router>
  )
}

export default App
