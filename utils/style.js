import { scale, verticalScale ,ScaledSheet } from 'react-native-size-matters';

export const themeColor = '#008080';
export const drawerBackgroundColor = '#D3D3D3';

export const styles = ScaledSheet.create(
    {
        MainContainer:
        {
            flex: 1,
            backgroundColor :'#ecf0f1'
            
        },
        splashScreen : {
            flex : 1,
            padding :scale(3),
            justifyContent : 'center',
            alignContent : 'center'
        },
        logo:{
            textAlign: 'justify',
            fontSize: scale(30) , 
            fontWeight : 'bold',
            marginLeft :scale(20)
        },
        drawer:{ 
            marginBottom : verticalScale(10) ,
            paddingTop: verticalScale(5) , 
            height: verticalScale(60) ,
            flexDirection : 'row'
        },
        login: {
            justifyContent: 'center',
            margin: scale(4),
            flex:1
        },
        formButton: {
            margin: scale(17),
            marginLeft :scale(90),
            width : scale(100),
            height : verticalScale(15),
            borderRadius:scale(400),
            justifyContent : 'center'
        },
        homeLabel:
        { 
            fontSize : scale(16) , 
            fontWeight : 'bold'
        },
        homeText:{
             fontSize : scale(16) 
            },
        homeFlatlist :{ 
            width : '100%' , 
            padding : scale(20) , 
            flex : 1
        }
    });