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

const {fontScale, height, width} = Dimensions.get('window')

export class ChallengeDetails extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state
        return {
            title: "Your Challenge Details",
            headerStyle: NavbarStyles.defaultHeaderStyle,
            headerTitleStyle: NavbarStyles.defaultHeaderTitleStyle,
            headerLeft: <DefaultBackButton navigation={navigation}/>
        }
    }

    constructor(props) {
        super(props);

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
                            <ButtonV1 title={'Take a photo'}/>
                        </Col>
                    </Row>
                </Grid>
            </DefaultContainer>
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
