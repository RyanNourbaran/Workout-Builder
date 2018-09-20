/*
* Shows each workout exercise one at a time
*/

import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationActions } from "react-navigation";

import Modal from "react-native-modal";
import CheckBox from "react-native-checkbox";

import MuscleLogo from "./Components/MuscleLogo";

export default class Exercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            modalVisible: false,
            set1: false,
            set2: false,
            set3: false,
            set4: false,
            set5: false
        };
    }
    nextExercise() {
        if (this.props.navigation.state.params.exercises.length != this.state.index + 1) {
            this.setState({
                index: this.state.index + 1
            });
        }
        this.setState({
            set1: false,
            set2: false,
            set3: false,
            set4: false,
            set5: false
        });
    }
    prevExercise() {
        if (0 != this.state.index) {
            this.setState({
                index: this.state.index - 1
            });
        }
        this.setState({
            set1: false,
            set2: false,
            set3: false,
            set4: false,
            set5: false
        });
    }
    toggleModal() {
        this.setState({
            modalVisible: true
        });
    }

    returnHome() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "Tabs" })]
        });
        this.props.navigation.dispatch(resetAction);
    }
    render() {
        let finishMessages = [
            "Good Job!",
            "Well Done!",
            "Next Stop, Gains-Town!",
            "Nicely Done!",
            "Way to Go!"
        ];
        let num = Math.floor(Math.random() * finishMessages.length);

        let numReps;
        let numSets;
        switch (this.props.navigation.state.params.workoutType) {
            case "strength":
                numReps = "4-8";
                numSets = 5;
                break;
            case "size":
                numReps = "8-12";
                numSets = 3;
                break;
            case "endurance":
                numReps = "15-20";
                numSets = 3;
                break;
            default:
        }
        return (
            <View style={styles.container}>
                <View style={[styles.exerciseInfoRow, { flex: 0 }]}>
                    <Text style={styles.header}>
                        {this.props.navigation.state.params.exercises[this.state.index]}
                    </Text>
                </View>
                <View style={[styles.exerciseInfoRow, { flex: 1.5 }]}>
                    <MuscleLogo
                        muscle={this.props.navigation.state.params.muscle[this.state.index]}
                    />
                </View>
                <View style={[styles.exerciseInfoRow, { flex: 2, paddingBottom: 50 }]}>
                    <View style={styles.exerciseInfoCol}>
                        <Text style={styles.title}>Muscle Group:</Text>
                        <Text style={styles.title}>Equipment Used:</Text>
                        <Text style={styles.title}>Repetitions per Set:</Text>
                    </View>
                    <View style={styles.exerciseInfoCol}>
                        <Text style={styles.texts}>
                            {this.props.navigation.state.params.muscle[
                                this.state.index
                            ][0].toUpperCase() +
                                this.props.navigation.state.params.muscle[this.state.index].slice(
                                    1
                                )}
                        </Text>
                        <Text style={styles.texts}>
                            {this.props.navigation.state.params.equipment[this.state.index]}
                        </Text>
                        <Text style={styles.texts}>
                            {numReps}
                        </Text>
                    </View>
                </View>
                {/*<View style={styles.exerciseInfoRow}>
                    <Text style={styles.title}>Muscle Group:</Text>
                    <Text style={styles.texts}>
                        {this.props.navigation.state.params.muscle[
                            this.state.index
                        ][0].toUpperCase() +
                            this.props.navigation.state.params.muscle[this.state.index].slice(1)}
                    </Text>
                </View>
                <View style={styles.exerciseInfoRow}>
                    <Text style={styles.title}>Equipment Used:</Text>
                    <Text style={styles.texts}>
                        {this.props.navigation.state.params.equipment[this.state.index]}
                    </Text>
                </View>
                <View style={styles.exerciseInfoRow}>
                    <Text style={styles.title}>Repetitions per Set:</Text>
                    <Text style={styles.texts}>
                        {numReps}
                    </Text>
                </View>*/}

                <View style={[styles.exerciseInfoRow, { flex: 0.5 }]}>
                    <CheckBox
                        label="Set 1"
                        labelBefore={true}
                        checked={this.state.set1}
                        onChange={checked => this.setState({ set1: !checked })}
                        labelStyle={styles.checkboxText}
                    />
                    <CheckBox
                        label="Set 2"
                        labelBefore={true}
                        checked={this.state.set2}
                        onChange={checked => this.setState({ set2: !checked })}
                        labelStyle={styles.checkboxText}
                    />
                    <CheckBox
                        label="Set 3"
                        labelBefore={true}
                        checked={this.state.set3}
                        onChange={checked => this.setState({ set3: !checked })}
                        labelStyle={styles.checkboxText}
                    />
                </View>
                <View
                    style={[
                        styles.exerciseInfoRow,
                        {
                            marginRight: 50,
                            marginLeft: 50
                        }
                    ]}
                >
                    {numSets == 5
                        ? <CheckBox
                              label="Set 4"
                              labelBefore={true}
                              checked={this.state.set4}
                              onChange={checked => this.setState({ set4: !checked })}
                              labelStyle={styles.checkboxText}
                          />
                        : null}
                    {numSets == 5
                        ? <CheckBox
                              label="Set 5"
                              labelBefore={true}
                              checked={this.state.set5}
                              onChange={checked => this.setState({ set5: !checked })}
                              labelStyle={styles.checkboxText}
                          />
                        : null}
                </View>
                <View style={[styles.exerciseInfoRow]}>
                    {this.state.index == 0
                        ? null
                        : <TouchableOpacity
                              style={[styles.buttons]}
                              onPress={this.prevExercise.bind(this)}
                          >
                              <Text style={styles.btnTxt}>&lt; PREV EXERCISE</Text>
                          </TouchableOpacity>}

                    {this.state.index == this.props.navigation.state.params.exercises.length - 1
                        ? <TouchableOpacity
                              style={[styles.buttons, { backgroundColor: "#dbb313" }]}
                              onPress={this.toggleModal.bind(this)}
                          >
                              <Text style={styles.btnTxt}> FINISH WORKOUT</Text>
                          </TouchableOpacity>
                        : <TouchableOpacity
                              style={styles.buttons}
                              onPress={this.nextExercise.bind(this)}
                          >
                              <Text style={styles.btnTxt}> NEXT EXERCISE &gt;</Text>
                          </TouchableOpacity>}
                </View>
                <Modal
                    isVisible={this.state.modalVisible}
                    style={styles.modal}
                    onBackdropPress={() => this.setState({ modalVisible: false })}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.title}>
                            {finishMessages[num]}
                        </Text>
                        <TouchableOpacity
                            style={styles.buttons}
                            onPress={this.returnHome.bind(this)}
                        >
                            <Text style={styles.btnTxt}> Return Home</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#73CFE6",
        height: "100%"
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#006db3"
    },
    buttons: {
        elevation: 4,
        // Material design blue from https://material.google.com/style/color.html#color-color-palette
        backgroundColor: "#2196F3",
        borderRadius: 2,
        width: 170,
        height: 60,
        margin: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    btnTxt: {
        color: "white",
        textAlign: "center",
        padding: 8,
        fontWeight: "500",
        fontSize: 16
    },
    texts: {
        fontSize: 20,
        fontWeight: "100"
    },
    checkboxText: {
        fontSize: 18,
        color: "#000"
    },
    exerciseInfoRow: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#73CFE6"
    },
    exerciseInfoCol: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginRight: 20
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        padding: 2
    },
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modalContent: {
        backgroundColor: "#e8bb06",
        padding: 22,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4
    }
});
