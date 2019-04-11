import {StyleSheet,
    Text,
    View,
    Alert,
    Image,
    TouchableOpacity,
    TextInput,} from 'react-native';
import React, { Component } from "react";
import firebase from './fbase';
import NavigationService from './NavigationService';
var database = firebase.database();

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
              <Image
        style={{width: 50, height: 50, borderRadius: 25}}
        source={{uri: hunt.photo}}
        />
                <Text style={styles.header}>{hunt.title}</Text>
                <Text style={styles.subtitle}>{hunt.author}</Text>
                <Text style={styles.descript}>{hunt.descript}</Text>
                <Text style={styles.descript}>Next Clue: {hunt[hunt.progress].descript}</Text>                
                <TouchableOpacity style={styles.opacity}><Text style={styles.submit} onPress={() => NavigationService.navigateTo('TreasureHuntMode')}>Continue Hunt!</Text></TouchableOpacity>
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
    },
    
  submit: {
    fontSize: 20,
    margin: 8,
    textAlign: 'center'
  },
  opacity: {
    backgroundColor: 'skyblue',
    borderRadius: 20,
    padding: 10,
  }
  });