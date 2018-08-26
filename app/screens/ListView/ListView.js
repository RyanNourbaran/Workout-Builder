/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import WorkoutList from "./Components/WorkoutList";

export default class ListView extends Component {
    //componentDidMount() {}
    render() {
        return (
            <View style={styles.container}>
                <WorkoutList
                    names={this.props.navigation.state.params.names}
                    equipment={this.props.navigation.state.params.equipment}
                />
                <Button
                    onPress={() =>
                        this.props.navigation.navigate(
                            "Exercise",
                            {
                                workoutType: this.props.navigation.state.params.workoutType,
                                exercises: this.props.navigation.state.params.names,
                                muscle: this.props.navigation.state.params.muscle,
                                equipment: this.props.navigation.state.params.equipment
                            },
                            60
                        )}
                    title="Start Workout"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        height: "100%",
        backgroundColor: "#73CFE6"
    }
});
