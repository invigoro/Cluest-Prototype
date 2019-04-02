import React, { Component } from "react";
import {AppRegistry, FlatList,
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity,
    Dimensions,
  } from "react-native";
  import {List, ListItem} from 'react-native-elements';
  import { withNavigation } from 'react-navigation';
  import NavigationService from './NavigationService';
  import firebase from './fbase';
  import { Constants, MapView, Location, Permissions } from 'expo';

export default class TreasureHuntMode extends Component {
    state = {
        activeHunts: null,
        openClues: null,
        user: firebase.User,
        latitude: "x",
        longitude: "x",
        mapRegion: null,
        hasLocationPermissions: false,
        locationResult: null
    }
    componentDidMount() {
        this._getLocationAsync();
        const { navigation } = this.props;
        //console.log(navigation);
        var activeHunts = navigation.getParam('data', 'no data');
        console.log(activeHunts);
        this.setState({activeHunts});
        this.setOpenClues(activeHunts);
        firebase.auth().onAuthStateChanged(user => {this.setState({user}); 
        });
    }

    setOpenClues = (hunts) => {
        //console.log(hunts);
        var openClues = []
        for(var i = 0; i < hunts.length; i++) {
            let prog = hunts[i].progress;
            if(prog != hunts[i].end){
                openClues.push(hunts[i][prog]);
            }
        }
        this.setState({openClues});
    }

    _handleMapRegionChange = mapRegion => {
        //console.log(mapRegion);
        this.setState({ mapRegion });
      };

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            locationResult: 'Permission to access location was denied',
          });
        } else {
          this.setState({ hasLocationPermissions: true });
        }
     
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ locationResult: JSON.stringify(location) });
        
        // Center the map on the location we just fetched.
         this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
       };
     

    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition( //location is the result of this call as a JSON array
          location => {
            const latitude = location.coords.latitude;
            const longitude = location.coords.longitude;
    
            this.setState({ latitude });
            this.setState({ longitude });
          },
          error => Alert.alert(error.message),  //only if there is an error
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      };
    
    _handleUserLocationChange = location => {
        this.setState({mapRegion: { latitude: location.nativeEvent.coordinate.latitude, longitude: location.nativeEvent.coordinate.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
    }
    renderRow ( {item} ) {
      var progress = item.progress;
      //console.log(item);
      //console.log(progress);
      var loc = item[progress];
      //console.log(loc);
      return (
          <ListItem
          style={{flex: 1}}
            title={item.title}
            roundAvatar
          title={item.title}
          subtitle={'"' + loc.descript + '"'}
          avatar={{ uri: item.photo }}
          //onPress={() => NavigationService.navigate('SavedLocation', { id: item.id, name: item.name, descript: item.descript, latitude: item.latitude, longitude: item.longitude })}
          />
      )
    }

    render () {
        return (
            <View style={styles.container}>
        
        {
          this.state.locationResult === null ?
          <Text>Finding your current location...</Text> :
          this.state.hasLocationPermissions === false ?
            <Text>Location permissions are not granted.</Text> :
            this.state.mapRegion === null ?
            <Text>Map region doesn't exist.</Text> : 
            <View>
            <FlatList
              style={{flex: 0.1}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={this.state.activeHunts}
              renderItem={this.renderRow}

            />
            <MapView
              style={{alignSelf: 'stretch', height: 400 }}
              region={this.state.mapRegion}
                //onRegionChange={this._handleMapRegionChange}
              minZoomLevel={17.5}
              maxZoomLevel={17.5}
              showsUserLocation={true}
              followsUserLocation={true}
              onUserLocationChange={this._handleUserLocationChange}
              zoomEnabled={false}
              scrollEnbabled={false}
              pitchEnabled={false}
              zoomTapEnabled={false}
              showsCompass={true}
              rotateEnabled={true}

            />
            </View>
        }
        
      </View>
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});