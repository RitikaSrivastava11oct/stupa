import React, { Component } from 'react';
import { scale} from 'react-native-size-matters';
import { View, Button, ToastAndroid } from 'react-native';
import { Input} from 'react-native-elements';
import { styles } from "../../utils/style";
import { api } from "./api";

class Login extends Component {

    constructor(props) {
      super(props);
      this.state={
        showPassword: false,
        password :'',
        emailId :''

     }
    }

    static navigationOptions = {
        title: 'Login'
    }

    toggleEyeIcon=()=>{
        this.setState({ showPassword : !this.state.showPassword});
    }
  
    handleLogin = async () => {
        try {
            let payload = {
                emailId : this.state.emailId,
                password:this.state.password 
            };
            let response = await api.handleLogin(payload);
            if(response.result === true){
                ToastAndroid.show(response.message  ,3000); 
            }
            else
                ToastAndroid.show('Couldn\'t login' ,3000); 
        } 
        catch (error) {
            console.log('error while logging ');
        }

    };
  
    render() {
        console.log('login render');
        return(
            <View style={styles.login}>
            <View style = {{margin : scale(12)}}>
                <Input
                    placeholder=" EmailID"
                    keyboardType='email-address'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    leftIconContainerStyle={{ marginLeft: 0, marginRight: 10 }}
                    onChangeText={text => this.state.emailId= text }
                    
                />
            </View>
            <View style = {{margin : scale(12)}}>    
                <Input
                    placeholder=" Password"
                    secureTextEntry={this.state.showPassword?false:true}
                    rightIcon ={{ type: 'font-awesome',name: this.state.showPassword?'eye':'eye-slash',
                        onPress:()=>{this.toggleEyeIcon()}
                    }}
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    leftIconContainerStyle={{ marginLeft: 0, marginRight: 10}}
                    onChangeText={text => this.state.password= text }
                    />
            </View>


            <View style={styles.formButton}>
                <Button
                    onPress={(this.state.password && this.state.emailId )?
                        ()=>{
                        this.state.loaderLogin?<Loading/>:' ';
                        this.handleLogin()}
                        :()=>{ToastAndroid.show('Enter all fields to login!',2000);}
                    }
                    title="Login"
                    />
            </View>

        </View>
        );
    }

}

 export default Login;