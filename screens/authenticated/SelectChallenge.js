import React from "react"
import {Dimensions, Platform, StyleSheet, Text, View} from "react-native"
import {NavbarStyles} from "../../styles/navbarStyles";
import {colors} from "../../styles/colors";
import {FontStyles} from "../../styles/fontStyles";
import {Grid, Row} from "react-native-easy-grid";
import {DefaultContainer} from "../../assets/components/containers/defaultContainer";
import {ButtonV1} from "../../assets/components/buttons/buttonV1";
import {autobind} from "core-decorators";
import {HeaderRight} from "../../assets/components/buttons/headerRight";
import {ImageCarousel} from "../../assets/components/imageCarousel/ImageCarousel";

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
export class SelectChallenge extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state
        return {
            title: "Select Challenge",
            headerStyle: NavbarStyles.defaultHeaderStyle,
            headerTitleStyle: NavbarStyles.defaultHeaderTitleStyle,
            headerRight: <HeaderRight onPress={params.onMileStonesPressed ? params.onMileStonesPressed : null}>
                <Text style={FontStyles.small}>My Milestones</Text>
            </HeaderRight>
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            slider1ActiveSlide: 1
        };
        props.navigation.setParams({
            onMileStonesPressed: this.onMileStonesPressed
        })
    }

    onMileStonesPressed() {
        this.props.navigation.navigate('Milestones')
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
                        <ImageCarousel navigation={this.props.navigation} onSliderEntryPressed={() => {
                            return this.props.navigation.navigate('ChallengeMap'
                            // ,{campaignID}
                                )
                        }}/>
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

