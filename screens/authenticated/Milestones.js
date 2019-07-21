import React from "react"
import {Dimensions, StyleSheet} from "react-native"
import {NavbarStyles} from "../../styles/navbarStyles";
import {DefaultContainer} from "../../assets/components/containers/defaultContainer";
import {DefaultBackButton} from "../../assets/components/buttons/defaultBackButton";

const {fontScale, height, width} = Dimensions.get('window')

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

            </DefaultContainer>
        )
    }
}

export const colors = {
    'black': '#353B50',
    'white': '#FFFFFF',
    'grey': '#DDDDDD',
    'grey2': 'gray',
    'background': '#FEFEFF',
    'red': '#ED4C67',
    'green': '#1abc9c'
}
const styles = StyleSheet.create({
    SafeArea: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0)'
    },
    Main: {
        flex: 1,
    },
    defaultHeaderStyle: {
        borderBottomWidth: 0,
        shadowOffset: {height: 0.5,},
        shadowColor: colors.grey,
        shadowOpacity: 0.9,
    },
    defaultHeaderTitleStyle: {
        color: colors.black,
        fontSize: 16.00,
        fontWeight: '700',
    },
})
