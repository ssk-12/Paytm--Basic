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

        
        
        // You can now use the token to make authenticated requests or pass it to other components
        console.log(token); // For demonstration purposes
    }, []);

    

    return <div>
        
        <Appbar username={username}/>
        <div className="m-8">
            <Balance/>
            <Users />
        </div>
    </div>
    
}
