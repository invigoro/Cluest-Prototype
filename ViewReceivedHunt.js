import {StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity,
    TextInput,} from 'react-native';
import React, { Component } from "react";
import firebase from './fbase';
import NavigationService from './NavigationService';
var database = firebase.database();

function handleSubmit(hunts) {
    NavigationService.goBack();

  }
export default class ViewReceivedHunt extends Component{
    state = {
    user: firebase.User,
    hunt: {
      title: 'null',
      descript: 'null'
    }
    }
    componentDidMount() {
        const {navigation } = this.props;
        console.log('\nNavigation: \n' + navigation);
        const hunt = navigation.getParam('hunt', 'no hunt');
        console.log("\nHunt: \n" + hunt);
        this.setState({hunt});
    }
    render()
    {
        const hunt = this.props.navigation.getParam('hunt', 'no hunt');
        return (
            <View>
                <Text style={styles.header}>{hunt.title}</Text>
                <TouchableOpacity><Text onPress={() => handleSubmit(this.state)}>Save Location</Text></TouchableOpacity>
            </View>
        )
    }
  }
  
  const styles = StyleSheet.create ({
    header: {
      fontSize: 30,
      textAlign: 'center',
      marginTop: 25,
      marginLeft: 25,
      marginRight: 25,
      marginBottom: 5,
    },
    subtitle: {
      fontSize: 18,
      textAlign: 'center',
      margin: 5
    },
    descript: {
      fontSize: 20,
      margin: 8
    }
  });