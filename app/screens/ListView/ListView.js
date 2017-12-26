/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import WorkoutList from "./Components/WorkoutList";

export default class ListView extends Component {
    componentDidMount() {
        console.log(this.props.navigation.state.params.names);
    }
    render() {
        return (
            <View style={styles.container}>
                <WorkoutList
                    names={this.props.navigation.state.params.names}
                    equipment={this.props.navigation.state.params.equipment}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
