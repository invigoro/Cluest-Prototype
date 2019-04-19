import {StyleSheet,
    Text,
    View,
    Alert,
    Image,
    TouchableOpacity,
    TextInput,} from 'react-native';
import React, { Component } from "react";
import styles from './styles';
import firebase from './fbase';
import NavigationService from './NavigationService';
var database = firebase.database();

function handleRemove(info) {
    var path = 'received/' + info.user.uid + '/' + info.hunt.id;
    console.log(path);
    NavigationService.navigate('DeleteScreen', {path: path});
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
        firebase.auth().onAuthStateChanged(user => {this.setState({user})});
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
            <View style={styles.forms}>
              <Image
        style={{width: 50, height: 50, borderRadius: 25}}
        source={{uri: hunt.photo}}
        />
                <Text style={styles.header}>{hunt.title}</Text>
                <Text style={styles.subtitle}>{hunt.author}</Text>
                <Text style={styles.descript}>{hunt.descript}</Text>
                <Text style={styles.descript}>Next Clue: {hunt[hunt.progress].descript}</Text>                
                <TouchableOpacity style={styles.opacity}><Text style={styles.submit} onPress={() => NavigationService.navigateTo('TreasureHuntMode')}>Continue Hunt!</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=> handleRemove(this.state)} style={styles.deleteop}><Image style={styles.deleteim} source={require('./assets/trashbutton.png')}/></TouchableOpacity>
            </View>
        )
    }
  }