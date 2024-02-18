import { Navigate, useNavigate } from "react-router-dom"
import { Button } from "../components/Button";
export function Home(){
    const navigate = useNavigate();
    return <div>
        Paytm
        <Button label={"Click here to continue"} onClick={()=>{
            navigate("/signin");
        }}/>
    </div>
}