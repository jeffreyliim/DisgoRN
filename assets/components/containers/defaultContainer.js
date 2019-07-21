import React from "react";
import {StyleSheet, View} from 'react-native'
import {SafeAreaView} from 'react-navigation'
import PropTypes from 'prop-types'
import {colors} from "../../../styles/colors";

export const DefaultContainer = ({children, backgroundColor, innerStyle}) => {
    return (
        <SafeAreaView style={[styles.container, {backgroundColor}]}>
            <View style={[styles.innerContainer, innerStyle]}>
                {children}
            </View>
        </SafeAreaView>
    )
}
DefaultContainer.propTypes = {
    backgroundColor: PropTypes.string
}
DefaultContainer.defaultProps = {
    backgroundColor: colors.background
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
    }
})
