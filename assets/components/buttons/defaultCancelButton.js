import {DefaultBackButton, styles} from "./defaultBackButton";
import {TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import React from "react";

export class DefaultCancelButton extends DefaultBackButton {
    render() {
        const {iconName, iconColor, navigation} = this.props
        return (
            <View style={styles.headerLeft}>
                <TouchableOpacity onPress={() => navigation ? navigation.dismiss() : null} {...this.props}
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

DefaultCancelButton.defaultProps = {
    iconName: 'ios-close',
    iconColor: '#353B50',
};
