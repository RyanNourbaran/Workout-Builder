/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { TouchableOpacity, Image } from "react-native";

import { AppRegistry, StyleSheet, Text, View, Button } from "react-native";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from "react-native-table-component";

import styles from "./styles.js";

import MuscleButton from "./Components/MuscleButton";
import Create from "./Components/Create";

export default class MainOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bodyParts: [],
            strength: false
        };
    }
    addMuscle(bodypart) {
        let oldState = this.state.bodyParts.slice();

        if (oldState.length == 0) {
            oldState.push(bodypart);
            this.setState({
                bodyParts: oldState
            });
            return;
        } else {
            for (var i = 0; i < this.state.bodyParts.length; i++) {
                if (bodypart === oldState[i]) {
                    oldState.splice(i, 1); //removes from list
                    this.setState({
                        bodyParts: oldState
                    });
                    break;
                }
                if (i == oldState.length - 1) {
                    oldState.push(bodypart);
                    this.setState({
                        bodyParts: oldState
                    });
                }
            }
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.BtnRow}>
                    <MuscleButton
                        addMuscle={this.addMuscle.bind(this)}
                        img={require("../../imgs/Legs.jpg")}
                        muscle={"legs"}
                    />
                    <MuscleButton
                        addMuscle={this.addMuscle.bind(this)}
                        img={require("../../imgs/Shoulders2.jpg")}
                        muscle={"shoulders"}
                    />
                </View>
                <View style={styles.BtnRow}>
                    <MuscleButton
                        addMuscle={this.addMuscle.bind(this)}
                        img={require("../../imgs/Back.jpg")}
                        muscle={"back"}
                    />
                </View>
                <View style={styles.BtnRow}>
                    <MuscleButton
                        addMuscle={this.addMuscle.bind(this)}
                        img={require("../../imgs/Chest.jpg")}
                        muscle={"chest"}
                    />
                    <MuscleButton
                        addMuscle={this.addMuscle.bind(this)}
                        img={require("../../imgs/Arms.jpg")}
                        muscle={"arms"}
                    />
                </View>
                <Button
                    onPress={() =>
                        this.props.navigation.navigate(
                            "Options2",
                            {
                                bodyParts: this.state.bodyParts
                            },
                            60
                        )}
                    title="Next: Customize Workout"
                />
            </View>
        );
    }
}

AppRegistry.registerComponent("workoutapp", () => workoutapp);
