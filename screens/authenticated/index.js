import {createStackNavigator} from 'react-navigation'
import {SelectChallenge} from "./SelectChallenge";
import {ChallengeMap} from "./ChallengeMap";
import {ChallengeDetails} from "./ChallengeDetails";
import {Milestones} from "./Milestones";
import {ImageProcessing} from "./ImageProcessing";
import {ChallengeResults} from "./ChallengeResults";

export default createStackNavigator({
    SelectChallenge,
    ChallengeMap,
    ChallengeDetails,
    Milestones,
    ImageProcessing,
    ChallengeResults,
}, {
    initialRouteName: "SelectChallenge"
})
