import { connect } from 'react-redux';
import GameView from '../../components/post/GameView';

const mapStateToProps = ({ post }) => {
  const { loading, error } = post;

  return { loading, postError: error };
};

export default connect(mapStateToProps)(GameView);
