import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import PostsList from "./PostsList";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("https://projeto-bloco-4f62c-default-rtdb.firebaseio.com/posts.json");

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();

      const postsArray = Object.values(data).map(post => ({
        Titulo: post.Titulo,
        Descricao: post.Descricao
      }));

      setPosts(postsArray);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <>
      <Nav />
      <main className="home">
        <h2 className="homeTitle">Seus Tópicos</h2>
        <PostsList posts={posts} />
        <Link
          to="/create-thread"
          className="createThreadBtn"
        >
          Crie um Tópico
        </Link>
      </main>
    </>
  );
};

export default Home;