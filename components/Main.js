import React, { Component } from 'react';
import { View, Platform ,Image , ScrollView ,Text} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator ,DrawerItems} from 'react-navigation-drawer';
import { createAppContainer , SafeAreaView} from 'react-navigation';
import { Icon } from 'react-native-elements';
import Home from './Home/Home';
import Login from './Users/Login';
import Registration from './Users/Registration';
import { styles,themeColor,drawerBackgroundColor} from '../utils/style';
import { scale, verticalScale } from 'react-native-size-matters';


class Main extends Component {

  constructor(props) {
    super(props);
  }

  componentWillUpdate(){
    console.log('componentWillUpdate  Main***');
}

  render() {

    const HomeNavigator = createStackNavigator({
      Home : { screen : Home }
      },
      {
        initialRouteName : 'Home',
        defaultNavigationOptions : ({navigation}) => ({
          headerStyle : {
            backgroundColor : themeColor
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: "#fff"
          },
          headerLeft: (
            <Icon name="menu" size={scale(28)} 
            color= 'white'
            onPress={ () => navigation.toggleDrawer() } /> 
          )
        })
      }
    );

    const LoginNavigator = createStackNavigator({
        Login : { screen : Login }
        },
        {
          initialRouteName : 'Login',
          defaultNavigationOptions : ({navigation}) => ({
            headerStyle : {
              backgroundColor : themeColor
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              color: "#fff"
            },
            headerLeft: (
              <Icon name="menu" size={scale(28)} 
              color= 'white'
              onPress={ () => navigation.toggleDrawer() } /> 
            )
          })
        }
      );

      const RegistrationNavigator = createStackNavigator({
        Registration : { screen : Registration }
        },
        {
          initialRouteName : 'Registration',
          defaultNavigationOptions : ({navigation}) => ({
            headerStyle : {
              backgroundColor : themeColor
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              color: "#fff"
            },
            headerLeft: (
              <Icon name="menu" size={scale(28)} 
              color= 'white'
              onPress={ () => navigation.toggleDrawer() } /> 
            )
          })
        }
      );

    const MainNavigator = createDrawerNavigator({
      'Home':
      {
        screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ tintColor }) => (
            <Icon
              name='home'
              type='font-awesome'            
              size={24}
              iconStyle={{ color: tintColor }}
            />
          )
        }
      },
      'Registration':
      {
        screen: RegistrationNavigator,
        navigationOptions: {
          title: 'Registration',
          drawerLabel: 'Registration',
          drawerIcon: ({ tintColor }) => (
            <Icon
              name='list'
              type='font-awesome'            
              size={24}
              iconStyle={{ color: tintColor }}
            />
          )
        }
      }
      , 'Login':
      {
        screen: LoginNavigator,
        navigationOptions: {
          title: 'Login',
          drawerLabel: 'Login',
          drawerIcon: ({ tintColor }) => (
            <Icon
              name='shopping-bag'
              type='font-awesome'            
              size={24}
              iconStyle={{ color: tintColor }}
            />
          )
        }
      }
    },  {
        contentComponent: (props) => (
            <SafeAreaView style={{ flex : 1 }}>
              <View style={styles.drawer}>
                <View >
                    <Image source={require('./images/welcome.jpg')} 
                       style={{resizeMode:'contain' , height: verticalScale(55), width: scale(70) }} />
                       
                </View>
                <View >
                    <Text style={styles.logo}>
                       Stupa
                   </Text>
                </View>
              </View>
                
              <ScrollView>
                <DrawerItems {...props} />
              </ScrollView>
            </SafeAreaView>
           )
   },{
       drawerBackgroundColor: drawerBackgroundColor,
      activeTintColor: '#739c1a',
      inactiveTintColor: '#D3D3D3',
      initialRouteName: 'Home'
    });
    const AppCategoryNavigator = createAppContainer(MainNavigator);
    return (
      <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : 1 }}>
        <AppCategoryNavigator />
      </View >
     // )

    );
  }
}

export default Main;
