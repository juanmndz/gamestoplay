import React from 'react';
import firebase from 'firebase';
import Drawer from 'react-native-drawer';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Signin from './containers/auth/Signin';
import Signup from './containers/auth/Signup';
import PostCreate from './containers/post/PostCreate';
import PostAddFavoriteGame from './containers/post/PostAddFavoriteGame';
import PostEdit from './containers/post/PostEdit';
import PostList from './containers/post/PostList';
import PostList2 from './containers/post/PostList2';
import PostListFavorite from './containers/post/PostListFavorite';
import PostEditFavorite from './containers/post/PostEditFavorite';
import PostEditFavoriteList from './containers/post/PostEditFavoriteList';
import PostCreateFavorite from './containers/post/PostCreateFavorite';
import PostListPublic from './containers/post/PostListPublic';
import PostListLatest from './containers/post/PostListLatest';
import PostView from './containers/post/PostView';
import GameView from './containers/post/GameView';
import HomePage from './containers/post/HomePage';
import PostListEdit from './containers/post/PostListEdit';
import requireAuth from './containers/auth/requireAuth';
import requireNotAuth from './containers/auth/requireNotAuth';
import Menu from './Menu';

const RouterComponent = () => (
  <Drawer
     type="displace"
     content={<Menu closeDrawer={ () => this.drawer.close() } signout={() => { firebase.auth().signOut(); Actions.auth();}} />}
     openDrawerOffset={100}
     tweenHandler={Drawer.tweenPresets.parallax}
     tapToClose={true}
     ref={ (ref) => this.drawer = ref}
>

  <Router>
    <Scene key="auth" >
      <Scene key="signin" sceneStyle={{ paddingTop: 65 }} component={requireNotAuth(Signin)} title="Please Sign in" />
      <Scene key="signup" sceneStyle={{ paddingTop: 65 }} component={requireNotAuth(Signup)} title="Please Sign up" />
    </Scene>
    <Scene key="post"
      >
        <Scene
          key="homePage"
          component={requireNotAuth(HomePage)}
          title="Game Portal"
          sceneStyle={{ paddingTop: 65 }}
        />

        <Scene
          key="postListPubliLatest"
          sceneStyle={{ paddingTop: 65 }}
          component={requireNotAuth(PostListLatest)}
          title="Featured Games"
        />

      <Scene
        key="postList"
        sceneStyle={{ paddingTop: 65 }}
        component={requireAuth(PostList)}
        title="My Games"
        onRight={() => Actions.postCreate()}
        rightTitle="Add Game"
      />

      <Scene
        key="postListFavorite"
        sceneStyle={{ paddingTop: 65 }}
        component={requireAuth(PostListFavorite)}
        title="My Favorites"
        onRight={() => Actions.postListFavoriteCreate()}
        rightTitle="Add Category"
      />

      <Scene
        key="postListFavoriteCreate"
        sceneStyle={{ paddingTop: 65 }}
        component={requireAuth(PostCreateFavorite)}
        title="Add A Fav Category"
      />

      <Scene
        key="postView"
        sceneStyle={{ paddingTop: 65 }}
        component={requireNotAuth(PostView)}
        title="Game Details"
      />
      <Scene
        key="gameView"
        component={requireNotAuth(GameView)}
        hideNavBar={false}
        title="The Game"
        onRight={() =>   Actions.refresh({hideNavBar: true})}
        rightTitle="FullScreen-Mode"
      />
      <Scene
        key="postListEdit"
        sceneStyle={{ paddingTop: 65 }}
        component={requireAuth(PostListEdit)}
        title="Edit Games"

      />
      <Scene
        key="postEditFavorite"
        sceneStyle={{ paddingTop: 65 }}
        component={requireAuth(PostEditFavorite)}
      />
      <Scene
        key="postEditFavoriteList"
        sceneStyle={{ paddingTop: 65 }}
        component={requireAuth(PostEditFavoriteList)}
        title="Edit Favorites Category"
      />
      <Scene key="postCreate" sceneStyle={{ paddingTop: 65 }} component={requireAuth(PostCreate)} title="Create Game" />
      <Scene key="postAddFavoriteGame" sceneStyle={{ paddingTop: 65 }} component={requireAuth(PostAddFavoriteGame)} title="Add Game To Favorite" />
      <Scene key="postEdit" sceneStyle={{ paddingTop: 65 }} component={requireAuth(PostEdit)} title="Edit Game" />
      <Scene
        key="postList2"
        sceneStyle={{ paddingTop: 65 }}
        component={requireAuth(PostList2)}
        title="Favorites"
      />
      <Scene
        key="postListPublic"
        sceneStyle={{ paddingTop: 65 }}
        component={requireNotAuth(PostListPublic)}
        title="Games"
      />
    </Scene>
  </Router>
</Drawer>
);

const styles = {
  navigationBarStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
};

export default RouterComponent;
