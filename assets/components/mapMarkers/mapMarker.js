import React from "react";
import {View} from "react-native-animatable";
import Incomplete from './../../svg/incomplete-map-marker.svg'
import Complete from './../../svg/completed-map-marker.svg'
import {Image} from "react-native-elements";

const diameter = 30
export const MapMarker = ({isCompleted, source}) => {
    return (
        <View>
            {isCompleted ? <Complete height={50}/> : <Incomplete height={50}/>}
            <View style={{position: "absolute", bottom: 14.5, left: 282.5}}>
                <Image style={{height: diameter, width: diameter, resizeMode: 'contain', borderRadius: diameter / 2}}
                       source={source}/>
            </View>
        </View>
    )
}
