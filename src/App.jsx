import { useState, createContext } from 'react'
import logo from './logo.svg'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Tally from './pages/Tally'
import HomeBar from './components/HomeBar'
import AddParty from './pages/AddParty'
import AddPartyName from './pages/AddPartyName'
import Receipts from './pages/Receipts'
import ExcludeFromSplit from './pages/ExcludeFromSplit'
import Testing from './pages/Testing'
import Breakdown from './pages/Breakdown'
import Home from './pages/Home'
import Testing2 from './pages/Testing2'



export const Party=createContext();

function App() {
const [partyName, setPartyName]=useState({partyName:"", partyId:""});
const [exclusion, setExclusion]=useState()
const [payed, setPayed]=useState({})

  return (
    <div className="App">
    <Party.Provider value={{partyName, setPartyName, exclusion, setExclusion, payed, setPayed}} >
    <BrowserRouter>
    <HomeBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/tally" element={<Tally/>} />
      <Route path="/createparty" element={<AddPartyName/> }/>
      <Route path="/addtoparty" element={<AddParty/>} />
      <Route path="/receipts" element={<Receipts/>}/>
      <Route path="/toexcludefromsplit" element={<ExcludeFromSplit/>}/>
      <Route path="/breakdown" element={<Breakdown/>}/>
      {/* <Route path="/testing" element={<Testing/>}/> */}
      {/* <Route path="/testing2" element={<Testing2/>}/> */}
    </Routes>
    </BrowserRouter>
    </Party.Provider>
    </div>
   
  )
}

export default App
