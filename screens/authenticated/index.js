import {createStackNavigator} from 'react-navigation'
import {SelectChallenge} from "./SelectChallenge";
import {ChallengeMap} from "./ChallengeMap";
import {ChallengeDetails} from "./ChallengeDetails";

export default createStackNavigator({
    SelectChallenge,
    ChallengeMap,
    ChallengeDetails,
}, {
    initialRouteName: "SelectChallenge"
})
