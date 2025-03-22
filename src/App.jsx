import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './page/Home'
import CreateForm from './page/CreateForm'
import EditForm from './page/EditForm'
import ViewForm from './page/ViewForm'

const App = () => {
  return (
    <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/form/create' element={<CreateForm/>}/>
     <Route path='/form/edit/:id' element={<EditForm/>} />
     <Route path='/form/:id' element={<ViewForm/>} />
    </Routes>
  )
}

export default App
