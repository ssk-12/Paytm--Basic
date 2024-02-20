import { useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useNavigate } from "react-router-dom"


export const Dashboard = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    useEffect(() => {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");
        if(!token){
            navigate( "/signin", { replace: true });
        } 
    }, []);

    

    return <div>
        
        <Appbar username={username}/>
        <div className="m-8">
            <Balance/>
            <Users />
        </div>
    </div>
    
}
