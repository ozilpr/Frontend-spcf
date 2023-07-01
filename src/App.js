import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import User from './pages/User'
import AddUser from './pages/AddUser'
import EditUser from './pages/EditUser'
import Diagnosa from './pages/Diagnosa'
import Hipotesa from './pages/Hipotesa'
import AddHpt from './pages/AddHpt'
import EditHpt from './pages/EditHpt'
import Evidence from './pages/Evidence'
import AddEvd from './pages/AddEvd'
import EditEvd from './pages/EditEvd'
import Rules from './pages/Rules'
import AddRls from './pages/AddRls'
import EditRls from './pages/EditRls'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/diagnose' element={<Diagnosa />} />
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/get-user' element={<User />} />
          <Route path='/add-user' element={<AddUser />} />
          <Route path='/edit-user' element={<EditUser />} />
          <Route path='/get-hpt' element={<Hipotesa />} />
          <Route path='/add-hpt' element={<AddHpt />} />
          <Route path='/edit-hpt' element={<EditHpt />} />
          <Route path='/get-evd' element={<Evidence />} />
          <Route path='/add-evd' element={<AddEvd />} />
          <Route path='/edit-evd' element={<EditEvd />} />
          <Route path='/get-rls' element={<Rules />} />
          <Route path='/add-rls' element={<AddRls />} />
          <Route path='/edit-rls' element={<EditRls />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
