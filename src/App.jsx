import { useState, createContext } from 'react'
import logo from './logo.svg'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Tally from './pages/Tally'
import Navbar from './components/Navbar'
import AddParty from './pages/AddParty'
import AddPartyName from './pages/AddPartyName'
import Receipts from './pages/Receipts'
import ExcludeFromSplit from './pages/ExcludeFromSplit'
import Testing from './pages/Testing'
import Breakdown from './pages/Breakdown'


export const Party=createContext();

function App() {
const [partyName, setPartyName]=useState({partyName:"", partyId:""});
const [exclusion, setExclusion]=useState()

  return (
    <div className="App">
      <h1>HanDyMoney</h1>
    <Party.Provider value={{partyName, setPartyName, exclusion, setExclusion}} >
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/tally" element={<Tally/>} />
      <Route path="/createparty" element={<AddPartyName/> }/>
      <Route path="/addtoparty" element={<AddParty/>} />
      <Route path="/receipts" element={<Receipts/>}/>
      <Route path="/toexcludefromsplit" element={<ExcludeFromSplit/>}/>
      <Route path="/breakdown" element={<Breakdown/>}/>
      {/* <Route path="/" element={<Testing/>}/> */}
    </Routes>
    </BrowserRouter>
    </Party.Provider>
    </div>
   
  )
}

export default App
