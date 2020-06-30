/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React , {  Component } from 'react';
import Main from './components/Main';
import {View ,Image} from 'react-native';
import {Header,LearnMoreLinks,Colors,DebugInstructions,ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import { styles } from "./utils/style";

class App extends Component{
  constructor(props){
      super(props);
      this.state={
          loading : true
      }
  }

  componentDidMount(){
      setTimeout(() =>{
          this.setState({ loading : false})
        }, 2000);
  }

  render(){
      return (
          this.state.loading ?
          (<View style={styles.splashScreen}>
              <Image
                  style={{width:'100%', height: '100%', resizeMode: 'contain'}}
                  source ={require('./components/images/welcome.jpg')}/>
          </View>)
          :(<Main/>)
      );
  }
}

export default App;
