import {Button} from "react-native-elements";
import React from "react";
import {colors} from "../../../styles/colors";
import PropTypes from 'prop-types'
import {FontStyles} from "../../../styles/fontStyles";

export const ButtonV1 = (props) => {
    const {hasIcon, iconType, iconName, buttonStyle, backgroundColor} = props
    return (
        <Button {...props} icon={hasIcon ? {name: iconName, type: iconType, size: 20, color: colors.white} : null}
                disabledStyle={{backgroundColor: colors.black}}
                titleStyle={[FontStyles.bold, {color: colors.white}]}
                containerStyle={{
                    marginTop: 10, marginBottom: 10,
                    marginLeft: 0, marginRight: 0,
                    paddingLeft: 3, paddingRight: 3,
                    ...buttonStyle
                }}
                activeOpacity={0.90}
                buttonStyle={{
                    height: 55,
                    // width: '100%',
                    paddingRight: 20,
                    backgroundColor: backgroundColor || colors.blue,
                    borderRadius: 30,
                }}
        />
    )
}
ButtonV1.defaultProps = {
    iconType: 'antdesign',
    title: 'Login',
    hasIcon: true,
}

ButtonV1.propTypes = {
    iconType: PropTypes.string,
    iconName: PropTypes.string,
    buttonStyle: PropTypes.object,
    icon: PropTypes.bool,
}
