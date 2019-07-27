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
        title: '',
        subtitle: '',
        illustration: 'https://i.ibb.co/84b1XHQ/sg-food.jpg',
        percentage_completed: 0
    },
    {
        id: 2,
        title: '',
        subtitle: '',
        illustration: 'https://i.ibb.co/B3jRryC/merlion.jpg',
        percentage_completed: 0
    },
];

@autobind
export class ImageCarousel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            slider1ActiveSlide: 1,
            campaigns: null,
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.campaigns !== this.props.campaigns) {
            this.formatCampaignData(this.props.campaigns)
        }
    }

    _renderItemWithParallax({item, index}, parallaxProps) {
        return (
            <SliderEntry
                navigation={this.props.navigation}
                onSliderEntryPressed={() => {
                    this.props.onSliderEntryPressed(item)
                }}
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={true}
                parallaxProps={parallaxProps}
            />
        );
    }

    render() {
        const {slider1ActiveSlide, campaigns} = this.state
        return (
            <React.Fragment>
                <Carousel
                    ref={c => this._slider1Ref = c}
                    data={campaigns ? campaigns : ENTRIES1}
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
                    onSnapToItem={(index) => {
                        this.setState({slider1ActiveSlide: index})
                    }}
                />
                <Pagination
                    dotsLength={campaigns ? campaigns.length : ENTRIES1.length}
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

    formatCampaignData(campaigns) {
        if (campaigns !== undefined) {
            let formattedCampaigns = []
            campaigns.response.map(c => {
                let obj = {
                    id: c.campaign_id,
                    title: c.name,
                    subtitle: c.description,
                    illustration: c.image_url,
                    percentage_completed: c.percentage,
                }
                formattedCampaigns.push(obj)
            })
            this.setState({
                campaigns: formattedCampaigns
            })
        }
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
