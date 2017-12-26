/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { TouchableOpacity, Image } from "react-native";

export default class MuscleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false
        };
    }
    change() {
        const newBool = !this.state.clicked;

        this.setState(
            {
                clicked: newBool
            },
            function() {
                this.props.addMuscle(this.props.muscle);
            }
        );
    }
    render() {
        let muscle = this.props.muscle;
        muscle = muscle[0].toUpperCase() + muscle.slice(1);

        return (
            <View style={styles.container}>
                <View style={this.state.clicked ? styles.clicked : styles.unclicked}>
                    <TouchableOpacity onPress={this.change.bind(this)} activeOpacity={100}>
                        <Image style={styles.btn} source={this.props.img} />
                    </TouchableOpacity>
                </View>
                <Text style={this.state.clicked ? styles.txtclicked : styles.txtunclicked}>
                    {muscle}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: -3
    },
    btn: {
        borderWidth: 0.5,
        borderRadius: 20,
        borderColor: "dodgerblue",
        width: 100,
        height: 100
    },
    txtclicked: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        color: "#8e8a09"
    },
    txtunclicked: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold"
    },
    unclicked: {
        borderRadius: 20,
        width: 110,
        height: 110,
        backgroundColor: "#086788",
        justifyContent: "center",
        alignItems: "center"
    },
    clicked: {
        borderRadius: 20,
        width: 110,
        height: 110,
        backgroundColor: "#e8bb06",
        justifyContent: "center",
        alignItems: "center"
    }
});
