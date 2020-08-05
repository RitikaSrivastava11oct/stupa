import React from 'react';
import { View,Image,Text, TouchableOpacity }from 'react-native';
import { Icon } from 'react-native-elements';
import { scale, verticalScale ,ScaledSheet } from 'react-native-size-matters';

 function Header (props){
    const { navigate } = props.navigation;

    return(

      <View style={{ marginLeft : scale(7) ,flexDirection: "row", justifyContent: "space-evenly",width: scale(40)}}>

        <Icon name="menu" size={scale(28)} 
              color= 'white'
              onPress={ () => props.navigation.toggleDrawer() } />  
      </View> 
    );
}

export default Header;