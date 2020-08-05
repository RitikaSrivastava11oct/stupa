import React, { Component } from 'react';
import { View, Platform, Image, ScrollView, Text, AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Home from './Home/Home';
import AlbumDetail from './Home/AlbumDetail';
import NewPage from "./NewPage";
import { styles, themeColor, drawerBackgroundColor } from '../utils/style';
import Header from './Header';


class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };

  }

 

  render() {

    const HomeNavigator = createStackNavigator({
      Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
          headerLeft: () => (<Header navigation={navigation} />)
        })
      },
      AlbumDetail: { screen: AlbumDetail }
    },
      {
        initialRouteName: 'Home',
        defaultNavigationOptions: ({ navigation }) => ({
          headerStyle: {
            backgroundColor: themeColor
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: "#fff"
          }
        })
      },
    );

    const NewPageNavigator = createStackNavigator({
      NewPage: { screen: NewPage }
    },
      {
        initialRouteName: 'NewPage',
        defaultNavigationOptions: ({ navigation }) => ({
          headerStyle: {
            backgroundColor: themeColor
          },
          headerTintColor: '#fff',
          headerTitleStyle: {

            color: "#fff"
          }
        })
      }
    );
 

    const MainNavigator = createDrawerNavigator({
      'Home':
      {
        screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: <Text style={styles.drawerLabel}>Home</Text>,
          drawerIcon: () => (
            <Icon
              name='home'
              type='font-awesome'
              size={24}
              iconStyle={{ color: '#654321' }}
            />
          )
        }
      },
      'New Page':
      {
        screen: NewPageNavigator,
        navigationOptions: {
          title: 'New Page',
          drawerLabel: <Text style={styles.drawerLabel}>New Page</Text>,
          drawerIcon: () => (
            <Icon
              name='list'
              type='font-awesome'
              size={24}
              iconStyle={{ color: '#654321' }}
            />
          )
        }
      }
    }, {
      contentComponent: (props) => (
       <SafeAreaView style={{ flex : 1 }}>
         <View style={styles.mainContent}>
           <View>
            <Image source={require('./images/welcome.jpg')} 
                  style={styles.mainImage} />
           </View>
           <View style ={styles.titleView}>
              <Text style={styles.titleText}>
                  Header Labs
              </Text>
            </View>
          </View>

          <ScrollView>
            <DrawerItems {...props} />
          </ScrollView>
        </SafeAreaView>
      )
    }, {
      drawerBackgroundColor: drawerBackgroundColor,
      contentOptions: {
        activeTintColor: '#654321',
        inactiveTintColor: '#654321'
      },
      initialRouteName: 'Home',
    });
    const AppCategoryNavigator = createAppContainer(MainNavigator);

    return (
      <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : 1 }}>
        <AppCategoryNavigator />
      </View >
    );
  }
}

export default Main;
