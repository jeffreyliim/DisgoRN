
import {Icon} from 'react-native-elements'
import React from "react";
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import PropTypes from 'prop-types'

export class DefaultBackButton extends React.Component {
    render() {
        const {iconName, iconColor, navigation} = this.props
        return (
            <View style={styles.headerLeft}>
                <TouchableOpacity onPress={() => navigation ? navigation.goBack() : null} {...this.props}
                                  activeOpacity={0.7} style={{
                    height: 40,
                    width: 30,
                    justifyContent: "center",
                    alignItems: "flex-start"
                }}>
                    <Icon type={'ionicon'} size={40} name={iconName} color={iconColor}/>
                </TouchableOpacity>
            </View>
        )
    }
}

DefaultBackButton.propTypes = {
    iconName: PropTypes.string,
    iconColor: PropTypes.string,
    // navigation: PropTypes.object.isRequired
};
DefaultBackButton.defaultProps = {
    iconName: 'ios-arrow-round-back',
    iconColor: '#353B50',
};


export const styles = StyleSheet.create({
    headerLeft: {
        marginLeft: 20
    }
});
