import React from "react"
import {Dimensions, StyleSheet} from "react-native"
import {NavbarStyles} from "../../styles/navbarStyles";
import {DefaultContainer} from "../../assets/components/containers/defaultContainer";
import {ButtonV1} from "../../assets/components/buttons/buttonV1";
import {autobind} from "core-decorators";

const {fontScale, height, width} = Dimensions.get('window')

@autobind
export class EventResults extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state
        return {
            title: "Results",
            headerStyle: NavbarStyles.defaultHeaderStyle,
            headerTitleStyle: NavbarStyles.defaultHeaderTitleStyle,
            headerLeft: null,
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
    // dk if we're actually doing this
        return (
            <DefaultContainer>
                <ButtonV1 title={'Home'} onPress={this.onSelectChallengePressed}/>
            </DefaultContainer>
        )
    }

    onSelectChallengePressed() {
        return this.props.navigation.navigate('SelectChallenge')
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
