import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    KeyboardAvoidingView,
    Keyboard
} from "react-native";

import exercises from "../../../api/exercises.json";

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bodyParts: [],
            strength: false,
            lengthOfWorkout: 10,

            names: [],
            equipment: []
        };
    }
    create() {
        Keyboard.dismiss();
        let exerciseObj = [];
        let exerciseNames = [];
        let exerciseEquipment = [];
        const bodyParts = this.props.bodyParts;
        const numExercises = Math.round(this.state.lengthOfWorkout / 9 / bodyParts.length); //3 minutes between sets, and 3 sets per exercise = dividing by 9
        for (var i = 0; i < bodyParts.length; i++) {
            let array1 = [];
            switch (bodyParts[i]) {
                case "arms":
                    array1 = this.arms(numExercises);
                    break;
                case "legs":
                    array1 = this.legs(numExercises);
                    break;
                case "back":
                    array1 = this.back(numExercises);
                    break;
                case "chest":
                    array1 = this.chest(numExercises);
                    break;
                case "shoulders":
                    array1 = this.shoulders(numExercises);
                    break;
                default:
                    alert("error");
            }
            exerciseObj = exerciseObj.concat(array1);
        }
        //console.log(exerciseObj);
        for (var i = 0; i < exerciseObj.length; i++) {
            exerciseNames.push(exerciseObj[i].name);
            exerciseEquipment.push(exerciseObj[i].equipment);
        }
        this.props.navigation.navigate(
            "ListView",
            {
                names: exerciseNames,
                equipment: exerciseEquipment
            },
            60
        );
    }

    isUnique(list, newValue) {
        for (var i = 0; i < list.length; i++) {
            if (list[i] === newValue) {
                return false;
            }
        }
        return true;
    }

    addExercise(partMuscleList, numExercises) {
        // Add no duplicate of ANY exercise by using fullMusclelist (ie. armsExercises/ legsExercises etc.) to check isUnique
        let newList = [];
        let exercise;

        for (let i = 0; i < numExercises; i++) {
            for (let j = 0; j < 5; j++) {
                exercise = partMuscleList[Math.floor(Math.random() * partMuscleList.length)];
                if (this.isUnique(newList, exercise)) {
                    newList.push(exercise);
                    break;
                }
            }
        }
        return newList;
    }

    arms(numExercises) {
        if (this.state.strength === false) {
            console.log("strength-training is off for arms ---using isUnique()");
        }
        const numExercisesEach =
            Math.round(numExercises / 2) == 0 ? 1 : Math.round(numExercises / 2);
        //triceps
        let triceps = [];
        let biceps = [];

        for (var a = 0; a < exercises.length; a++) {
            if (exercises[a].muscle === "arms") {
                if (exercises[a].sub_muscle === "triceps") {
                    triceps.push(exercises[a]);
                } else {
                    biceps.push(exercises[a]);
                }
            }
        }
        const bicepList = this.addExercise(biceps, numExercisesEach);
        const tricepList = this.addExercise(triceps, numExercisesEach);

        let armsExercises = bicepList.concat(tricepList);
        return armsExercises;
    }

    legs(numExercises) {
        if (this.state.strength === false) {
            console.log("strength-training is off for legs ---using isUnique()");
        }
        const numExercisesEach =
            Math.round(numExercises / 3) == 0 ? 1 : Math.round(numExercises / 3);
        //triceps
        let quads = [];
        let hamstring = [];
        let glute = [];

        for (var a = 0; a < exercises.length; a++) {
            if (exercises[a].muscle === "legs") {
                if (exercises[a].sub_muscle === "quads") {
                    quads.push(exercises[a]);
                } else if (exercises[a].sub_muscle === "hamstring") {
                    hamstring.push(exercises[a]);
                } else {
                    glute.push(exercises[a]);
                }
            }
        }
        const quadsList = this.addExercise(quads, numExercisesEach);
        const hamsList = this.addExercise(hamstring, numExercisesEach);
        const glutesList = this.addExercise(glute, 1);

        let legExercises = quadsList.concat(hamsList, glutesList);
        return legExercises;
    }
    back(numExercises) {
        if (this.state.strength === false) {
            console.log("strength-training is off for back ---using isUnique()");
        }
        const numExercisesEach =
            Math.round(numExercises / 3) == 0 ? 1 : Math.round(numExercises / 3);

        let lats = [];
        let mid = [];
        let lower = [];
        for (var a = 0; a < exercises.length; a++) {
            if (exercises[a].muscle === "back") {
                if (exercises[a].important) {
                    backExercises.push(exercises[a]);
                } else if (exercises[a].sub_muscle === "lats") {
                    lats.push(exercises[a]);
                } else if (exercises[a].sub_muscle === "mid_back") {
                    mid.push(exercises[a]);
                } else {
                    lower.push(exercises[a]);
                }
            }
        }

        const latsList = this.addExercise(lats, numExercisesEach);
        const midList = this.addExercise(mid, numExercisesEach);
        const lowerList = this.addExercise(lower, numExercisesEach);

        let backExercises = latsList.concat(midList, lowerList);
        return backExercises;
    }

    chest(numExercises) {
        if (this.state.strength === false) {
            console.log("strength-training is off for chest --- using splice");
        }
        const numExercisesEach = numExercises > 8 ? 8 : numExercises;

        let chest = [];
        for (var a = 0; a < exercises.length; a++) {
            if (exercises[a].muscle === "chest") {
                if (exercises[a].important) {
                    chestExercises.push(exercises[a]);
                } else {
                    chest.push(exercises[a]);
                }
            }
        }

        const chestExercises = this.addExercise(chest, numExercisesEach);
        return chestExercises;
    }

    shoulders(numExercises) {
        if (this.state.strength === false) {
            console.log("strength-training is off for shoulders---using isUnique()");
        }
        const numExercisesEach = Math.round(numExercises / 5);
        //triceps
        let mix = [];
        let mid = [];
        let front = [];
        let rear = [];

        for (var a = 0; a < exercises.length; a++) {
            if (exercises[a].muscle === "shoulders") {
                if (exercises[a].important) {
                    shoulderExercises.push(exercises[a]);
                } else if (exercises[a].sub_muscle === "mix") {
                    mix.push(exercises[a]);
                } else if (exercises[a].sub_muscle === "mid") {
                    mid.push(exercises[a]);
                } else if (exercises[a].sub_muscle === "front") {
                    front.push(exercises[a]);
                } else {
                    rear.push(exercises[a]);
                }
            }
        }

        const mixList = this.addExercise(mix, 1);
        if (numExercisesEach != 0) {
            const midList = this.addExercise(mid, numExercisesEach);
            const frontList = this.addExercise(front, numExercisesEach);
            const rearList = this.addExercise(rear, numExercisesEach);
            let shoulderExercises = mixList.concat(midList, frontList, rearList);
            return shoulderExercises;
        } else {
            return mixList;
        }
    }
    render() {
        return (
            <KeyboardAvoidingView behavior="height" style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.texts}> Length of Workout (min): </Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType="numeric"
                        onChangeText={text => this.setState({ lengthOfWorkout: text })}
                        maxLength={2}
                    />
                </View>
                <View>
                    <Button
                        color="#cca408"
                        title="Create Workout"
                        onPress={this.create.bind(this)}
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        alignItems: "center",
        backgroundColor: "#73CFE6"
    },
    time: {
        alignItems: "center",
        flexDirection: "row",
        margin: 10
    },
    texts: {
        fontSize: 18
    },
    textInput: {
        width: 50,
        fontSize: 20,
        textAlign: "center",
        alignSelf: "center",
        borderWidth: 1,
        margin: 8,
        padding: 0,
        height: 40
    },
    row: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        margin: 5
    }
});
