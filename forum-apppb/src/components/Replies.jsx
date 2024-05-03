import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Replies = () => {
    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState("");
    const { postId } = useParams();

    const addComment = async () => {
        try {
            const response = await fetch(`https://projeto-bloco-4f62c-default-rtdb.firebaseio.com/posts/${postId}/comentarios.json`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    texto: comment,
                    usuario: localStorage.getItem("userId"),
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to add comment");
            }

            fetchComments();
        } catch (error) {
            console.error("Error adding comment: ", error);
        }
    };

    const handleSubmitComment = (e) => {
        e.preventDefault();
        addComment();
        setComment("");
    };

    const fetchComments = async () => {
        try {
            const response = await fetch(`https://projeto-bloco-4f62c-default-rtdb.firebaseio.com/posts/${postId}/comentarios.json`);

            if (!response.ok) {
                throw new Error("Failed to fetch comments");
            }

            const data = await response.json();

            const commentsArray = Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
            }));

            setCommentList(commentsArray);
        } catch (error) {
            console.error("Error fetching comments: ", error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    return (
        <main className='replies'>
            <h1 className='repliesTitle'>Comments</h1>
            <form className='modal__content' onSubmit={handleSubmitComment}>
                <label htmlFor='comment'>Add a Comment</label>
                <textarea
                    rows={5}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    type='text'
                    name='comment'
                    className='modalInput'
                />
                <button className='modalBtn'>Send</button>
            </form>
            <div className='comment__container'>
                {commentList.map((comment) => (
                    <div className='comment__item' key={comment.id}>
                        <p>{comment.texto}</p>
                        <div className='user__container'>
                            <p style={{ opacity: "0.5" }}>by {comment.usuario}</p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Replies;
