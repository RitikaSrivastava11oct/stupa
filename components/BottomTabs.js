import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Icon } from 'react-native-elements';
import Home from './Home/Home';
import NewPage from './NewPage';


export default createBottomTabNavigator({
    Home: { screen: Home },
    NewPage: { screen: NewPage }
  });
  

// const GreenTab = createStackNavigator({
//     Green: Home
// });

// const RedTab = createStackNavigator({
//     Red: NewPage
// });

// const Tabs = createBottomTabNavigator({
//     Green: Home,
//     Red: NewPage
// }, {
//     defaultNavigationOptions: ({ navigation }) => ({
//         tabBarIcon: () => {
//             const { routeName } = navigation.state;
//             let tabName;
//             tabName = routeName === 'Green' ? 'home' : 'grid';

//             return <Icon name={tabName} size={20} />
//         }
//     })
// });

// export default createAppContainer(Tabs);