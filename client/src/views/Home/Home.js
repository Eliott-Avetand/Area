import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/dashboard');
    }, []);

    return (
        <div>
        </div>
    );
}

export default Auth;
