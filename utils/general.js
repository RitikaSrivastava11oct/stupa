import {Dimensions} from "react-native";

export function isEmpty(str) {
    return (!str || 0 === str.length || (str.constructor === Object && Object.keys(str).length === 0));
}

export function getWidth(){
    return (Dimensions.get('window').width);
}

export function getHeight(){
    return (Dimensions.get('window').height);
}

