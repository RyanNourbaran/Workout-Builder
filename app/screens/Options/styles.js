import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#73CFE6"
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    },
    btn: {
        borderWidth: 0.5,
        borderRadius: 20,
        borderColor: "dodgerblue",
        width: 100,
        height: 100
    },
    BtnRow: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 5
    }
});
