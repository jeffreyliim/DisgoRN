import React from "react"
import {Dimensions, Platform, StyleSheet, Text} from "react-native"
import {NavbarStyles} from "../../styles/navbarStyles";
import {DefaultBackButton} from "../../assets/components/buttons/defaultBackButton";
import {DefaultContainer} from "../../assets/components/containers/defaultContainer";
import {Col, Grid, Row} from "react-native-easy-grid";
import {FontStyles} from "../../styles/fontStyles";
import {ButtonV1} from "../../assets/components/buttons/buttonV1";
import {Icon} from "react-native-elements";
import {ImageBox} from "../../assets/components/imageBoxes/imageBox";
import ImagePicker from 'react-native-image-picker';
import {autobind} from "core-decorators";
import Animatable from './../../assets/animations/customAnimations'

const {fontScale, height, width} = Dimensions.get('window')

@autobind
export class EventDetails extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state
        return {
            title: "Your Event Details",
            headerStyle: NavbarStyles.defaultHeaderStyle,
            headerTitleStyle: NavbarStyles.defaultHeaderTitleStyle,
            headerLeft: <DefaultBackButton navigation={navigation}/>
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
            isProcessing: false,
            event: props.navigation.getParam('event'),
            currentLongitude: null,
            currentLatitude: null
        }
    }


    componentDidMount() {
        var that = this;
        //Checking for the permission just after component loaded
        if (Platform.OS === 'ios') {
            this.callLocation(that);
        }
    }

    // dispatching an action based on state change
    componentWillUpdate(nextProps, nextState) {
        //if (nextState.open == true && this.state.open == false) {
        //  this.props.onWillOpen();
        // }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isProcessing !== this.state.isProcessing && this.state.isProcessing === true) {
            this.setState({isProcessing: false,})
            return this.props.navigation.navigate('ImageProcessing')
        }
    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };

        ImagePicker.launchCamera(options, response => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log(response)
                this.props.navigation.navigate('ImageProcessing', {
                    imageResponse: response,
                    event: this.state.event,
                    currentLatitude: this.state.currentLatitude,
                    currentLongitude: this.state.currentLongitude,
                })
            }
        });
    }

    callLocation(that) {
        //alert("callLocation Called");
        navigator.geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                //getting the Longitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);
                //getting the Latitude from the location json
                that.setState({currentLongitude: currentLongitude});
                //Setting state Longitude to re re-render the Longitude Text
                that.setState({currentLatitude: currentLatitude});
                //Setting state Latitude to re re-render the Longitude Text
                console.log(position)
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
        that.watchID = navigator.geolocation.watchPosition((position) => {
            //Will give you the location on location change
            console.log(position);
            const currentLongitude = JSON.stringify(position.coords.longitude);
            //getting the Longitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
            //getting the Latitude from the location json
            that.setState({currentLongitude: currentLongitude});
            //Setting state Longitude to re re-render the Longitude Text
            that.setState({currentLatitude: currentLatitude});
            //Setting state Latitude to re re-render the Longitude Text
        });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    render() {
        const {event} = this.state
        console.log(event)
        return (
            <Animatable.View style={{flex: 1}} animation={"fadeIn"} delay={200} ref={ref => this.view = ref}>
                <DefaultContainer>
                    <Grid>
                        <Row size={3}/>
                        <Row size={35}>
                            <ImageBox source={{uri: event.image_url}}/>
                        </Row>
                        <Row size={32}>
                            <Col>
                                <Row size={40} style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={FontStyles.bold}>You need to find this object and take a photo for
                                        us!</Text>
                                </Row>
                                {/*      todo width        */}
                                <Row size={10}>
                                    <Icon type={'simple-line-icon'} size={15} name={'home'}/>
                                    <Col>
                                        <Text style={[FontStyles.smallBold, {marginLeft: 8}]}>{event.name}</Text>
                                    </Col>
                                </Row>
                                {/*      todo width        */}
                                <Row size={10}>
                                    <Icon type={'simple-line-icon'} size={15} name={'location-pin'}/>
                                    <Col>
                                        <Text style={[FontStyles.smallBold, {marginLeft: 8}]}>{event.description}</Text>
                                    </Col>
                                </Row>
                                <Row size={5}/>
                                <Row size={45}>
                                    <Col style={{justifyContent: 'space-around'}}>
                                        <Text style={FontStyles.regular}>Make sure:</Text>
                                        <Text style={FontStyles.small}>• You have adequate lighting</Text>
                                        <Text style={FontStyles.small}>• Entire item has to be in the photo</Text>
                                        <Text style={FontStyles.small}>• You will have unlimited tries to take the
                                            photo</Text>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row size={20}>
                            <Col style={{justifyContent: 'center'}}>
                                <ButtonV1 title={'Take a photo'} onPress={this.selectPhotoTapped}/>
                            </Col>
                        </Row>
                    </Grid>
                </DefaultContainer>
            </Animatable.View>
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
    },
})
