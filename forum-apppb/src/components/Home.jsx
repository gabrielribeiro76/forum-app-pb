import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";

const Home = () => {
    const [userPosts, setUserPosts] = useState([]);
    
    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await fetch("https://projeto-bloco-4f62c-default-rtdb.firebaseio.com/posts.json");
                
                if (!response.ok) {
                    throw new Error("Failed to fetch user posts");
                }
                
                const data = await response.json();
                const userPosts = Object.values(data.posts).filter(post => post.Usuario === localStorage.getItem("_id"));
                setUserPosts(userPosts);
            } catch (error) {
                console.error("Error fetching user posts:", error);
            }
        };

        fetchUserPosts();
    }, []);

    return (
        <>
            <Nav />
            <main className="home">
                <h2 className="homeTitle">Seus Tópicos</h2>
                <div className="thread__container">
                    {userPosts.map((post, index) => (
                        <div className="thread__item" key={index}>
                            <p>Title: {post.Titulo}</p>
                            <p>Description: {post.descricao}</p>
                        </div>
                    ))}
                </div>
                <Link to="/create-thread" className="createThreadBtn">Crie um Tópico</Link>
            </main>
        </>
    );
};

export default Home;