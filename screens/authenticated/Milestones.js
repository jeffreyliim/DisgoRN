import React from "react"
import {Dimensions, FlatList, StyleSheet} from "react-native"
import {NavbarStyles} from "../../styles/navbarStyles";
import {DefaultContainer} from "../../assets/components/containers/defaultContainer";
import {DefaultBackButton} from "../../assets/components/buttons/defaultBackButton";
import Timeline from 'react-native-timeline-listview'
import {Image, View} from "react-native-animatable";
import {Text, Tooltip} from "react-native-elements";
import {autobind} from "core-decorators";
import moment from 'moment';
import {dateFormat} from "../../util/helpers";
import {colors} from "../../styles/colors";
import {FontStyles} from "../../styles/fontStyles";

const {fontScale, height, width} = Dimensions.get('window')

@autobind
export class Milestones extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state
        return {
            title: "My Milestones",
            headerStyle: NavbarStyles.defaultHeaderStyle,
            headerTitleStyle: NavbarStyles.defaultHeaderTitleStyle,
            headerLeft: <DefaultBackButton navigation={navigation}/>
        }
    }

    constructor() {
        super()
        this.state = {
            selected: null,
            campaigns: [],
            milestones: [],
        }
    }

    componentDidMount() {
        this.fetchMilestones()
        this.fetchCampaigns()
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


    renderDetail(rowData, sectionID, rowID) {
        let title = <Text style={[styles.title]}>{rowData.title}</Text>
        var desc = null
        if (rowData.description && rowData.imageUrl)
            desc = (
                <View key={rowID} style={styles.descriptionContainer}>
                    <Image source={{uri: rowData.imageUrl}} style={styles.image}/>
                    <Text style={[styles.textDescription]}>{rowData.description}</Text>
                </View>
            )

        return (
            <View key={rowID} style={{flex: 1}}>
                {title}
                {desc}
            </View>
        )
    }

    render() {
        return (
            <DefaultContainer>
                {this.renderBadges()}
                <Timeline
                    style={styles.list}
                    data={this.state.milestones ? this.state.milestones : []}
                    circleSize={25}
                    circleColor='rgba(0,0,0,0)'
                    lineColor='rgb(45,156,219)'
                    timeContainerStyle={{minWidth: 52, marginTop: 10,}}
                    timeStyle={{
                        textAlign: 'center',
                        backgroundColor: colors.blue,
                        color: 'white',
                        padding: 6,
                    }}
                    options={{enableEmptySections: true}}
                    descriptionStyle={{color: 'gray'}}
                    innerCircle={'icon'}
                    iconStyle={{marginTop: 30}}
                    renderDetail={this.renderDetail}
                    renderFullLine={true}
                    detailContainerStyle={{marginTop: -5}}
                    enableEmptySections={false}
                />
            </DefaultContainer>
        )
    }

    fetchMilestones() {
        this.props.screenProps.store.get('timeline?user_id=1').then(res => {
            console.log(res.response)
            this.setToMutatedResponse(res.response)
        })
    }

    setToMutatedResponse(response) {
        let results = []
        response.map(data => {
            let result = {
                time: moment(data.date['$date']).format(dateFormat()),
                title: data.name,
                description: data.description,
                lineColor: colors.green,
                icon: require('./../../assets/images/badge.png'),
                imageUrl: data.image_url,
            }
            results.push(result)
        })
        console.log(results)
        this.setState({
            milestones: results,
        })
    }

    fetchCampaigns() {
        this.props.screenProps.store.get('campaigns?user_id=1').then(res => {
            this.setState({
                campaigns: res.response,
            })
        })
    }

    renderBadges() {
        return (
            <View style={{
                width: width,
                height: 110,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'flex-start'
            }}>
                {this.state.campaigns.length > 0 &&
                <FlatList keyExtractor={(item, index) => index.toString()}
                          extraData={this.state}
                          renderItem={this.renderBadgesItem} horizontal={true}
                          data={this.state.campaigns}/>}
            </View>
        )
    }

    renderBadgesItem({item, index}) {
        return (
            <View
                style={{height: 110, width: 85, justifyContent: 'center', alignItems: 'center',}}>
                <View style={{
                    shadowOffset: {width: 0, height: 8},
                    shadowRadius: 10, shadowOpacity: 0.25, borderRadius: 25, elevation: 5,
                }}>
                    <Tooltip popover={<Text
                        style={[FontStyles.smallBold, {color: colors.white}]}>{item.name}</Text>}>
                        <View>
                            <Image style={{
                                height: 60, width: 60,
                            }}
                                   source={{uri: `https://hackathon-circles.s3-ap-southeast-1.amazonaws.com/badge_image_url/badge${item.campaign_id}.png`}}/>
                            <View style={[{
                                backgroundColor: colors.black,
                                position: 'absolute',
                                zIndex: 100,
                                height: 60,
                                width: 60,
                                borderRadius: 30,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }, item.percentage === 100 ? {opacity: 0} : {opacity: 1 - ((item.percentage / 100))}]}>
                            </View>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                zIndex: 1000
                            }}>
                                {item.percentage !== 100 &&
                                <Text
                                    style={[FontStyles.smallBold, {
                                        color: colors.white,
                                        position: 'absolute'
                                    }]}>{item.percentage}%</Text>
                                }
                            </View>
                        </View>
                    </Tooltip>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        marginTop: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    descriptionContainer: {
        flexDirection: 'row',
        paddingRight: 50
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    textDescription: {
        marginLeft: 10,
        color: 'gray'
    }
})
