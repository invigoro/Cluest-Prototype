/*import { Facebook } from 'expo';
import firebase from './fbase';

export default class AuthService{

    public static getAuthStateChanged (){
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log("We are authenticated now!");
      }
      return user;
      // Do other things
    });
      }
  
    function getUser() {
        return firebase.User;
    }
    
    function storeHighScore(user, score) {
      if (user != null) {
        firebase.database().ref('users/' + user.uid).set({
          highscore: score
        });
      }
    }
    
    async function logIn() {
      try {
        const {
          type,
          token,
          expires,
          permissions,
          declinedPermissions,
        } = await Expo.Facebook.logInWithReadPermissionsAsync('729498537445728', {
          permissions: ['public_profile'],
        });
        if (type === 'success') {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
          const credential = firebase.auth.FacebookAuthProvider.credential(token);
    
          // Sign in with credential from the Facebook user.
          firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
            // Handle Errors here.
          });
        } else {
          // type === 'cancel'
        }
      } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
      }
    }
}*/