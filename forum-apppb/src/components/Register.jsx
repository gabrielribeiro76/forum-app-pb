import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signUp = async () => {
        try {
            const response = await fetch("https://projeto-bloco-4f62c-default-rtdb.firebaseio.com/users.json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Email: email,
                    Usuario: username,
                    senha: password,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create user");
            }

            alert("Account created successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error creating user: ", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signUp();
    };

    return (
        <main className='register'>
            <h1 className='registerTitle'>Create an account</h1>
            <form className='registerForm' onSubmit={handleSubmit}>
                <label htmlFor='username'>Username</label>
                <input
                    type='text'
                    name='username'
                    id='username'
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor='email'>Email</label>
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
                <button className='registerBtn'>REGISTER</button>
                <p>
                    Already have an account? <Link to='/'>Log in</Link>
                </p>
            </form>
        </main>
    );
};

export default Register;