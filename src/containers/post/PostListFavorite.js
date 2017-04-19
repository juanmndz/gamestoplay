import _ from 'lodash';
import { connect } from 'react-redux';
import PostListFavorite from '../../components/post/PostListFavorite';
import { getPostListFavorite } from '../../modules/post';

const mapStateToProps = ({ post }) => {
  const { loading, error } = post;
  const fav = _.map(post.fav, (val, uid) => ({ ...val, uid }));

  return { loading, postError: error, fav };
};

export default connect(mapStateToProps, { getPostListFavorite })(PostListFavorite);
