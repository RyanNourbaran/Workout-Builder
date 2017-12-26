import React from "react";
import { TabNavigator, StackNavigator } from "react-navigation";

import ListView from "../screens/ListView/ListView";
import MainOptions from "../screens/Options/MainOptions";
import Options2 from "../screens/Options/Options2";

export const Root = StackNavigator(
    {
        Tabs: {
            screen: MainOptions,
            navigationOptions: ({ navigation }) => ({
                title: "Pick Your Muscle Groups"
            })
        },
        Options2: {
            screen: Options2,
            navigationOptions: ({ navigation }) => ({
                title: "Customize Your Workout"
            })
        },
        ListView: {
            screen: ListView,
            navigationOptions: ({ navigation }) => ({
                title: "Workout         "
            })
        }
    },
    {
        navigationOptions: {
            headerStyle: {
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "#1d2088",
                backgroundColor: "#e8bb06",
                height: 50
            },
            headerTitleStyle: {
                alignSelf: "center"
            }
        }
    }
);
