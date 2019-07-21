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
            challenges: [
                {
                    id: 1,
                    latitude: 1.328482,
                    longitude: 103.804085,
                    completed: true,
                },
                {
                    id: 2,
                    latitude: 1.3004,
                    longitude: 103.8384,
                    completed: false,
                }
            ],
            selectedChallengeIndex: 0,
        }
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

    bounce(index) {
        this[`mapMarker_${index}`].bounceCustom1(500).then(endState => this.openDetailsModal(endState, index))
    }

    openDetailsModal(endState, index) {
        return endState.finished ? this.setState({isModalVisible: true, selectedChallengeIndex: index}) : null
    }

    renderMapsView() {
        const {challenges} = this.state
        const LATITUDE_DELTA = (challenges[0].latitude / challenges[0].longitude) * 30
        const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

        return (
            <MapView initialRegion={{
                latitude: challenges[0].latitude,
                longitude: challenges[0].longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }}
                     showsPointsOfInterest={true}
                     style={StyleSheet.absoluteFill}>
                {challenges.map((coordinate, index) => {
                        return <MapView.Marker ref={`mapViewMarker${index}`} key={`coordinate_${index}`}
                                               centerOffset={{x: 5, y: -21}}
                                               title={coordinate.title}
                                               coordinate={coordinate} onPress={() => this.bounce(index)}>
                            <Animatable.View ref={ref => this[`mapMarker_${index}`] = ref}>
                                <MapMarker source={require('../../assets/images/durian.jpg')}
                                           isCompleted={coordinate.completed}/>
                            </Animatable.View>
                        </MapView.Marker>
                    }
                )}
            </MapView>
        )
    }

    render() {
        const {challenges} = this.state
        return (
            <SafeAreaView style={{flex: 1, justifyContent: 'space-between', alignItems: 'center',}}>
                {this.renderMapsView()}
                {this.renderPreviewModal(challenges)}
            </SafeAreaView>
        )
    }

    closeModal() {
        this.setState({isModalVisible: false})
    }

    RenderModalContent(challenge) {
        {
            return challenge.completed ? this.renderCompletedModal(challenge) : this.renderChallengeModal(challenge)
        }
    }

    renderPreviewModal(challenges) {
        return (
            <Modal animationIn={'bounceIn'} animationOut={'bounceOut'} isVisible={this.state.isModalVisible}
                   onBackdropPress={this.closeModal}>
                <View style={{borderRadius: 15, flex: 0.6, backgroundColor: "white"}}>
                    <DefaultCancelButton navigation={null} onPress={this.closeModal}/>
                    {this.RenderModalContent(challenges[this.state.selectedChallengeIndex])}
                </View>
            </Modal>
        )
    }

    renderCompletedModal(challenge) {
        return (
            <ContainerWithoutSafeAreaView>
                <Grid>
                    <Row size={10}>
                    </Row>
                    <Row size={55}>
                        <LottieView source={require('./../../assets/animations/1798-check-animation.json')} autoPlay
                                    loop={false}/>
                    </Row>
                    <Row size={35}>
                        <Text style={[FontStyles.h1, {textAlign: 'center', marginLeft: 20, marginRight: 20}]}>You've
                            already completed this
                            challenge</Text>
                    </Row>
                </Grid>
            </ContainerWithoutSafeAreaView>
        )
    }

    renderChallengeModal(challenge) {
        return (
            <React.Fragment>
                <Grid>
                    <Row size={45}>
                        <View style={styles.Main}>
                            <Image style={styles.modalImage} source={require('./../../assets/images/durian.jpg')}/>
                        </View>
                    </Row>
                    <Row size={55}>
                        <ContainerWithoutSafeAreaView>
                            <Row size={60}>
                                <Col>
                                    <View style={{flex: 1, justifyContent: 'space-around'}}>
                                        <Text style={FontStyles.h1}>Here's your challenge</Text>
                                        <Text style={FontStyles.regular}>Restaurant ABC</Text>
                                        <Text style={FontStyles.small}>Find out how to win a 20% discount off your next
                                            CirclesLife bill.</Text>
                                    </View>
                                </Col>
                            </Row>
                            <Row size={40}>
                                <Col>
                                    <ButtonV1 title={'Try this challenge'}
                                              onPress={() => this.onTryChallengePressed(challenge)}/>
                                </Col>
                            </Row>
                        </ContainerWithoutSafeAreaView>
                    </Row>
                </Grid>
            </React.Fragment>
        )
    }

    onTryChallengePressed(challenge) {
        this.setState({
            isModalVisible: false,
        }, () => {
            setTimeout(() => {
                return this.props.navigation.navigate('ChallengeDetails', {
                    challenge
                })
            }, 200)
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
