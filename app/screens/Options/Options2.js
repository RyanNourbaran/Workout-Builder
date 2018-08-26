/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { TouchableOpacity, Image } from "react-native";

import { AppRegistry, StyleSheet, Text, View, Button, KeyboardAvoidingView } from "react-native";
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
    render() {
        return (
            <KeyboardAvoidingView behaviour="height" style={styles.container}>
                <View style={styles.BtnRow}>
                    <Create
                        bodyParts={this.props.navigation.state.params.bodyParts}
                        navigation={this.props.navigation}
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

AppRegistry.registerComponent("workoutapp", () => workoutapp);
