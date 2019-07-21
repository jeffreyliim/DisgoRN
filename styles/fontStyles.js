import React from 'react'
import {StyleSheet} from 'react-native'
import {colors} from "./colors";

export const FontStyles = StyleSheet.create({
    small: {
        color: colors.black,
        fontSize: 14.00,
        fontFamily: 'OpenSans-Light',
    },
    smallBold: {
        color: colors.black,
        fontSize: 14.00,
        fontFamily: 'OpenSans-Bold',
    },
    regular: {
        color: colors.black,
        fontSize: 16.00,
        fontFamily: 'OpenSans-Regular',
    },
    bold: {
        color: colors.black,
        fontSize: 18.00,
        fontFamily: 'OpenSans-Bold',
    },
    h1: {
        color: colors.black,
        fontSize: 22.00,
        fontFamily: 'OpenSans-Bold',
    }
})
