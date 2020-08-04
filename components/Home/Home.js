import React, { Component } from 'react';
import { Text, View,Button} from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  test  from "../test";
import NewPage from '../NewPage';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer} from 'react-navigation';
// import BottomTabs from "../BottomTabs";

class Home extends Component {
    constructor(props) {
        super(props);
    }

    
    static navigationOptions = {
        title: 'Home'
    }

    render(){
        const navigate = this.props.navigation.navigate;
        // const Tab = createBottomTabNavigator();
        const tab=createBottomTabNavigator({
            Home: { screen: Home },
            NewPage: { screen: NewPage }
          });
          

        return(
            <View style={{padding:20}}>
                <Text >Hello World!</Text>
                <View style={{ marginTop:20, width:200}}>
                    <Button
                        title="Go to Another page"
                        onPress={() =>
                            navigate('NewPage', { name: 'Jane' })
                        }
                    />
                </View>
                {createAppContainer(tab)}
                {/* <Tab.Navigator>
                <Tab.Screen name="Home" />
                <Tab.Screen name="Test" component={test} />
                </Tab.Navigator> */}
            </View>
        );

    }
}

export default Home;