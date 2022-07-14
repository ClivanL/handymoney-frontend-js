import Image from 'react-bootstrap/Image'
import showmethemoney from '../../images/showmethemoney.jpeg'
import {useNavigate} from 'react-router-dom'

const Home=()=>{
    const navigate=useNavigate();
    return(
        <>
            <h1>TALLY EXPENSES HERE</h1>
            <p>Click on image to begin</p>
            <Image onClick={()=>{navigate("/createparty"
            )
            }} src={showmethemoney}></Image>
        </>
    )
}

export default Home;