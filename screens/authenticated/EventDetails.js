import React from "react"
import {Dimensions, StyleSheet, Text} from "react-native"
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
                let source = {uri: response.uri};
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });

                console.log(response)
                this.props.navigation.navigate('ImageProcessing', {
                    imageResponse: response,
                })
            }
        });
    }


    render() {

        return (
            <DefaultContainer>
                <Grid>
                    <Row size={3}/>
                    <Row size={35}>
                        <ImageBox source={require('../../assets/images/durian.jpg')}/>
                    </Row>
                    <Row size={32}>
                        <Col>
                            <Row size={40} style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={FontStyles.bold}>You need to find this object and take a photo for
                                    us!</Text>
                            </Row>
                            <Row size={10}>
                                <Icon type={'simple-line-icon'} size={15} name={'location-pin'}/>
                                <Col>
                                    <Text style={[FontStyles.smallBold, {marginLeft: 8}]}>Henderson Road 221, Singapore
                                        159557</Text>
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
                            <ButtonV1 title={"Fire test mocky api"} onPress={this.onGetMocky}/>
                            <ButtonV1 title={'Take a photo'} onPress={this.selectPhotoTapped}/>
                        </Col>
                    </Row>
                </Grid>
            </DefaultContainer>
        )
    }

    onGetMocky() {
        return new Promise(async (resolve, reject) => {
            await fetch("http://www.mocky.io/v2/5185415ba171ea3a00704eed", {
                method: "GET"
            }).then(res => {
                res.json().then(data => {
                    console.log(data)
                })
                resolve()
            }).catch(err => {
                console.log(err)
            })
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
})
