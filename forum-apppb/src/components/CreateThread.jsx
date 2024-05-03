import { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";

const CreateThread = () => {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");

    const handleCreateThread = async () => {
        try {
            const response = await fetch("https://projeto-bloco-4f62c-default-rtdb.firebaseio.com/posts.json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Titulo: titulo,
                    Descricao: descricao,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create thread");
            }

            alert("Thread created successfully!");
        } catch (error) {
            console.error("Error creating thread:", error);
        }
    };

    return (
        <>
            <Nav />
            <main className="createThread">
                <h2 className="createThreadTitle">Crie um Tópico</h2>
                <form className="createThreadForm" onSubmit={(e) => e.preventDefault()}>
                    <div className="createThread__container">
                        <label htmlFor="titulo">Título</label>
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
                        <label htmlFor="descricao">Descrição</label>
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
                        <Link to={`/dashboard?titulo=${titulo}&descricao=${descricao}`} className="createThreadBtn" onClick={handleCreateThread}>CREATE THREAD</Link>
                        <Link to="/" className="cancelBtn">Cancel</Link>
                    </div>
                </form>
            </main>
        </>
    );
};

export default CreateThread;