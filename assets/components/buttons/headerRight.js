import {Icon} from 'react-native-elements'
import React from "react";
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import PropTypes from 'prop-types'

export class HeaderRight extends React.Component {
    render() {
        const {iconName, iconColor, children} = this.props
        return (
            <View style={styles.HeaderRight}>
                <TouchableOpacity {...this.props}
                                  activeOpacity={0.7} style={{
                    height: 40,
                    width: '100%',
                    justifyContent: "center",
                    alignItems: "flex-end"
                }}>
                    {children || <Icon type={'ionicon'} size={40} name={iconName} color={iconColor}/>}
                </TouchableOpacity>
            </View>
        )
    }
}

HeaderRight.propTypes = {
    iconName: PropTypes.string,
    iconColor: PropTypes.string,
};
HeaderRight.defaultProps = {
    iconName: 'ios-arrow-round-back',
    iconColor: '#353B50',
};


export const styles = StyleSheet.create({
    HeaderRight: {
        marginRight: 20
    }
});
