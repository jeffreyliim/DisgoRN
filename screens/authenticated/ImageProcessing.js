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
            imageResponse: props.navigation.getParam('imageResponse')
        }
    }


    componentDidMount() {
        this.handleUploadPhoto()
        // console.log(this.state.imageResponse)
        setTimeout(() => {
            this.setState({showFailAlert: true,})
        }, 3000)
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
        data.append('photo', {
            uri: photo.uri,
            name: `${photo.fileSize}_${Math.random().toString(10)}.jpeg`,
            type: photo.type,
        });

        return data;
    };

    handleUploadPhoto = async () => {
        await fetch(`${API_URL}/uploader`, {
            method: "POST",
            body: this.createFormData(this.state.imageResponse, null)
        }).then(response => {
            alert("Upload success!");
            response.json().then(data => {
                console.log(data)
                this.setState({imageResponse: null});
            })
        }).catch(error => {
            console.log("upload error", error);
            alert("Upload failed!");
        });
    }

    handleUploadPhotoFailedResponse() {
        this.setState({
            showFailAlert: true,
        }, () => {
            // delete image
            RNFS.unlink(this.state.imageResponse.uri); // Remove image from cache
        })
    }

    handleUploadPhotoSuccessResponse() {
        this.setState({
            showSuccessAlert: true,
        }, () => {
            // delete image
            RNFS.unlink(this.state.imageResponse.uri); // Remove image from cache
        })
    }

    renderImageComparison() {
        return (
            <View style={{flex: 1}}>
                <Row style={styles.lottie}>
                    <Col style={{paddingRight: 20}}>
                        <ImageBox source={require('./../../assets/images/durian.jpg')}/>
                    </Col>
                    <Col>
                        <ImageBox source={{uri: this.state.imageResponse.uri}}/>
                    </Col>
                </Row>
            </View>
        )
    }

    render() {
        const {showSuccessAlert, showFailAlert, imageResponse} = this.state

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
        this.setState({
            showSuccessAlert: true
        })
        // return this.props.navigation.navigate('EventDetails')
    }

    onSeeYourResults() {
        this.setState({
            showSuccessAlert: false,
            showFailAlert: false,
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
