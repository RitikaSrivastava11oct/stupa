import React, { Component } from 'react';
import { View, Text,Image,Linking} from 'react-native';
import { Card  } from 'react-native-elements';
import { isEmpty } from '../../utils/general';
import { styles} from '../../utils/style';
import { ScrollView } from 'react-native-gesture-handler';

class AlbumDetail extends Component {

    constructor(props) {
      super(props);
      this.state={
          album:this.props.navigation.getParam('album', '')
      }
    }

    static navigationOptions = {
        title: 'Album Details'
    }
  
    render() {
      let item=this.state.album;
        return(
          <ScrollView>
          <Card>
            <View style={{ width:'100%'}}>
                <View style={{flexDirection:'column'}}>

                    <Image
                      resizeMode='contain'
                      source={{ uri:!isEmpty(item['im:image'][0].label)?item['im:image'][0].label:''}}
                      style={styles.albumDetailsImage}
                    />
                    <Text style={styles.artist}>
                        <Text style={{ fontWeight:'bold'}}>Artist: </Text> 
                        {(!isEmpty(item['im:artist'].label)?item['im:artist'].label:'')} 
                    </Text>
                    <Text style={styles.albumDetailsText}>
                        <Text style={{ fontWeight:'bold'}}>Name: </Text>
                        {(!isEmpty(item['im:name'].label)?item['im:name'].label:'')}
                    </Text>
                    <Text style={styles.albumDetailsText} >
                        <Text style={{ fontWeight:'bold'}}>Title : </Text>
                         {(!isEmpty(item.title.label)?item.title.label:'')} 
                    </Text>
                    <Text style={styles.albumDetailsText}>
                        <Text style={{ fontWeight:'bold'}}>Link : </Text>
                        <Text style={styles.link}
                                onPress={() => Linking.openURL(item.link.attributes.href)}>
                          {(!isEmpty(item.link.attributes.href)?item.link.attributes.href:'')} 
                          </Text>
                    </Text>
                    <Text style={styles.albumDetailsText}>
                        <Text style={{ fontWeight:'bold'}}>Release Date : </Text>
                        {(!isEmpty(item['im:releaseDate'].attributes.label)?item['im:releaseDate'].attributes.label:'')}
                    </Text>
                    <Text style={styles.albumDetailsText}>
                        <Text style={{ fontWeight:'bold'}}>Category : </Text>
                        <Text style={styles.link}
                                onPress={() => Linking.openURL(item.category.attributes.scheme)}>
                          {(!isEmpty(item.category.attributes.scheme)?item.category.attributes.scheme:'')}
                          </Text>
                    </Text>

                    <Text style={styles.albumDetailsText}>
                      <Text style={{ fontWeight:'bold'}}>Price : </Text>
                        {(!isEmpty(item['im:price'].label)?item['im:price'].label:'')}
                    </Text>
                    <Text style={styles.albumDetailsText}>
                        <Text style={{ fontWeight:'bold'}}>Rights : </Text>
                        {(!isEmpty(item.rights.label)?item.rights.label:'')}
                    </Text>
                </View>
            </View>
          </Card>
          </ScrollView>
        );
    }

}

 export default AlbumDetail;