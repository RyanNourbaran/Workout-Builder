/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { TouchableHighlight, Image } from "react-native";
import ImageButton from "./Components/ImageButton";

import { AppRegistry, StyleSheet, Text, View, Button } from "react-native";
import styles from "./styles.js";

import Create from "./Components/Create";

export default class WorkoutApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bodyParts: [],
            strength: false,
            workout: [""],

            arms: false,
            legs: false,
            back: false,
            shoulders: false,
            chest: false,

            btnColorArms: "dodgerblue",
            btnColorLegs: "dodgerblue",
            btnColorBack: "dodgerblue",
            btnColorShoulders: "dodgerblue",
            btnColorChest: "dodgerblue",
            test: "tests"
        };
    }
    changeArms() {
        const newBool = !this.state.arms;
        if (this.state.btnColorArms == "dodgerblue") {
            this.setState({
                btnColorArms: "royalblue"
            });
        } else {
            this.setState({
                btnColorArms: "dodgerblue"
            });
        }

        this.setState(
            {
                arms: newBool
            },
            function() {
                this.addMuscle("arms");
            }
        );
    }
    changeLegs() {
        const newBool = !this.state.legs;
        if (this.state.btnColorLegs == "dodgerblue") {
            this.setState({
                btnColorLegs: "royalblue"
            });
        } else {
            this.setState({
                btnColorLegs: "dodgerblue"
            });
        }
        this.setState(
            {
                legs: newBool
            },
            function() {
                this.addMuscle("legs");
            }
        );
    }
    changeBack() {
        const newBool = !this.state.back;
        if (this.state.btnColorBack == "dodgerblue") {
            this.setState({
                btnColorBack: "royalblue"
            });
        } else {
            this.setState({
                btnColorBack: "dodgerblue"
            });
        }
        this.setState(
            {
                back: newBool
            },
            function() {
                this.addMuscle("back");
            }
        );
    }
    changeShoulders() {
        const newBool = !this.state.shoulders;
        if (this.state.btnColorShoulders == "dodgerblue") {
            this.setState({
                btnColorShoulders: "royalblue"
            });
        } else {
            this.setState({
                btnColorShoulders: "dodgerblue"
            });
        }
        this.setState(
            {
                shoulders: newBool
            },
            function() {
                this.addMuscle("shoulders");
            }
        );
    }
    changeChest() {
        const newBool = !this.state.chest;
        if (this.state.btnColorChest == "dodgerblue") {
            this.setState({
                btnColorChest: "royalblue"
            });
        } else {
            this.setState({
                btnColorChest: "dodgerblue"
            });
        }
        this.setState(
            {
                chest: newBool
            },
            function() {
                this.addMuscle("chest");
            }
        );
    }
    addMuscle(bodypart) {
        let oldState = this.state.bodyParts.slice();
        if (this.state[bodypart]) {
            oldState.push(bodypart);
            this.setState({
                bodyParts: oldState
            });
        } else {
            for (var i = 0; i < oldState.length; i++) {
                if (bodypart === oldState[i]) {
                    oldState.splice(i, 1); //removes from list
                    this.setState({
                        bodyParts: oldState
                    });
                    break;
                }
            }
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text />
                <View style={styles.bodybuttons}>
                    <Button
                        onPress={this.changeArms.bind(this)}
                        title="Arms"
                        color={this.state.btnColorArms}
                    />
                    <Text />
                    <TouchableHighlight onPress={this.changeLegs.bind(this)} activeOpacity={1}>
                        <Image style={styles.btn} source={require("../imgs/Legs.jpg")} />
                    </TouchableHighlight>
                    <Text />
                    <TouchableHighlight onPress={this.changeShoulders.bind(this)} activeOpacity={1}>
                        <Image style={styles.btn} source={require("../imgs/Shoulders.jpg")} />
                    </TouchableHighlight>
                    <Text />
                    <TouchableHighlight onPress={this.changeBack.bind(this)} activeOpacity={1}>
                        <Image style={styles.btn} source={require("../imgs/Back.jpg")} />
                    </TouchableHighlight>
                    <Text />
                    <TouchableHighlight onPress={this.changeChest.bind(this)} activeOpacity={1}>
                        <Image style={styles.btn} source={require("../imgs/Chest.jpg")} />
                    </TouchableHighlight>
                    <Text />
                    <TouchableHighlight onPress={this.changeArms.bind(this)} activeOpacity={1}>
                        <Image style={styles.btn} source={require("../imgs/Arms.jpg")} />
                    </TouchableHighlight>
                </View>
                <Text />
                <Create bodyParts={this.state.bodyParts} navigation={this.props.navigation} />
            </View>
        );
    }
}

AppRegistry.registerComponent("workoutapp", () => workoutapp);
