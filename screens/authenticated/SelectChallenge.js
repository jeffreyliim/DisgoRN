import React, {Component} from "react"
import {Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {NavbarStyles} from "../../styles/navbarStyles";
import Carousel, {Pagination, ParallaxImage} from "react-native-snap-carousel";
import PropTypes from 'prop-types'
import {colors} from "../../styles/colors";
import {FontStyles} from "../../styles/fontStyles";
import {Grid, Row} from "react-native-easy-grid";
import {DefaultContainer} from "../../assets/components/containers/defaultContainer";
import {ButtonV1} from "../../assets/components/buttons/buttonV1";
import {autobind} from "core-decorators";

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

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

@autobind
class SliderEntry extends Component {

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
                parallaxFactor={0.35}
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
        const {data: {id, title, subtitle}, even} = this.props;

        const uppercaseTitle = title ? (
            <Text
                style={[styles.title, even ? styles.titleEven : {}]}
                numberOfLines={2}
            >
                {title.toUpperCase()}
            </Text>
        ) : false;

        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.slideInnerContainer}
                onPress={this.onCardPressed}
            >
                <View style={styles.shadow}/>
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    {this.image}
                    <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]}/>
                </View>
                <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                    {uppercaseTitle}
                    <Text
                        style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                        numberOfLines={2}
                    >
                        {subtitle}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    onCardPressed() {
        return this.props.navigation.navigate('ChallengeMap')
    }
}

export const ENTRIES1 = [
    {
        id: 1,
        title: 'Beautiful and dramatic Antelope Canyon',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/UYiroysl.jpg'
    },
    {
        id: 2,
        title: 'Earlier this morning, NYC',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
    },
    {
        id: 3,
        title: 'White Pocket Sunset',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: 'https://i.imgur.com/MABUbpDl.jpg'
    },
    {
        id: 4,
        title: 'Acrocorinth, Greece',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/KZsmUi2l.jpg'
    },
    {
        id: 5,
        title: 'The lone tree, majestic landscape of New Zealand',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/2nCt3Sbl.jpg'
    },
    {
        id: 6,
        title: 'Middle Earth, Germany',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/lceHsT6l.jpg'
    }
];

@autobind
export class SelectChallenge extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state
        return {
            title: "Select Challenge",
            headerStyle: NavbarStyles.defaultHeaderStyle,
            headerTitleStyle: NavbarStyles.defaultHeaderTitleStyle
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            slider1ActiveSlide: 1
        };
    }


    componentDidMount() {

        // Additional component initialization can go here.
        // If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
    }

    // dispatching an action based on state change
    componentWillUpdate(nextProps, nextState) {
        //if (nextState.open == true && this.state.open == false) {
        //  this.props.onWillOpen();
        // }
    }

    componentDidUpdate(prevProps, prevState) {
        // only update chart if the data has changed
        // if (prevProps.data !== this.props.data) {
        //   this.chart = c3.load({
        //    data: this.props.data
        //    });
        //  }
    }

    _renderItemWithParallax({item, index}, parallaxProps) {
        return (
            <SliderEntry
                navigation={this.props.navigation}
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={true}
                parallaxProps={parallaxProps}
            />
        );
    }

    render() {
        const {slider1ActiveSlide} = this.state;

        return (
            <Grid>
                <Row size={15}>
                    <DefaultContainer>
                        <View style={styles.Main}>
                            <Text style={FontStyles.h1}>Discover Challenges</Text>
                            <Text style={FontStyles.small}>We have a range of them around Singapore!</Text>
                        </View>
                    </DefaultContainer>
                </Row>
                <Row size={45}>
                    <View style={{flex: 1}}>
                        <Carousel
                            ref={c => this._slider1Ref = c}
                            data={ENTRIES1}
                            renderItem={this._renderItemWithParallax}
                            sliderWidth={sliderWidth}
                            itemWidth={itemWidth}
                            hasParallaxImages={true}
                            firstItem={1}
                            inactiveSlideScale={0.94}
                            inactiveSlideOpacity={0.6}
                            // inactiveSlideShift={20}
                            containerCustomStyle={styles.slider}
                            contentContainerCustomStyle={styles.sliderContentContainer}
                            loop={true}
                            loopClonesPerSide={2}
                            autoplay={true}
                            autoplayDelay={500}
                            autoplayInterval={3000}
                            onSnapToItem={(index) => this.setState({slider1ActiveSlide: index})}
                        />
                        <Pagination
                            dotsLength={ENTRIES1.length}
                            activeDotIndex={slider1ActiveSlide}
                            containerStyle={styles.paginationContainer}
                            dotColor={colors.black}
                            dotStyle={styles.paginationDot}
                            inactiveDotColor={colors.black}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                            carouselRef={this._slider1Ref}
                            tappableDots={!!this._slider1Ref}
                        />
                    </View>
                </Row>
                <Row size={40}>
                    <DefaultContainer>
                        <ButtonV1 buttonStyle={{paddingTop: 20}} title={"Discover All Challenges"}/>
                    </DefaultContainer>
                </Row>
            </Grid>
        )
    }
}

const styles = StyleSheet.create({
    SafeArea: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0)'
    },
    Main: {
        flex: 1,
        justifyContent: "center"
    },
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
        shadowColor: colors.black,
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height: 10},
        shadowRadius: 10,
        borderRadius: entryBorderRadius
    },
    imageContainer: {
        flex: 1,
        marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
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

