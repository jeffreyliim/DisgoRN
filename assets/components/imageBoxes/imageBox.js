import {Image, StyleSheet, View} from "react-native";
import React from "react";

export const ImageBox = ({source}) => {
    return (
        <View style={styles.shadowImage}>
            <Image style={styles.image} source={source}/>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 25,
    },
    shadowImage: {
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }
})
