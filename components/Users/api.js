import auth from '@react-native-firebase/auth';
import { AsyncStorage } from 'react-native';
import { helpers } from "../../utils/helpers";

async function handleLogin(userData) {
    try {
      const emailId= userData.emailId;
      const password = userData.password;
      let userId = await AsyncStorage.getItem('userId');
       if(userId==null || userId==''){
        const status = await auth().signInWithEmailAndPassword(emailId, password);
        currentUserAfterLogin =await auth().currentUser;
          await AsyncStorage.multiSet([
            ["userId", currentUserAfterLogin.uid]
          ]);
        const response= {"result": true, message : 'You are now Logged in!'};
        return response;
      }
  
      const response= {result: true, message: 'You are already Logged in!'};
      return response;
  
    } catch (error) {
      console.log('Error in log in  ');
      const response= {"result": false, "message": error.message}
      return response;
    }
  }

  async function handleSignup(userData) {
    try {
      const emailId= userData.emailId;
      const password = userData.password;
      let userId1 = await AsyncStorage.removeItem('userId');
        const status= await auth().createUserWithEmailAndPassword(emailId, password);
        const userDataWithoutPassword={
          Name : userData.Name,
          emailId : userData.emailId,
          contactNo : userData.contactNo,
          gender : userData.gender,
          city : userData.city
        }
        const data={
          path : 'users',
          body : userDataWithoutPassword
        };
        const result1= await helpers.securePost(data);
        const response= {"result": true, "message": 'Registration Successful!'};
        return response;
    } 
    catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        const response= {"result": false, message : "Registration Failed, email Already exists!"}
        return response;
      }
  
      if (error.code === 'auth/invalid-email') {
        const response= {"result": false, message: "Registration Failed ,Invalid Email address!"}
        return response;
      }
    }
  }

  export const api = { handleLogin ,handleSignup};