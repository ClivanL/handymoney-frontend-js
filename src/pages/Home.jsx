import Image from 'react-bootstrap/Image'
import showmethemoney from '../../images/showmethemoney.jpeg'
import HanDyMoney2 from '../../images/HanDyMoney2.jpg'
import {useNavigate} from 'react-router-dom'

const Home=()=>{
    const navigate=useNavigate();
    return(
        <>
       
            <Image className="mt-5" onClick={()=>{navigate("/createparty"
            )
            }} src={HanDyMoney2}></Image>
             <p>Click on image to begin</p>
                 <h1>TALLY EXPENSES HERE</h1>
           
        </>
    )
}

export default Home;