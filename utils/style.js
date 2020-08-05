import { scale, verticalScale ,ScaledSheet } from 'react-native-size-matters';

export const themeColor = '#008080';
export const drawerBackgroundColor = '#D3D3D3';


export const styles = ScaledSheet.create(
    {
        MainContainer:
        {
            flex: 1,
            backgroundColor :'#ecf0f1',
            paddingBottom:verticalScale(20)
            
        },
        splashScreen : {
            flex : 1,
            padding :scale(3),
            justifyContent : 'center',
            alignContent : 'center'
        },
        search : { 
            marginBottom: verticalScale(5), 
            marginTop: verticalScale(5), 
            backgroundColor: '#FFFFFF' 
        },
        logo:{
            textAlign: 'justify',
            fontSize: scale(30) , 
            fontWeight : 'bold',
            marginLeft :scale(20)
        },
        drawerLabel : { 
            fontFamily:'serif', 
            margin :15 , 
            fontWeight : 'bold' , 
            fontSize: 14
        },
        drawer:{ 
            marginBottom : verticalScale(10) ,
            paddingTop: verticalScale(5) , 
            height: verticalScale(60) ,
            flexDirection : 'row'
        },

        albumDetailsText:{
            marginTop:verticalScale(10),
            fontSize:scale(15),
            fontFamily:'serif'
        },
        mainContent:{ 
            marginBottom : verticalScale(20) ,
            paddingTop: verticalScale(5) , 
            height: verticalScale(60) ,
            flexDirection : 'row'
        },
        mainImage:{
            resizeMode:'contain' , 
            height: verticalScale(55), 
            width: scale(60) 
        },
        titleView:{  
            justifyContent:'center', 
            alignItems : 'center' ,
            marginLeft : scale(10)
        },
        titleText:{ 
            color : '#654321',
            fontSize: scale(20)  ,
            fontFamily : 'serif'
        },
        artist:{ 
            fontFamily:'serif',
            fontWeight:'bold',
            marginTop:verticalScale(5)
        },
        albumDetailsImage:{ 
            width:'100%', 
            height:verticalScale(200),
            marginBottom:verticalScale(20)
        },
        link:{ 
            textDecorationLine:'underline',
            color: themeColor, 
            marginTop:verticalScale(10),
            fontSize:scale(15),
            fontFamily:'serif'
        }
    });