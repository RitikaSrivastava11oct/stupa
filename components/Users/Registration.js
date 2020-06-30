import React, { Component } from 'react';
import { scale } from 'react-native-size-matters';
import { View, ScrollView, Button, Picker,ToastAndroid } from 'react-native';
import { Input} from 'react-native-elements';
import { styles } from "../../utils/style";
import { api } from "./api";
import RadioForm from 'react-native-simple-radio-button';

class Registration extends Component {

    constructor(props) {
      super(props);
      this.state={
        showPassword: false,
        Name : '',
        password :'',
        emailId :'',
        contactNo :'',
        city : '',
        gender : '',
        confirmPassword:'',
        touched :{
            Name : false,
            contactNo :false,
            password :false,
            confirmPassword:false,
            emailId :false
        }
     }
    }

    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps Home ***');
    }

    static navigationOptions = {
        title: 'Registration'
    }

    toggleEyeIcon=()=>{
        this.setState({ showPassword : !this.state.showPassword});
    }

    handleBlur =( field)=>(event) =>{
        this.setState({
            touched :{...this.state.touched , [field] : true}
        });
    }

    validate( Name , lastName , email , password , confirmPassword, contactNo){
        const errors = {
            Name : '',
            contactNo :'',
            password :'',
            confirmPassword:'',
            emailId :''
        }

        if(this.state.touched.Name && Name.length < 1)
            errors.Name = 'Name should not be empty';
        
        let phoneNoRegex = /^\d{10}$/;
        if(this.state.touched.contactNo && !phoneNoRegex.test(contactNo))
            errors.contactNo ='Contact No should be 10 digit';

        let emailReg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
        if(this.state.touched.emailId && !emailReg.test(email))
            errors.emailId ='Invalid Email id';

        let passwordReg =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if(this.state.touched.password && !passwordReg.test(password))
            errors.password ='Password should be between 8 to 15 chars,(1 lowercase,1 uppercase,1 digit,1 special character)';
        
        if(this.state.touched.confirmPassword && password!=confirmPassword)
            errors.confirmPassword ='Password and Confirm Password field should be same';

        return errors;
    }
  
    handleSignup = async () => {
        try {

            let payload = {Name: this.state.Name,
                            password:this.state.password,
                            emailId:this.state.emailId,
                            contactNo:this.state.contactNo,
                            gender:this.state.gender,
                            city:this.state.city

            };
            let response = await api.handleSignup(payload);
            if(response.result === true) 
            {
                ToastAndroid.show(response.message ,3000);
            }
            else
            ToastAndroid.show('Could not signup' ,3000); 

        } 
        catch (error) {
            console.log('error while Sign up ');
        }

    }

    render() {
        console.log('reg render');
        const errors = this.validate( this.state.Name , this.state.lastName , this.state.emailId , this.state.password , this.state.confirmPassword , this.state.contactNo);
        let radio_props = [
            {label: 'Male', value: 'Male' },
            {label: 'Female', value: 'Female' }
          ];

        return(
        <View>
             <ScrollView>
                <View style={styles.login}>
                    <View style = {{margin : scale(12)}}>
                        <Input
                            placeholder="Name"
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            leftIconContainerStyle={{ marginLeft: scale(0), marginRight: scale(10) }}
                            onBlur = {this.handleBlur('Name')}
                            onChangeText={text => this.state.Name= text }
                            errorMessage ={errors.Name}
                        />
                    </View>
                    <View style = {{margin : scale(12)}}>    
                        <Input
                            placeholder="Password"
                            secureTextEntry={true}
                            leftIcon={{ type: 'font-awesome', name: 'key' }}
                            secureTextEntry={this.state.showPassword?false:true}
                            rightIcon ={{ type: 'font-awesome',name: this.state.showPassword?'eye':'eye-slash',
                                onPress:()=>{this.toggleEyeIcon()}
                            }}
                            leftIconContainerStyle={{ marginLeft: scale(0), marginRight: scale(10) }}
                            onChangeText={text => this.state.password= text }
                            onBlur = {this.handleBlur('password')}
                            errorMessage ={errors.password}
                            />
                    </View>
                    <View style = {{margin : scale(12)}}>    
                        <Input
                            placeholder="Confirm Password"
                            secureTextEntry={true}
                            leftIcon={{ type: 'font-awesome', name: 'key' }}
                            secureTextEntry={this.state.showPassword?false:true}
                            rightIcon ={{ type: 'font-awesome',name: this.state.showPassword?'eye':'eye-slash',
                                onPress:()=>{this.toggleEyeIcon()}
                            }}
                            leftIconContainerStyle={{ marginLeft: scale(0), marginRight: scale(10) }}
                            onChangeText={text => this.state.confirmPassword= text }
                            onBlur = {this.handleBlur('confirmPassword')}
                            errorMessage ={errors.confirmPassword}
                            />
                    </View>
                    <View style = {{margin : scale(12)}}>
                        <Input
                            placeholder="EmailId"
                            leftIcon={{ type: 'font-awesome', name: 'inbox' }}
                            leftIconContainerStyle={{ marginLeft: scale(0), marginRight: scale(10) }}
                            onChangeText={text => this.state.emailId= text }
                            onBlur = {this.handleBlur('emailId')}
                            errorMessage ={errors.emailId}
                        />
                    </View>
                    <View style = {{margin : scale(12)}}>
                        <Input
                            placeholder="Contact no"
                            keyboardType="numeric"
                            leftIcon={{ type: 'font-awesome', name: 'phone' }}
                            leftIconContainerStyle={{ marginLeft: scale(0), marginRight: scale(10) }}
                            onChangeText={text => this.state.contactNo= text }
                            onBlur = {this.handleBlur('contactNo')}
                            errorMessage ={errors.contactNo}
                        />
                    </View>
                    <View style = {{margin : scale(12)}}>
                    <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        formHorizontal={true}
                        onPress={(value) => {this.setState({gender : value
                        })}}
                        />
                    </View>

                    <View style = {{margin : scale(12)}}>
                        <Picker
                            selectedValue={this.state.city}
                            onValueChange={(itemValue, pos) => this.setState({ city: itemValue })}>
                            <Picker.Item label={'Select'} value={'Select'}/>
                            <Picker.Item label="Delhi" value="Delhi" />  
                            <Picker.Item label="Mumbai" value="Mumbai" />  
                            <Picker.Item label="Hyderabad" value="Hyderabad" /> 
                            <Picker.Item label="Banglore" value="Banglore" />  
                        </Picker>
                    </View>
                    <View style={styles.formButton}>
                        <Button
                            onPress={(!errors.Name && !errors.password && !errors.confirmPassword && !errors.emailId && !errors.contactNo
                                && this.state.Name &&  this.state.password && this.state.confirmPassword && this.state.emailId && this.state.contactNo && this.state.city)?
                                ( () =>{
                                this.handleSignup()
                            }):()=>{ToastAndroid.show('Enter all fields to signup!',2000);}
                        }
                            title="Signup"
                            />
                    </View>
                </View>
            </ScrollView>
        </View>
        );
    }

}

 export default Registration;