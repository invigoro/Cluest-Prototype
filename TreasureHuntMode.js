//GAME MODE FOR PLAYING TREASURE HUNTS
//REQUIRES MAPS AND LOCATION
//REQUIRES FIREBASE INFO ON RECEIVED HUNTS

//IMPORTS
import React, { Component } from "react";
import {
  AppRegistry, FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { List, ListItem } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import NavigationService from './NavigationService';
import firebase from './fbase';
import { Constants, MapView, Location, Permissions, Pedometer } from 'expo';

//convert degrees to radians
function toRadians(angle) {
  return angle * (Math.PI / 180);
}



var database = firebase.database();


export default class TreasureHuntMode extends Component {
  //initialize state variables
  state = {
    activeHunts: null,
    openClues: null,
    user: firebase.User,
    latitude: "x",
    longitude: "x",
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0
  }
  //when component mounts, get location, subscribe to pedometer, retreive info from firebase
  componentDidMount() {
    this._getLocationAsync();
    this._subscribe();
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user }); this.getHunts(user); this.getPastStepCount(user);
    });
  }
  componentWillUnmount() {
    //this._unsubscribe();
    //this caused an issue w/ google... still working on it
  }
  //subscribe to pedometer value changes
  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );

  };
  //unsubscribe to pedometer
  _unsubscribe = () => {
    try {
      this._subscription && this._subscription.remove();
      this._subscription = null;
    }
    catch{ };
  };

  //get only the current clues from open hunts
  setOpenClues = (hunts) => {
    var openClues = []
    for (var i = 0; i < hunts.length; i++) {
      let prog = hunts[i].progress;
      if (prog != hunts[i].end) {
        openClues.push(hunts[i][prog]);
      }
    }
    this.setState({ openClues });
  }
  //retreive value from firebase for steps
  getPastStepCount(user) {
    database.ref('users/' + user.uid + '/').once('value', (snapshot) => {
      var steps = snapshot.val().steps;
      this.setState({ pastStepCount: steps });
    });
  }

  //get all open hunts from firebase
  getHunts(user) {
    try {
      database.ref('received/' + user.uid).on('value', (snapshot) => {
        var h = snapshot.val();
        huntkeys = Object.keys(h);
        for (var i = 0; i < huntkeys.length; i++) {
          var key = huntkeys[i];
          h[key].id = key;
          h[key].index = i;
        }
        hunts = Object.values(h);
        var activeHunts = hunts.filter(item => item.progress <= item.end && item.progress >= 0);
        this.setState({ activeHunts });
      });
    } catch{ }
  }

  //when user moves map
  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  //retreive user location in latitude and longitude
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
    this.setState({ mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } });
  };

  //retreive user location
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

  //compare the distance between current location and location of each open clue
  checkLocations = () => {
    const tol = 40; //tolerance for proximity to clue (in feet)
    var hunts = this.state.activeHunts;
    console.log(hunts)
    for (var i = 0; i < hunts.length; i++) {
      var prog = hunts[i].progress;
      var clue = hunts[i][prog];
      console.log("Clue " + i + " latitude: " + clue.latitude);
      console.log("Clue " + i + " longitude: " + clue.longitude);
      lat1 = clue.latitude;
      lon1 = clue.longitude;
      lat2 = this.state.mapRegion.latitude;
      lon2 = this.state.mapRegion.longitude;
      var R = 6371e3; // metres
      var φ1 = toRadians(lat1);
      var φ2 = toRadians(lat2);
      var Δφ = toRadians(lat2 - lat1);
      var Δλ = toRadians(lon2 - lon1);

      var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      var d = R * c;
      console.log("Clue " + i + " dist: " + d);
      if (d < tol) { //within proximity of clue
        hunts[i].progress++;
        prog++;
        database.ref("received/" + this.state.user.uid + "/" + hunts[i].id + "/progress").set(prog);
        if (prog > hunts[i].end) {  //hunt is done
          hunts.splice(i, 1);
          Alert.alert("Hunt completed!", `You completed ${hunts[i].author}'s hunt '${hunts[i].title}'. Congratulations!`);
        }
        else {
          Alert.alert("You found a clue!", `"${hunts[i][prog].descript}"`);
        }
        //update hunts
        var activeHunts = hunts
        this.setState({ activeHunts })
      }
    }
  }

  //call location function when user moves
  _handleUserLocationChange = location => {
    this.setState({ mapRegion: { latitude: location.nativeEvent.coordinate.latitude, longitude: location.nativeEvent.coordinate.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } });
    this.checkLocations();
    database.ref('users/' + this.state.user.uid + '/steps').set(this.state.pastStepCount + this.state.currentStepCount);
  }
  renderRow({ item }) {
    var progress = item.progress;
    var loc = item[progress];
    return (
      <ListItem
        style={{ flex: 1 }}
        title={item.title}
        roundAvatar
        title={item.title}
        subtitle={'"' + loc.descript + '"'}
        avatar={{ uri: item.photo }}
        hideChevron={true}
      />
    )
  }

  render() {
    console.log("Past steps: " + this.state.pastStepCount);
    console.log("Current steps: " + this.state.currentStepCount);
    return (
      <View style={styles.container}>
        <View style={{ height: 100 }}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={this.state.activeHunts}
            renderItem={this.renderRow}

          ></FlatList>

        </View>


        {
          this.state.locationResult === null ?
            <Text>Finding your current location...</Text> :
            this.state.hasLocationPermissions === false ?
              <Text>Location permissions are not granted.</Text> :
              this.state.mapRegion === null ?
                <Text>Map region doesn't exist.</Text> :
                <MapView
                  style={{ alignSelf: 'stretch', height: 400 }}
                  region={this.state.mapRegion}
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

                ></MapView>
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