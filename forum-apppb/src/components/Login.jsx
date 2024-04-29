import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginUser = async () => {
        try {
            const response = await fetch("https://projeto-bloco-4f62c-default-rtdb.firebaseio.com/users.json");

            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }

            const data = await response.json();

            // Procura o usuário com o email fornecido
            const users = Object.values(data);
            const user = users.find((user) => user.Email === email);

            if (!user) {
                alert("User not found");
                return;
            }

            // Verifica se a senha fornecida corresponde à senha do usuário
            if (user.senha !== password) {
                alert("Invalid password");
                return;
            }

            alert("Login successful");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error logging in: ", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser();
        setEmail("");
        setPassword("");
    };

    return (
        <main className='login'>
            <h1 className='loginTitle'>Log into your account</h1>
            <form className='loginForm' onSubmit={handleSubmit}>
                <label htmlFor='email'>Email Address</label>
                <input
                    type='text'
                    name='email'
                    id='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='loginBtn'>SIGN IN</button>
                <p>
                    Dont have an account? <Link to='/register'>Create one</Link>
                </p>
            </form>
        </main>
    );
};

export default Login;