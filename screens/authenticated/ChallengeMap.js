import React from "react"
import {Dimensions, StyleSheet, View} from "react-native"
import {SafeAreaView} from 'react-navigation'
import {NavbarStyles} from "../../styles/navbarStyles";
import MapView from "react-native-maps";
import {DefaultBackButton} from "../../assets/components/buttons/defaultBackButton";
import {MapMarker} from "../../assets/components/mapMarkers/mapMarker";
import Animatable from "../../assets/animations/customAnimations";
import {autobind} from "core-decorators";
import Modal from "react-native-modal";
import {Image, Text} from "react-native-elements";
import {DefaultCancelButton} from "../../assets/components/buttons/defaultCancelButton";
import LottieView from 'lottie-react-native';
import {Col, Grid, Row} from "react-native-easy-grid";
import {FontStyles} from "../../styles/fontStyles";
import {ContainerWithoutSafeAreaView} from "../../assets/components/containers/containerWithoutSafeAreaView";
import {ButtonV1} from "../../assets/components/buttons/buttonV1";

const {fontScale, height, width} = Dimensions.get('window')
const ASPECT_RATIO = width / height;

@autobind
export class ChallengeMap extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state
        return {
            title: "Your Challenge",
            headerStyle: NavbarStyles.defaultHeaderStyle,
            headerTitleStyle: NavbarStyles.defaultHeaderTitleStyle,
            headerLeft: <DefaultBackButton navigation={navigation}/>
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            campaign_id: props.navigation.getParam('campaign_id'),
            events: [],
            selectedChallengeIndex: 0,
        }
    }


    componentDidMount() {
        this.fetchEvents()
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

    bounce(index) {
        this[`mapMarker_${index}`].bounceCustom1(500).then(endState => this.openDetailsModal(endState, index))
    }

    openDetailsModal(endState, index) {
        return endState.finished ? this.setState({isModalVisible: true, selectedChallengeIndex: index}) : null
    }

    renderMapsView() {
        const {events} = this.state
        if (events.length < 1) {
            return null
        }
        const LATITUDE_DELTA = (events[0].location[0] / events[0].location[1]) * 30
        const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

        return (
            <MapView initialRegion={{
                latitude: events[0].location[0],
                longitude: events[0].location[1],
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }}
                     showsPointsOfInterest={true}
                     showsUserLocation={true}
                     style={StyleSheet.absoluteFill}>
                {events.map((e, index) => {
                        return <MapView.Marker ref={`mapViewMarker${index}`} key={`coordinate_${index}`}
                                               centerOffset={{x: 5, y: -21}}
                            // title={e.name}
                                               coordinate={{latitude: e.location[0], longitude: e.location[1]}}
                                               onPress={() => this.bounce(index)}>
                            <Animatable.View ref={ref => this[`mapMarker_${index}`] = ref}>
                                <MapMarker source={{uri: e.completed ? e.completed_image_url : e.image_url}}
                                           isCompleted={e.completed}/>
                            </Animatable.View>
                        </MapView.Marker>
                    }
                )}
            </MapView>
        )
    }

    render() {
        const {events} = this.state
        return (
            <SafeAreaView style={{flex: 1, justifyContent: 'space-between', alignItems: 'center',}}>
                {this.renderMapsView()}
                {this.renderPreviewModal(events)}
            </SafeAreaView>
        )
    }

    closeModal() {
        this.setState({isModalVisible: false})
    }

    RenderModalContent(event) {
        {
            //   change this user_completed true false
            return event.completed ? this.renderCompletedModal(event) : this.renderChallengeModal(event)
            // return this.renderChallengeModal(event)
        }
    }

    renderPreviewModal(events) {
        if (events.length < 1) {
            return null
        }
        return (
            <Modal animationIn={'bounceIn'} animationOut={'bounceOut'} isVisible={this.state.isModalVisible}
                   onBackdropPress={this.closeModal}>
                <View style={{borderRadius: 15, flex: 0.6, backgroundColor: "white"}}>
                    <DefaultCancelButton navigation={null} onPress={this.closeModal}/>
                    {this.RenderModalContent(events[this.state.selectedChallengeIndex])}
                </View>
            </Modal>
        )
    }

    renderCompletedModal(event) {
        return (
            <ContainerWithoutSafeAreaView>
                <Grid>
                    <Row size={45}>
                        <View style={styles.Main}>
                            <Image style={styles.modalImage} source={{uri: event.completed_image_url}}/>
                        </View>
                    </Row>
                    <Row size={30}>
                        <LottieView source={require('./../../assets/animations/1798-check-animation.json')} autoPlay
                                    loop={false}/>
                    </Row>
                    <Row size={25}>
                        <Text style={[FontStyles.h1, {textAlign: 'center', marginLeft: 20, marginRight: 20}]}>You've
                            already completed this
                            event</Text>
                    </Row>
                </Grid>
            </ContainerWithoutSafeAreaView>
        )
    }

    renderChallengeModal(event) {
        return (
            <React.Fragment>
                <Grid>
                    <Row size={45}>
                        <View style={styles.Main}>
                            <Image style={styles.modalImage} source={{uri: event.image_url}}/>
                        </View>
                    </Row>
                    <Row size={55}>
                        <ContainerWithoutSafeAreaView>
                            <Row size={60}>
                                <Col>
                                    <View style={{flex: 1, justifyContent: 'space-around'}}>
                                        <Text style={FontStyles.h1}>Here's your event</Text>
                                        <Text style={FontStyles.regular}>{event.name}</Text>
                                        <Text style={FontStyles.small}>{event.description}</Text>
                                    </View>
                                </Col>
                            </Row>
                            <Row size={40}>
                                <Col>
                                    <ButtonV1 title={'Try this challenge'}
                                              onPress={() => this.onTryChallengePressed(event)}/>
                                </Col>
                            </Row>
                        </ContainerWithoutSafeAreaView>
                    </Row>
                </Grid>
            </React.Fragment>
        )
    }

    onTryChallengePressed(event) {
        this.setState({
            isModalVisible: false,
        }, () => {
            setTimeout(() => {
                return this.props.navigation.navigate('EventDetails', {
                    event,
                    // call back to refire the the fetch events
                    onReloadCampaigns: () => this.fetchEvents()
                })
            }, 200)
        })

    }

    async fetchEvents() {
        // look at this
        await this.props.screenProps.store.get(`events?campaign_id=${this.state.campaign_id}&user_id=1`).then(data => {
            this.setState({
                events: data.response
            })
            console.log(data, "campaigns")
        })
    }
}

const styles = StyleSheet.create({
    SafeArea: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0)'
    },
    Main: {
        flex: 1,
    },
    modalImage: {
        width: '100%',
        height: '100%'
    }
})
