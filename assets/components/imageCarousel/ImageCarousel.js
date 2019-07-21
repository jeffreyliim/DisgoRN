import {Dimensions, StyleSheet} from "react-native";
import {colors} from "../../../styles/colors";
import Carousel from "react-native-snap-carousel";
import Pagination from "react-native-snap-carousel/src/pagination/Pagination";
import React from "react";
import {SliderEntry} from './SliderEntry'
import {autobind} from "core-decorators";

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;
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
export class ImageCarousel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            slider1ActiveSlide: 1,
        }
    }

    _renderItemWithParallax({item, index}, parallaxProps) {
        return (
            <SliderEntry
                navigation={this.props.navigation}
                onSliderEntryPressed={this.props.onSliderEntryPressed}
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={true}
                parallaxProps={parallaxProps}
            />
        );
    }

    render() {
        const {slider1ActiveSlide} = this.state
        return (
            <React.Fragment>
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
                    layoutCardOffset={18}
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
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
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
