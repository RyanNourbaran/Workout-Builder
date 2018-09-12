/*
*   list format of the chosen generated exercises
*/

import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from "react-native-table-component";

export default class WorkoutList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    cellHeight() {
        let { height, width } = Dimensions.get("window");
        const arrayLength = Math.floor(height * 0.75 / this.props.names.length);
        let heightArr = Array(this.props.names.length);
        const tests = heightArr.toString();
        heightArr.fill(arrayLength);

        return heightArr;
    }
    renderTable() {
        if (this.props.names.length > 0) {
            const tableHead = ["Excercise", "Equipment"]; //Change if adding more columns
            const tableData = [this.props.names, this.props.equipment]; //Change if adding more columns
            return (
                <Table style={styles.table}>
                    <Row
                        data={tableHead}
                        style={styles.head}
                        textStyle={styles.text1}
                        flexArr={[1]}
                    />
                    <Cols
                        data={tableData}
                        textStyle={styles.text2}
                        heightArr={this.cellHeight()}
                        flexArr={[1]}
                    />
                </Table>
            );
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this.renderTable()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    table: {
        alignSelf: "stretch"
    },
    container: {
        backgroundColor: "#73CFE6"
    },
    head: {
        height: 40,
        backgroundColor: "#00B3E6"
    },
    text2: {
        textAlign: "center",
        fontSize: 20
    },
    text1: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold"
    },
    BtnRow: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 5
    }
});
