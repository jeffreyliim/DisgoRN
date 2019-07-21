import React from 'react'
import {StyleSheet} from 'react-native'
import {colors} from "./colors";

export const NavbarStyles = StyleSheet.create({
    defaultHeaderStyle: {
        borderBottomWidth: 0,
        shadowOffset: {height: 0.5,},
        shadowColor: colors.grey,
        shadowOpacity: 0.9,
    },
    defaultHeaderTitleStyle: {
        color: colors.black,
        fontSize: 16.00,
        fontFamily: "OpenSans-Bold",
        fontWeight: '700',
    },
    mapsHeaderStyle: {
        borderBottomWidth: 0,
    },
    mapsHeaderTitleStyle: {},
})
