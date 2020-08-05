import React, { Component } from 'react';
import { Text, View, FlatList,TouchableOpacity,ScrollView,Linking ,Platform ,ToastAndroid ,Picker ,RefreshControl} from 'react-native';
import { Card ,SearchBar,ListItem } from 'react-native-elements';
import { styles} from '../../utils/style';
import { isEmpty } from '../../utils/general';
import { scale, verticalScale} from 'react-native-size-matters';
import {albums} from "../../HeaderLabs";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search : '',
            searchView : false,
            albums : [],
            sortBy:'',
            refreshing : false
        }
    }

     fetchData(){
        try {
            let albumsJson = albums.feed.entry;
            let arr=[];
            for(let item in albumsJson){
                arr.push(albumsJson[item]);
            }
             this.setState({albums: arr}); 
           
        }
        catch (error) {
            console.error(error);
        }
    }

     componentDidMount() {
        this.fetchData();
        
    }


    static navigationOptions = {
        title: 'Header Labs'
        
    }

    updateSearch = value=> { 
        !isEmpty(value.trim())?this.setState({ search: value.trim() ,searchView: true}):this.setState({ search: ''});
    };

    clearSearch = ()=> {
        this.setState({ search: '' ,
            searchView: false});
    };

     GetSortOrder(prop) {  
        return function(a, b) {  
            if(prop=='im:artist'|| prop=='im:price')  {
                if (a[prop].label > b[prop].label) {    
                    return 1;    
                } else if (a[prop].label < b[prop].label) {    
                    return -1;    
                }    
                return 0; 
            }
            if(prop=='im:releaseDate'){
                return new Date(a[prop].attributes.label).getTime() - new Date(b[prop].attributes.label).getTime();
            }
   
        }    
    } 

    sortByAlbum(value){
        let array=this.state.albums;
        let sortValue='';
        if(value=='Price')
            sortValue='im:price';
        if(value=='Artist')
            sortValue='im:artist';
        if(value=='Release date')
            sortValue='im:releaseDate';
        array.sort(this.GetSortOrder(sortValue));
        this.setState({ albums:array});
    }

    render() {
        const { navigate } = this.props.navigation;

        const renderAlbums = ({ item,index }) => {

            return (
                <View >
                    <TouchableOpacity onPress={() => navigate('AlbumDetail', { album: (!isEmpty(item)?item:'') })}>
                        <Card>
                            <View style={{ width:'100%'}}>
                                <View style={{ flexDirection:'column'}}>
                                    <Text style={{ fontFamily:'serif',fontWeight:'bold',marginTop:verticalScale(5)}}>
                                            {(!isEmpty(item['im:artist'].label)?item['im:artist'].label:'')} 
                                    </Text>
                                    <Text >
                                        {(!isEmpty(item['im:name'].label)?item['im:name'].label:'')}
                                    </Text>
                                    <Text >
                                        {(!isEmpty(item['im:releaseDate'].attributes.label)?item['im:releaseDate'].attributes.label:'')}
                                    </Text>
                                    <Text >
                                        {(!isEmpty(item['im:price'].label)?item['im:price'].label:'')}
                                    </Text>

                                </View>
                            </View>
                        </Card>
                    </TouchableOpacity>
                </View>
            );
        }

        const searchResult = ({item, index}) => {
            if(this.state.search){
                    return (
                        <ListItem
                            key={index}
                            title={(!isEmpty(item.title.label)?item.title.label:'')}
                            style={{ color : '#ffffff'}}
                            subtitle={(!isEmpty(item['im:name'].label)?item['im:name'].label:'')}
                            onPress={() => navigate('AlbumDetail', { album: (!isEmpty(item)?item:'') })}
                            />
                    );
            }
        };


        const emptySearchFlatList=()=>{
            this.setState({ searchView : false});
            ToastAndroid.show('No data found!',2000);
            return(
                <View></View>
            );
        }

        return (
            <View style={styles.MainContainer}>
                <SearchBar
                    containerStyle={{ backgroundColor: '#FFFFFF' }}
                    placeholder="Search..."
                    cancelIcon
                    platform ={Platform.OS === 'ios'? "ios":"android"}
                    showCancel ={true}
                    lightTheme={true}
                    onClear ={()=>{this.clearSearch()}}
                    onChangeText={(value)=>{this.updateSearch(value)}}
                    value={this.state.search}
                    onEndEditing={()=>this.state.search.trim()=='' ||this.state.search.trim()==null ?this.clearSearch():''}
                    
                />
                {this.state.searchView ? 
                (<View style={{ paddingBottom : scale(10)}}>
                    <ScrollView >
                        <View style = {{ width : '100%'}}>
                            <FlatList 
                                data={this.state.albums.filter(album => ( ( (album.title.label.trim().toLowerCase()).includes(this.state.search.trim().toLowerCase())) || (album['im:name'].label.trim().toLowerCase().includes(this.state.search.trim().toLowerCase()))  ))}
                                renderItem={searchResult}
                                keyExtractor={item => item.id?item.id.toString():''}
                                ListEmptyComponent={emptySearchFlatList}
                            />
                        </View>
                    </ScrollView>
                </View>): 
                (<ScrollView 
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={()=> {
                                    this.setState({refreshing: true});
                                    this.fetchData()}}
                            />
                        }>
                        <View style = {{width:scale(160) ,paddingTop: verticalScale(10)}}> 
                            <Picker
                                selectedValue={this.state.sortBy}
                                onValueChange={(itemValue, _) => {this.setState({sortBy:itemValue});this.sortByAlbum(itemValue)}}>
                                    <Picker.Item label='Price' value='Price'/>
                                    <Picker.Item label='Release date' value='Release date'/>
                                    <Picker.Item label='Artist' value='Artist'/>
                            </Picker>
                        </View>

                        {isEmpty(this.state.albums)?null:
                        (
                            <View style={{ width:'100%'}} >
                                <ScrollView  automaticallyAdjustContentInsets={false}>
                                    <View style={{flex: 1,flexWrap: 'wrap',backgroundColor: '#ecf0f1',paddingRight : scale(10)
                                    }}>
                                        <FlatList
                                            data={this.state.albums}
                                            renderItem={renderAlbums}
                                            keyExtractor={item => {item._id!=null && item._id!=''?item._id.toString():''}}
                                        />
                                    </View>
                                </ScrollView>
                            </View>
                        )}
                    </ScrollView>)}
                    
            </View>
        );
    }
}

export default Home;