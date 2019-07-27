import React, {Component} from "react";
import PropTypes from "prop-types";
import {ParallaxImage} from "react-native-snap-carousel";
import {Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../../../styles/colors";
import {autobind} from "core-decorators";
import {Badge} from "react-native-elements";

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
const entryBorderRadius = 8;
const IS_IOS = Platform.OS === 'ios';

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const itemWidth = slideWidth + itemHorizontalMargin * 2;

@autobind
export class SliderEntry extends Component {

    constructor(props) {
        super(props)
    }

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image() {
        const {data: {illustration}, parallax, parallaxProps, even} = this.props;

        return parallax ? (
            <ParallaxImage
                source={{uri: illustration}}
                containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
                style={styles.image}
                parallaxFactor={0.4}
                showSpinner={true}
                spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
                {...parallaxProps}
            />
        ) : (
            <Image
                source={{uri: illustration}}
                style={styles.image}
            />
        );
    }

    render() {
        const {data: {id, title, subtitle, percentage_completed}, even} = this.props;
        const uppercaseTitle = title ? (
            <Text
                style={[styles.title, even ? styles.titleEven : {}]}
                numberOfLines={2}>
                {title.toUpperCase()}
            </Text>
        ) : false;
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.slideInnerContainer}
                onPress={this.onCardPressed}
            >
                <View style={styles.shadow}>
                    <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                        {this.image}
                        <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]}/>
                    </View>
                    <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                        {uppercaseTitle}
                        <Text
                            style={[styles.title, even ? styles.titleEven : {}]}
                            numberOfLines={2}>
                            {Math.round(percentage_completed)}% completed
                        </Text>
                        <Text style={[styles.subtitle, even ? styles.subtitleEven : {}]} numberOfLines={2}>
                            {subtitle}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    onCardPressed() {
        return this.props.onSliderEntryPressed()
    }
}

const styles = StyleSheet.create({
    slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: 18 // needed for shadow
    },
    shadow: {
        position: 'absolute',
        top: 0,
        left: itemHorizontalMargin,
        right: itemHorizontalMargin,
        bottom: 18,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height: 8},
        shadowRadius: 10,
        borderRadius: entryBorderRadius,
        elevation: 5,
    },
    imageContainer: {
        flex: 1,
        marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius,
    },
    imageContainerEven: {
        backgroundColor: colors.black
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: IS_IOS ? entryBorderRadius : 0,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    // image's border radius is buggy on iOS; let's hack it!
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
        backgroundColor: colors.grey
    },
    radiusMaskEven: {
        backgroundColor: colors.black
    },
    textContainer: {
        justifyContent: 'center',
        paddingTop: 20 - entryBorderRadius,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: colors.grey,
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    textContainerEven: {
        backgroundColor: colors.black
    },
    title: {
        color: colors.black,
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    titleEven: {
        color: 'white'
    },
    subtitle: {
        marginTop: 6,
        color: colors.gray,
        fontSize: 12,
        fontStyle: 'italic'
    },
    subtitleEven: {
        color: 'rgba(255, 255, 255, 0.7)'
    },
    sliderContentContainer: {
        paddingVertical: 10 // for custom animation
    },
    paginationContainer: {
        paddingVertical: 8
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    }
})
