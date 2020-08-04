import React from 'react';
import { Button, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator} from '@react-navigation/stack';
// import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();
function HomeScreen() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
     let iconName;
     if (route.name === 'Home') {
        iconName = focused
        ? 'home'
        : 'home';
      } else if (route.name === 'New Page') {
        iconName = focused
        ? 'list'
        : 'list';
      }
  return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      }}
    >
        <Tab.Screen name="Home" component={TabAScreen} />
        <Tab.Screen name="New Page" component={NewPageScreen} />
    </Tab.Navigator>
  );
}
function NewPageScreen({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="New Page" component={TabBDetailsScreen} />
    </Stack.Navigator>

  );
}
const Stack = createStackNavigator();
function TabAScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={TabADetailsScreen} />
    </Stack.Navigator>
  );
}
function TabADetailsScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
      <Text>
        Welcome to Home page!
      </Text>
    </View>
  );
}
function TabBDetailsScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Welcome to New page!</Text>
    </View>
  );
}


const Drawer = createDrawerNavigator();
function Main() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="New Page" component={NewPageScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}


export default Main;
