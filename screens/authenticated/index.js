import {createStackNavigator} from 'react-navigation'
import {SelectChallenge} from "./SelectChallenge";
import {ChallengeMap} from "./ChallengeMap";
import {ChallengeDetails} from "./ChallengeDetails";
import {Milestones} from "./Milestones";

export default createStackNavigator({
    SelectChallenge,
    ChallengeMap,
    ChallengeDetails,
    Milestones,
}, {
    initialRouteName: "SelectChallenge"
})
