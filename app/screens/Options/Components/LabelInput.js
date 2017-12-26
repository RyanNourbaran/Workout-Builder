/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class LabelInput extends Component {
    render() {
        return (
            <View style={styles.time}>
                <Text style={styles.texts}> Length of Workout (min): </Text>
                <TextInput
                    style={styles.textInput}
                    keyboardType="numeric"
                    onChangeText={text => this.setState({ lengthOfWorkout: text })}
                    maxLength={2}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    time: {
        alignItems: "center",
        flexDirection: "row"
    }
});
