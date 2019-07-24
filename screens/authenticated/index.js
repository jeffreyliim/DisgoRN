import {createStackNavigator} from 'react-navigation'
import {SelectChallenge} from "./SelectChallenge";
import {ChallengeMap} from "./ChallengeMap";
import {EventDetails} from "./EventDetails";
import {Milestones} from "./Milestones";
import {ImageProcessing} from "./ImageProcessing";
import {EventResults} from "./EventResults";

export default createStackNavigator({
    SelectChallenge,
    ChallengeMap,
    EventDetails,
    Milestones,
    ImageProcessing,
    EventResults,
}, {
    initialRouteName: "SelectChallenge"
})
