//DEFINE GLOBAL NAVIGATION FUNCTIONS

import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

//go to specified screen w/ parameters
function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

//go to specified screen w/o parameters
function navigateTo(routeName) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
    })
  );
}

//removes navigation history and takes user back to login screen
function reset() {
  _navigator.dispatch(
    StackActions.reset({ index: 0, key: null, actions: [NavigationActions.navigate({ routeName: 'Login' })] })
  );
}

//go back up one in the stack
function goBack() {
  _navigator.dispatch(
    NavigationActions.back()
  );
}

//go back twice in the stack
function goBackTwice() {
  _navigator.dispatch(
    NavigationActions.back()
  );
  _navigator.dispatch(
    NavigationActions.back()
  );
}

//erase navigation history take take to home
function resetToHome() {
  _navigator.dispatch(
    StackActions.reset({ index: 0, key: null, actions: [NavigationActions.navigate({ routeName: 'Home' })] })
  );
}

// additional navigation functions must be added to the export at the bottom to be used

export default {
  navigate,
  navigateTo,
  setTopLevelNavigator,
  reset,
  goBack,
  resetToHome,
  goBackTwice,
};