import React from "react"
import {Dimensions, StyleSheet} from "react-native"
import {NavbarStyles} from "../styles/navbarStyles";
import {View} from "react-native-animatable";
import {DefaultBackButton} from "../assets/components/buttons/defaultBackButton";

const {fontScale, height, width} = Dimensions.get('window')

export class Test extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title: `test`,
        headerStyle: NavbarStyles.defaultHeaderStyle,
        headerTitleStyle: NavbarStyles.defaultHeaderTitleStyle,
        headerLeft: <DefaultBackButton navigation={navigation}/>
    })

    constructor(props) {
        super(props);
        this.state = {}
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
            <View/>

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
    header: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderBottomWidth: 0,
    },
    navigationBarItem: {
        color: "rgba(255, 255, 255, 1)",
        fontSize: 16.00,
        fontFamily: "SFProDisplay-Thin"
    },
})
