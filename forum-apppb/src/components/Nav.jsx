import { useNavigate } from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate();

    const signOut = () => {
        localStorage.removeItem("Email");
        navigate("/");
    };

    return (
        <nav className='navbar'>
            <h2>Nerd Forum</h2>
            <div className='navbarRight'>
                <button onClick={signOut}>Deslogar</button>
            </div>
        </nav>
    );
};

export default Nav;