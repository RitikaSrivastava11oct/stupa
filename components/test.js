import React, { Component } from 'react';
import { View, Text} from 'react-native';

class test extends Component {

    constructor(props) {
      super(props);
    }

    static navigationOptions = {
        title: 'Test'
    }
  
    render() {
        return(
        <View style={{padding:20}}>
            <Text>Test</Text>
        </View>
        );
    }

}

 export default test;