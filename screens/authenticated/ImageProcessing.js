import React from "react"
import {Dimensions, StatusBar, StyleSheet} from "react-native"
import {FontStyles} from "../../styles/fontStyles";
import {DefaultContainer} from "../../assets/components/containers/defaultContainer";
import {moderateScale} from "react-native-size-matters";
import LottieView from "lottie-react-native";
import {autobind} from "core-decorators";
import {ImageBox} from "../../assets/components/imageBoxes/imageBox";
import {Text, View,} from "react-native-animatable";
import {Col, Row} from "react-native-easy-grid";
import {ButtonV2} from "../../assets/components/buttons/buttonV2";
import Animatable from './../../assets/animations/customAnimations'

const {fontScale, height, width} = Dimensions.get('window')

@autobind
export class ImageProcessing extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state
        return {
            header: null,
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            showSuccessAlert: false,
            showFailAlert: false,
        }
    }


    componentDidMount() {
        setTimeout(() => {
            this.setState({showFailAlert: true,})
        }, 3000)
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
        if (prevState.showSuccessAlert !== this.state.showSuccessAlert && this.state.showSuccessAlert === true) {
            this.setState({
                showSuccessAlert: this.state.showSuccessAlert,
                showFailAlert: false,
            })
            this.view.fadeInUp()
        }
        if (prevState.showFailAlert !== this.state.showFailAlert && this.state.showFailAlert === true) {
            this.setState({
                showFailAlert: this.state.showFailAlert,
                showSuccessAlert: false,
            })
            this.view.bounceIn()
        }
    }

    renderImageComparison() {
        return (
            <View style={{flex: 1}}>
                <Row style={styles.lottie}>
                    <Col style={{paddingRight: 20}}>
                        <ImageBox source={require('./../../assets/images/durian.jpg')}/>
                    </Col>
                    <Col>
                        <ImageBox source={require('./../../assets/images/durian.jpg')}/>
                    </Col>
                </Row>
            </View>
        )
    }

    render() {
        const {showSuccessAlert, showFailAlert} = this.state

        return (
            <DefaultContainer backgroundColor={'#0099FF'}>
                <StatusBar barStyle={'light-content'}/>
                <Animatable.View ref={ref => this.view = ref} delay={500} duration={1500}
                                 style={{flex: 1}}>
                    <Row size={20}/>
                    <Row size={30}>
                        <Col style={styles.Main}>
                            {showSuccessAlert ? <LottieView style={styles.lottie}
                                                            source={require('./../../assets/animations/4022-success-animation.json')}
                                                            autoPlay={true}
                                                            loop={false}/>
                                : showFailAlert ? this.renderImageComparison() :
                                    <LottieView style={styles.lottie}
                                                source={require('./../../assets/animations/7655-rocket.json')}
                                                autoPlay={true}
                                                loop={true}/>
                            }
                        </Col>
                    </Row>
                    <Row size={10}>
                        <Col style={styles.Main}>
                            <Text style={[FontStyles.bold, {
                                width: '82%',
                                textAlign: 'center',
                                color: 'white'
                            }]}>
                                {showSuccessAlert ? 'Yay, your image has passed' :
                                    showFailAlert ? `Oh no, it seems like the image you've sent is not good enough` : 'Please be patient while we process your image... Do not close the app'}</Text>
                        </Col>
                    </Row>
                    <Row size={30}>
                        {showFailAlert ?
                            <Col style={[styles.Main, {alignItems: 'stretch'}]}>
                                <ButtonV2 title={'Try again'} onPress={() => {
                                    // temporary here only, pls remove when integrating
                                    this.setState({
                                        showSuccessAlert: true
                                    })
                                    // return this.props.navigation.navigate('ChallengeDetails')
                                }}/>
                            </Col>
                            : showSuccessAlert ? <Col style={[styles.Main, {alignItems: 'stretch'}]}>
                                <ButtonV2 title={'See your results'} onPress={() => {
                                    // this.setState({
                                    //     showSuccessAlert: false,
                                    //     showFailAlert: false,
                                    // })
                                    return this.props.navigation.navigate('ChallengeResults')
                                }}/>
                            </Col> : null}
                    </Row>
                </Animatable.View>
            </DefaultContainer>
        )
    }
}

const styles = StyleSheet.create({
    Main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lottie: {
        height: moderateScale(200),
        width: moderateScale(300),
    },
})
