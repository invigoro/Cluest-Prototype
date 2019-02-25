import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function navigateTo(routeName) {
    _navigator.dispatch(
        NavigationActions.navigate({
          routeName,
        })
      );
}

function reset() {
  _navigator.dispatch(
    StackActions.reset({ index: 0, key: null, actions: [NavigationActions.navigate({ routeName: 'Loading'})]})
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  navigateTo,
  setTopLevelNavigator,
  reset,
};