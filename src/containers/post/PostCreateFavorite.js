import { connect } from 'react-redux';
import PostCreateFavorite from '../../components/post/PostCreateFavorite';
import { createPostFavorite } from '../../modules/post';

const mapStateToProps = ({ post }) => {
  const { loading, error } = post;

  return { loading, postError: error };
};

export default connect(mapStateToProps, { createPostFavorite })(PostCreateFavorite);
