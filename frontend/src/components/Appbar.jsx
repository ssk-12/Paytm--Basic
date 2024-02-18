import { Button } from "./Button"
import { useNavigate, Link as RouterLink } from 'react-router-dom'
export const Appbar = (props) => {
    const navigate = useNavigate();
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                {props.username}
            </div>
            <Button onClick={() => {
                navigate('/signout');
            }} label="signout" />
        </div>
    </div>
}