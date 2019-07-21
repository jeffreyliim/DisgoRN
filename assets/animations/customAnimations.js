import * as Animatable from 'react-native-animatable';

Animatable.initializeRegistryWithDefinitions({
    bounceCustom1: {
        0: {
            translateY: 0,
        },
        0.3: {
            translateY: -8,
        },
        0.4: {
            translateY: -15
        },
        0.53: {
            translateY: -10,
        },
        0.8: {
            translateY: 0,
        },
        0.9: {
            translateY: -4,
        },
        1: {
            translateY: 0,
        },
    }
});

export default Animatable
