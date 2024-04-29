import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Nav from "./Nav";

const CreateThread = () => {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const history = useHistory();

    const handleCreateThread = async () => {
        try {
            const response = await fetch("https://projeto-bloco-4f62c-default-rtdb.firebaseio.com/posts.json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Titulo: titulo,
                    Descrição: descricao,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create thread");
            }

            alert("Thread created successfully!");
            history.push("/");
        } catch (error) {
            console.error("Error creating thread:", error);
        }
    };

    return (
        <>
            <Nav />
            <main className="createThread">
                <h2 className="createThreadTitle">Crie um Topico</h2>
                <form className="createThreadForm" onSubmit={(e) => e.preventDefault()}>
                    <div className="createThread__container">
                        <label htmlFor="titulo">Titulo</label>
                        <input
                            type="text"
                            name="titulo"
                            id="titulo"
                            required
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                    </div>
                    <div className="createThread__container">
                        <label htmlFor="descricao">Description</label>
                        <textarea
                            name="descricao"
                            id="descricao"
                            rows="5"
                            required
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="createThread__buttons">
                        <button className="createThreadBtn" onClick={handleCreateThread} type="submit">CREATE THREAD</button>
                        <Link to="/" className="cancelBtn">Cancel</Link>
                    </div>
                </form>
            </main>
        </>
    );
};

export default CreateThread;