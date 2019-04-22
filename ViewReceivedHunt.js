import {StyleSheet,
    Text,
    View,
    List,
    FlatList,
    Alert,
    Image,
    TouchableOpacity,
    TextInput,} from 'react-native';
import React, { Component } from "react";
import styles from './styles';
import firebase from './fbase';
import NavigationService from './NavigationService';
var database = firebase.database();

function handleSubmit(info) {
  if(info.hunt.progress < 0) {
    database.ref('received/' + info.user.uid + '/' + info.hunt.id + '/progress').set(0);
    Alert.alert("Hunt begun!", "The first clue for this hunt is available in the list at the top of the screen.")
  }
  NavigationService.navigateTo('TreasureHuntMode')
}
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
    renderRow ( {item} ) {
      return (
          <ListItem
          title={item.name}
          subtitle={item.descript}
          onPress={() => handleSubmit(item)}
          />
      )
    }
    render()
    {
        const hunt = this.props.navigation.getParam('hunt', 'no hunt');
        var pastClues = []
        for(var i = hunt.progress - 1; i >= 0; i--) {
          pastClues.push(hunt[i])
        }
        return (
            <View style={styles.forms}>
              <Image
        style={{width: 50, height: 50, borderRadius: 25}}
        source={{uri: hunt.photo}}
        />
                <Text style={styles.header}>{hunt.title}</Text>
                <Text style={styles.subtitle}>{hunt.author}</Text>
                <Text style={styles.descript}>{hunt.descript}</Text>
                <Text style={styles.descript}>Next Clue: {hunt.progress >=0 ? hunt[hunt.progress].descript : 'Start this hunt to find out!'}</Text>                
                <TouchableOpacity style={styles.opacity}><Text style={styles.submit} onPress={() => handleSubmit(this.state)}>{ hunt.progress >= 0 ? 'Continue Hunt!' : 'Begin Hunt!'}</Text></TouchableOpacity>
                { hunt.progress > 0 ? <View><Text style={styles.subtitle}>Past Clues</Text>
                <List>
                  <FlatList
                    data={pastClues}
                    renderItem={this.renderRow}
                  />
                </List></View> 
                : null}
                <TouchableOpacity onPress={()=> handleRemove(this.state)} style={styles.deleteop}><Image style={styles.deleteim} source={require('./assets/trashbutton.png')}/></TouchableOpacity>
            </View>
        )
    }
  }