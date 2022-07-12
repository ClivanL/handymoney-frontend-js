import {useNavigate} from 'react-router-dom'

function Navbar(){
    
const navigate=useNavigate();

    return(
        <div className="container">
            <button onClick={()=>navigate("/")}>Home</button>
            <button onClick={()=>navigate("/createparty")}>Create Party</button>
            <button onClick={()=>navigate("/addtoparty")}>Party members</button>
            <button onClick={()=>navigate("/tally")}>Tally</button>
            <button onClick={()=>navigate("/history")}>History</button>
        </div>
    )
}

export default Navbar;