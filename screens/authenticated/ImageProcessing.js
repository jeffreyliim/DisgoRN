import React from "react"
import {Dimensions, Platform, StatusBar, StyleSheet} from "react-native"
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
import RNFS from "react-native-fs";
import {API_URL} from "../../config/config";

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
            imageResponse: props.navigation.getParam('imageResponse'),
            event: props.navigation.getParam('event'),
            currentLatitude: props.navigation.getParam('currentLatitude'),
            currentLongitude: props.navigation.getParam('currentLongitude'),
            uploadResponse: {}
        }
    }


    componentDidMount() {
        this.handleUploadPhoto()
        // console.log(this.state.imageResponse)
        // console.log(this.state.imageResponse)
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

    createFormData = (photo, body) => {
        const data = new FormData();

        data.append('file', {
            uri: Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", ""),
            name: `${photo.fileSize}_${Math.random().toString(10)}.jpeg`,
            type: photo.type,
        });

        Object.keys(body).forEach(key => {
            data.append(key, body[key]);
        });

        return data;
    };

    handleUploadPhoto = () => {
        fetch(`${API_URL}submit_image`, {
            method: "POST",
            body: this.createFormData(this.state.imageResponse, {
                event_id: this.state.event.event_id,
                user_id: 1,
                campaign_id: this.state.event.campaign_id,
                latitude: this.state.currentLatitude,
                longtitude: this.state.currentLongitude
            }),
        }).then(response => {
            response.json().then(data => {
                console.log(data)
                this.setState({
                    uploadResponse: data
                })
                if (data.status === 0) {
                    return this.handleUploadPhotoFailedResponse()
                }
                if (data.response.success === false) {
                    return this.handleUploadPhotoFailedResponse()
                }
                this.handleUploadPhotoSuccessResponse()
            })
        }).catch(error => {
            console.log("upload error", error);
            this.handleUploadPhotoFailedResponse()
        });
    }

    handleUploadPhotoFailedResponse() {
        this.setState({
            showFailAlert: true,
        })
    }

    handleUploadPhotoSuccessResponse() {
        this.setState({
            showSuccessAlert: true,
        })
    }

    renderImageComparison(event) {
        return (
            <View style={{flex: 1}}>
                <Row style={styles.lottie}>
                    <Col style={{paddingRight: 20}}>
                        <ImageBox source={{uri: event.image_url}}/>
                    </Col>
                    <Col>
                        <ImageBox source={{uri: this.state.imageResponse.uri}}/>
                    </Col>
                </Row>
            </View>
        )
    }

    render() {
        const {showSuccessAlert, showFailAlert, imageResponse, event, uploadResponse} = this.state

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
                                : showFailAlert ? this.renderImageComparison(event) :
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
                                    showFailAlert ? uploadResponse.response.message : 'Please be patient while we process your image... Do not close the app'}</Text>
                        </Col>
                    </Row>
                    <Row size={30}>
                        {showFailAlert ?
                            <Col style={[styles.Main, {alignItems: 'stretch'}]}>
                                <ButtonV2 title={'Try again'} onPress={this.onTryAgainPressed}/>
                            </Col>
                            : showSuccessAlert ? <Col style={[styles.Main, {alignItems: 'stretch'}]}>
                                <ButtonV2 title={'See your results'} onPress={this.onSeeYourResults}/>
                            </Col> : null}
                    </Row>
                </Animatable.View>
            </DefaultContainer>
        )
    }

    onTryAgainPressed() {
        RNFS.unlink(this.state.imageResponse.uri); // Remove image from cache

        // temporary here only, pls remove when integrating
        // this.setState({
        //     imageResponse: null
        // })
        return this.props.navigation.navigate('EventDetails')
    }

    onSeeYourResults() {
        RNFS.unlink(this.state.imageResponse.uri); // Remove image from cache
        this.setState({
            showSuccessAlert: false,
            showFailAlert: false,
            imageResponse: null
        })
        return this.props.navigation.navigate('EventResults')
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
