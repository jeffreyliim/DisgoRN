import React from "react";
import {StyleSheet, View} from 'react-native'
import PropTypes from 'prop-types'
import {colors} from "../../../styles/colors";

export const ContainerWithoutSafeAreaView = ({children, backgroundColor, innerStyle}) => {
    return (
        <View style={[styles.innerContainer, innerStyle, backgroundColor]}>
            {children}
        </View>
    )
}
ContainerWithoutSafeAreaView.propTypes = {
    backgroundColor: PropTypes.string
}
ContainerWithoutSafeAreaView.defaultProps = {
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
