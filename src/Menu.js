import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux'



import { connect } from 'react-redux';
const defaultProps = {
  user: null,
};
 class Menu extends Component {

   handlePressLogin = () => {
     this.props.closeDrawer()
     Actions.signin()
   }
   handlePressRegister = () => {
     this.props.closeDrawer()
     Actions.signup()
   }
   handlePressLogout = () => {
     this.props.closeDrawer()
     this.props.signout()
   }

   // Handle Posts

   handlePressGameList = () => {
     this.props.closeDrawer()
     Actions.postList()
   }
   handlePressGameFavorites = () => {
     this.props.closeDrawer()
     Actions.postListFavorite()
   }
   handlePressGameListEdit = () => {
     this.props.closeDrawer()
     Actions.postListEdit()
   }
   handlePressAddGame = () => {
     this.props.closeDrawer()
     Actions.postCreate()
   }
   handlePressHomePage = () => {
     this.props.closeDrawer()
     Actions.homePage()
   }
   handlePressPublicLatest = () => {
     this.props.closeDrawer()
     Actions.postListPubliLatest()
   }


  render() {
    let {closeDrawer, signout} = this.props
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.controlText}>Menu</Text>
        { this.props.user &&
         (
               <Button
                 onPress={this.handlePressHomePage}
                 title="Game Portal"
                 color="#841584"
                 accessibilityLabel="Game Portal"
               />
       )}

                { this.props.user &&
                 (
                       <Button
                         onPress={this.handlePressPublicLatest}
                         title="Featured Games"
                         color="#6495ed"
                         accessibilityLabel="Featured Games"
                       />
               )}


         { this.props.user &&
          (
            <Button
              onPress={this.handlePressGameList}
              title="All My Games"
              color="#000080"
              accessibilityLabel="All My Games"
            />

        )}
         { this.props.user &&
          (
            <Button
              onPress={this.handlePressGameFavorites}
              title="My Favorites"
              color="#66cdaa"
              accessibilityLabel="My Favorites"
            />

        )}
         { this.props.user &&
          (
            <Button
              onPress={this.handlePressAddGame}
              title="Add A Game"
              color="#b8860b"
              accessibilityLabel="Add A Game"
            />

        )}
        { this.props.user &&
         (
           <Button
             onPress={this.handlePressGameListEdit}
             title="Edit My Games"
             color="#1e90ff"
             accessibilityLabel="Edit My Games"
           />
       )}

         { this.props.user &&
          (
            <Button
              onPress={this.handlePressLogout}
              title="Sign Out"
              color="#800000"
              accessibilityLabel="Sign Out"
            />

        )}

        { !this.props.user &&
         (
           <Button
             onPress={this.handlePressLogin}
             title="Login"
             color="#9370db"
             accessibilityLabel="Login"
           />

       )}
        { !this.props.user &&
         (
           <Button
             onPress={this.handlePressRegister}
             title="Register"
             color="#5f9ea0"
             accessibilityLabel="Register"
           />
       )}





</ScrollView>
    )
  }
  }

  Menu.defaultProps = defaultProps;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    controlText: {
    },
    button: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'black',
      padding: 10,
    }
  })

  const mapStateToProps = ({ auth }) => ({ user: auth.user });
  export default connect(mapStateToProps)(Menu);
