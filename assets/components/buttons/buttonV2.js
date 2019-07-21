import {Button} from "react-native-elements";
import React from "react";
import {colors} from "../../../styles/colors";
import PropTypes from 'prop-types'
import {FontStyles} from "../../../styles/fontStyles";

export const ButtonV2 = (props) => {
    const {hasIcon, iconType, iconName, buttonStyle, backgroundColor} = props
    return (
        <Button {...props} icon={hasIcon ? {name: iconName, type: iconType, size: 20, color: colors.blue} : null}
                disabledStyle={{backgroundColor: colors.black}}
                titleStyle={[FontStyles.bold, {color: colors.blue}]}
                containerStyle={{
                    marginTop: 10, marginBottom: 10,
                    marginLeft: 0, marginRight: 0,
                    paddingLeft: 3, paddingRight: 3,
                    ...buttonStyle
                }}
                activeOpacity={0.80}
                buttonStyle={{
                    height: 55,
                    // width: '100%',
                    paddingRight: 20,
                    backgroundColor: backgroundColor || colors.white,
                    borderRadius: 30,
                }}
        />
    )
}
ButtonV2.defaultProps = {
    iconType: 'antdesign',
    title: 'Login',
    hasIcon: true,
}

ButtonV2.propTypes = {
    iconType: PropTypes.string,
    iconName: PropTypes.string,
    buttonStyle: PropTypes.object,
    icon: PropTypes.bool,
}
