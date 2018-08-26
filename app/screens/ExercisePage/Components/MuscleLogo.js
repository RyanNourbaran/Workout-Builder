/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default class MuscleLogo extends Component {
    constructor(props) {
        super(props);
        this.muscleLogo = this.muscleLogo.bind(this);
    }
    muscleLogo() {
        console.log(this.props.muscle);
        switch (this.props.muscle) {
            case "legs":
            case "calves":
                return <Image style={styles.img} source={require("../../../imgs/Legs.jpg")} />;
                break;
            case "shoulders":
            case "traps":
                return (
                    <Image style={styles.img} source={require("../../../imgs/Shoulders2.jpg")} />
                );
                break;
            case "back":
                return <Image style={styles.img} source={require("../../../imgs/Back.jpg")} />;
                break;
            case "chest":
                return <Image style={styles.img} source={require("../../../imgs/Chest.jpg")} />;

                break;
            case "arms":
            case "forearms":
                return <Image style={styles.img} source={require("../../../imgs/Arms.jpg")} />;
                break;
            default:
                return null;
        }
    }
    render() {
        const muscle = this.props.muscle[0].toUpperCase() + this.props.muscle.slice(1);
        return (
            <View style={styles.container}>
                <View>
                    {this.muscleLogo()}
                    {/*<Text style={styles.txt}>
                        {muscle}
                    </Text>*/}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    img: {
        borderWidth: 5,
        borderRadius: 20,
        width: 120,
        height: 120,
        borderColor: "#086788"
    },
    txt: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold"
    }
});
