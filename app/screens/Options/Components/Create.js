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
import CheckBox from "react-native-checkbox";

import exercises from "../../../api/exercises.json";
import smallBodyParts from "../../../api/smallBodyParts.json";

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bodyParts: [],
            strength: true,
            size: false,
            endurance: false,
            lengthOfWorkout: 10,

            names: [],
            equipment: [],
            test: "sdfsdfds"
        };
    }
    create() {
        Keyboard.dismiss();
        let exerciseObj = [];
        let exerciseNames = [];
        let exerciseEquipment = [];
        let exerciseMuscle = [];

        const bodyParts = this.props.bodyParts;

        let workoutType; // determinese if its strength, size, or endurance training
        let numExercises;
        if (this.state.strength) {
            numExercises = Math.round(this.state.lengthOfWorkout / 15 / bodyParts.length); //3 minutes between sets, and 5 sets per exercise = dividing by 15
            workoutType = "strength";
        } else if (this.state.size) {
            numExercises = Math.round(this.state.lengthOfWorkout / 9 / bodyParts.length); //3 minutes between sets, and 3 sets per exercise = dividing by 9
            workoutType = "size";
        } else if (this.state.endurance) {
            numExercises = Math.round(this.state.lengthOfWorkout / 9 / bodyParts.length); //3 minutes between sets, and 3 sets per exercise = dividing by 9
            workoutType = "endurance";
        } else {
            numExercises = Math.round(this.state.lengthOfWorkout / 9 / bodyParts.length); //3 minutes between sets, and 3 sets per exercise = dividing by 9
        }
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
        for (var i = 0; i < exerciseObj.length; i++) {
            //Change if adding more columns
            exerciseNames.push(exerciseObj[i].name); //Change if adding more columns
            exerciseEquipment.push(exerciseObj[i].equipment); //Change if adding more columns
            exerciseMuscle.push(exerciseObj[i].muscle);
        }

        this.props.navigation.navigate(
            "ListView",
            {
                workoutType: workoutType,

                names: exerciseNames, //Change if adding more columns
                equipment: exerciseEquipment, //Change if adding more columns
                muscle: exerciseMuscle
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

    addExercise(partMuscleList, numExercises, strengthBool) {
        // Add no duplicate of ANY exercise by using fullMusclelist (ie. armsExercises/ legsExercises etc.) to check isUnique
        let newList = [];
        let strengthList = [];
        let exercise;
        if (strengthBool) {
            for (let i = 0; i < numExercises; i++) {
                for (let j = 0; j < 10; j++) {
                    exercise = partMuscleList[Math.floor(Math.random() * partMuscleList.length)];

                    if (exercise.strength && this.isUnique(strengthList, exercise)) {
                        strengthList.push(exercise);
                        break;
                    }
                }
            }
        }
        if (strengthList.length >= numExercises) {
            return strengthList;
        } else {
            for (let i = 0; i < numExercises - strengthList.length; i++) {
                for (let j = 0; j < 5; j++) {
                    exercise = partMuscleList[Math.floor(Math.random() * partMuscleList.length)];
                    if (this.isUnique(newList, exercise) && this.isUnique(strengthList, exercise)) {
                        newList.push(exercise);
                        break;
                    }
                }
            }
        }
        newList = newList.concat(strengthList);
        return newList;
    }

    arms(numExercises) {
        const numExercisesEach =
            Math.round(numExercises / 2) == 0 ? 1 : Math.round(numExercises / 2);

        let triceps = [];
        let biceps = [];
        let forearms = [];

        for (var a = 0; a < exercises.length; a++) {
            if (exercises[a].muscle === "arms") {
                if (exercises[a].sub_muscle === "triceps") {
                    triceps.push(exercises[a]);
                } else {
                    biceps.push(exercises[a]);
                }
            }
        }
        const bicepList = this.addExercise(
            biceps,
            numExercisesEach,
            this.state.strength,
            this.state.size,
            this.state.end
        );
        const tricepList = this.addExercise(
            triceps,
            numExercisesEach,
            this.state.strength,
            this.state.size,
            this.state.end
        );
        forearms.push(this.addSmallPart("forearms"));
        let armsExercises = bicepList.concat(tricepList, forearms);

        return armsExercises;
    }

    legs(numExercises) {
        const numExercisesEach =
            Math.round(numExercises / 3) == 0 ? 1 : Math.round(numExercises / 3);
        //triceps
        let quads = [];
        let hamstring = [];
        let glute = [];
        let calves = [];

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
        const quadsList = this.addExercise(
            quads,
            numExercisesEach,
            this.state.strength,
            this.state.size,
            this.state.end
        );
        const hamsList = this.addExercise(
            hamstring,
            numExercisesEach,
            this.state.strength,
            this.state.size,
            this.state.end
        );
        const glutesList = this.addExercise(glute, 1);
        calves.push(this.addSmallPart("calves"));

        let legExercises = quadsList.concat(hamsList, glutesList, calves);
        return legExercises;
    }
    back(numExercises) {
        const numExercisesEach =
            Math.round(numExercises / 3) == 0 ? 1 : Math.round(numExercises / 4);

        let lats = [];
        let mid = [];
        let lower = [];
        let traps = [];

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

        const latsList = this.addExercise(
            lats,
            numExercisesEach,
            this.state.strength,
            this.state.size,
            this.state.end
        );

        const midList = this.addExercise(
            mid,
            numExercisesEach,
            this.state.strength,
            this.state.size,
            this.state.end
        );

        const lowerList = this.addExercise(
            lower,
            numExercisesEach,
            this.state.strength,
            this.state.size,
            this.state.end
        );
        traps.push(this.addSmallPart("traps"));

        let backExercises = latsList.concat(midList, lowerList, traps);
        return backExercises;
    }

    chest(numExercises) {
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

        const chestExercises = this.addExercise(
            chest,
            numExercisesEach,
            this.state.strength,
            this.state.size,
            this.state.end
        );
        return chestExercises;
    }

    shoulders(numExercises) {
        const numExercisesEach = Math.round(numExercises / 5);
        //triceps
        let mix = [];
        let mid = [];
        let front = [];
        let rear = [];
        let traps = [];

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

        const mixList = this.addExercise(mix, 1, this.state.strength);
        let midList = [];
        let frontList = [];
        let rearList = [];
        if (numExercisesEach != 0) {
            midList = this.addExercise(
                mid,
                numExercisesEach,
                this.state.strength,
                this.state.size,
                this.state.end
            );
            frontList = this.addExercise(
                front,
                numExercisesEach,
                this.state.strength,
                this.state.size,
                this.state.end
            );
            rearList = this.addExercise(
                rear,
                numExercisesEach,
                this.state.strength,
                this.state.size,
                this.state.end
            );
        }
        traps.push(this.addSmallPart("traps"));

        let shoulderExercises = mixList.concat(midList, frontList, rearList, traps);
        return shoulderExercises;
    }
    addSmallPart(bodypart) {
        let bodyList = [];
        for (let i = 0; i < smallBodyParts.length; i++) {
            if (smallBodyParts[i].muscle == bodypart) {
                bodyList.push(smallBodyParts[i]);
            }
        }
        const index = Math.floor(Math.random() * bodyList.length);

        return bodyList[index];
    }
    render() {
        return (
            <View behavior="height" style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.texts}> Length of Workout (in Minutes): </Text>
                    <View>
                        <TextInput
                            style={styles.textInput}
                            keyboardType="numeric"
                            onChangeText={text => this.setState({ lengthOfWorkout: text })}
                            maxLength={2}
                        />
                    </View>
                </View>

                <View style={styles.row}>
                    <Text style={styles.texts}>Train for Strength and Size</Text>
                    <CheckBox
                        label=" "
                        checked={this.state.strength}
                        onChange={checked =>
                            this.setState({ strength: !checked, size: false, endurance: false })}
                        checkboxStyle={{ width: 30, height: 30 }}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.texts}>Train for Size</Text>
                    <CheckBox
                        label=" "
                        checked={this.state.size}
                        onChange={checked =>
                            this.setState({ size: !checked, strength: false, endurance: false })}
                        checkboxStyle={{ width: 30, height: 30 }}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.texts}>Train for Endurance</Text>
                    <CheckBox
                        label=" "
                        checked={this.state.endurance}
                        onChange={checked =>
                            this.setState({ endurance: !checked, strength: false, size: false })}
                        checkboxStyle={{ width: 30, height: 30 }}
                    />
                </View>
                <View>
                    <Button
                        color="#cca408"
                        title="Create Workout"
                        onPress={this.create.bind(this)}
                    />
                </View>
            </View>
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
    checkbox: {
        flex: 1,
        justifyContent: "space-between"
    },
    texts: {
        fontSize: 18,
        color: "#000",
        textAlign: "left"
    },
    textInput: {
        width: 50,
        fontSize: 20,
        textAlign: "center",
        alignSelf: "center",
        borderWidth: 1.5,
        borderRadius: 5,
        margin: 8,
        padding: 0,
        height: 40
    },
    row: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "stretch",
        margin: 5
    }
});
