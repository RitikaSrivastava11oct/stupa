import React, { Component } from 'react';
import { Text, View, FlatList,ScrollView ,Platform ,ToastAndroid ,RefreshControl} from 'react-native';
import { Loading } from '../LoadingComponent';
import { isEmpty} from '../../utils/general';
import { home } from './homeApi';
import { scale } from 'react-native-size-matters';
import { styles } from '../../utils/style';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : true,
            users: '',
            refreshing: false
        }
    }
    componentWillReceiveProps(nextProps){
        console.log('nextProps',nextProps);
    }

    async fetchData(){
        try {
            let data = await home.getUsers();
            if (data.result) {
                this.setState({users: data.results,
                                loading : false, refreshing : false});
            }   
        }
        catch (error) {
            console.error(error);
        }
    }


    async componentDidMount() {
        this.fetchData();
    }
    
    static navigationOptions = {
        title: 'Home'
    }

    render(){
        console.log('render');
        const renderUsers=({ item, index })=>{
            return(
                <View style={{ padding :10}}>
                    <View style={{ flexDirection :'column'}}>
                        <View style={{ flexDirection :'row'}}>
                            <Text style={styles.homeLabel}> Name : </Text>
                            <Text  style={styles.homeText}>
                                {(!isEmpty(item.Name)?item.Name:'')}
                            </Text>
                        </View> 
                        <View style={{ flexDirection :'row'}}>
                            <Text style={styles.homeLabel}> Contact No : </Text>
                            <Text style={styles.homeText}>
                                {(!isEmpty(item.contactNo)?item.contactNo:'')}
                            </Text>
                        </View> 
                        <View style={{ flexDirection :'row'}}>
                            <Text style={styles.homeLabel}> Email ID : </Text>
                            <Text style={styles.homeText}>
                                {(!isEmpty(item.emailId)?item.emailId:'')}
                            </Text>
                        </View> 
                        <View style={{ flexDirection :'row'}}>
                            <Text style={styles.homeLabel}> City : </Text>
                            <Text style={styles.homeText}>
                                {(!isEmpty(item.city)?item.city:'')}
                            </Text>
                        </View>      
                        <View style={{ flexDirection :'row'}}>
                            <Text style={styles.homeLabel}> Gender : </Text>
                            <Text style={styles.homeText}>
                                {(!isEmpty(item.gender)?item.gender:'')}
                            </Text>
                        </View>             
                    </View>
                </View>
            );
        };

        return(
        this.state.loading?<Loading/>:
           (
               <ScrollView style={{ height : '100%' , flex: 1}} contentContainerStyle={{ flexGrow :1}}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={()=> {
                                this.setState({refreshing: true});
                                this.fetchData()}}
                        />
                    }
               >

                <View style={styles.homeFlatlist}>
                    <FlatList 
                        data={this.state.users}
                        renderItem={renderUsers}
                        keyExtractor={item => !isEmpty(item.id)?item.id.toString():''}
                    />
                </View>
            </ScrollView>
            )
        )

    }
}

export default Home;