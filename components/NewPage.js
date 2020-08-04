import React, { Component } from 'react';
import { View, Text} from 'react-native';

class NewPage extends Component {

    constructor(props) {
      super(props);
    }

    static navigationOptions = {
        title: 'New Page'
    }
  
    render() {
        return(
        <View style={{padding:20}}>
            <Text>New Page</Text>
        </View>
        );
    }

}

 export default NewPage;