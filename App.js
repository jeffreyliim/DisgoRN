import React, {Component} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {autobind} from 'core-decorators'
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import AuthenticatedStack from "./screens/authenticated";
import {Store} from "./api/store";
import {Test} from "./screens/test";

const RootSwitchStack = createSwitchNavigator({
    AuthenticatedStack,
}, {
    initialRouteName: 'AuthenticatedStack',
    headerMode: 'none'
});

const RootAppContainer = createAppContainer(RootSwitchStack);

@autobind
export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            readyToRoll: false,
            isTesting: false,
            store: new Store(),
        };
    }

    async initProjectRequirements() {
        this.setState({
            readyToRoll: true,
        })
    }

    componentDidMount() {
        this.initProjectRequirements();
    }

    render() {
        if (this.state.readyToRoll) {
            if (this.state.isTesting) {
                return (
                    <View style={styles.container}>
                        <Test/>
                    </View>
                );
            } else {
                return (
                    <View style={styles.container}>
                        <StatusBar barStyle={'dark-content'}/>
                        <RootAppContainer screenProps={{
                            store: this.state.store,
                        }}/>
                    </View>
                );
            }
        }
        return null;
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
