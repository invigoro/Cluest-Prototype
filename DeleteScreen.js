import React, { Component } from "react";
import {AppRegistry, FlatList,
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity
  } from "react-native";
  import styles from './styles';
  import {List, ListItem} from 'react-native-elements';
  import { withNavigation } from 'react-navigation';
  import NavigationService from './NavigationService';
  import firebase from './fbase';

  function handleRemove(path) {
    var aRef = firebase.database().ref(path);
    aRef.remove()
      .then(function() {
        console.log("Remove succeeded. path: " + path);
        Alert.alert("Success", "Item deleted.");
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message);
        Alert.alert("Failed", "Remove failed: " + error.message);
      });    
      NavigationService.goBackTwice();
  }

  export default class DeleteScreen extends Component {
        state = {
            path: '...',
            loading: true,
        }
        componentDidMount(){
            const { navigation } = this.props;
            var path = navigation.state.params.path;
            console.log(path);
            firebase.auth().onAuthStateChanged(user => {this.setState({user}); this.getHunts(user)});
            this.setState({path: path});
            this.setState({loading: false});
            console.log("state" + this.state.path);
        }
        render() {
            const loading = this.state.loading;
            const path = this.state.path;
            return(
                <View style={styles.forms}>
                    { loading == false ? 
                    <View>
                        <Text style={styles.header}>Delete for good?</Text>
                        <TouchableOpacity style={styles.opacity}>
                            <Text style={styles.submit} onPress={()=>handleRemove(path)}>Delete</Text>
                        </TouchableOpacity>
                    </View> :
                    <Text>Loading...</Text>
                    }
                </View>
            );
        }
  }