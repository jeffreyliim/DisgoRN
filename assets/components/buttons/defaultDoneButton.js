import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import PropTypes from 'prop-types'
import {FontStyles} from "../../../styles/fontStyles";

export class DefaultDoneButton extends React.Component {
    render() {
        const {onPress, title} = this.props
        return (
            <View style={styles.headerLeft}>
                <TouchableOpacity onPress={() => onPress || null} {...this.props}
                                  activeOpacity={0.7} style={{
                    height: 40,
                    width: 40,
                    justifyContent: "center",
                    alignItems: "flex-end"
                }}>
                    <Text style={FontStyles.regular}>{title}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

DefaultDoneButton.propTypes = {
    title: PropTypes.string,
};
DefaultDoneButton.defaultProps = {
    title: 'Done',
};

export const styles = StyleSheet.create({
    headerLeft: {
        marginRight: 20
    },
});
