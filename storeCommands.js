// Define action types
export const actions = {
    UPDATELOCATION: 'UPDATELOCATION',
    ADDLOCATION: 'ADDLOCATION',
}

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

export const reducer = (state, action) => {
    //const {current} = state;
    const {type, payload} = action;

    switch (type) {
        case actions.UPDATELOCATION:
            this.findCoordinates();
            return state;
        default:
            break;
    }
    return state;
}

export const initialState = 
{
    username: 'bob',
    latitude: '',
    longitude: '',
    locations: [{}],
    hunts: [{}],
    friends: [{}],
    games: [{}],
}