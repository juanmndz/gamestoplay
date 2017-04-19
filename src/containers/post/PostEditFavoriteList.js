import _ from 'lodash';
import { connect } from 'react-redux';
import PostEditFavoriteList from '../../components/post/PostEditFavoriteList';
import { getPostListFavorite } from '../../modules/post';

const mapStateToProps = ({ post }) => {
  const { loading, error } = post;
  const fav = _.map(post.fav, (val, uid) => ({ ...val, uid }));

  return { loading, postError: error, fav };
};

export default connect(mapStateToProps, { getPostListFavorite })(PostEditFavoriteList);
