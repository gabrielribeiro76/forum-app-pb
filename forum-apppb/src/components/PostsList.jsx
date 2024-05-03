import PropTypes from "prop-types";

const PostsList = ({ posts }) => {
  return (
    <div className="topic__container">
      {posts.map((post, index) => (
        <div className="topic__item" key={index}>
          <p className="topic__title">Título: {post.Titulo}</p>
          <p className="topic__description">Descrição: {post.Descricao}</p>
        </div>
      ))}
    </div>
  );
};

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostsList;