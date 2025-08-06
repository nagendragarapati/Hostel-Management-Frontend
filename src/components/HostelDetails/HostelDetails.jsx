import { useParams } from "react-router-dom"


const HostelDetails=()=>{

    const {id}=useParams()


    return(
        <div>
            <h1>Details Id is {id}</h1>
        </div>
    )
}

export default HostelDetails