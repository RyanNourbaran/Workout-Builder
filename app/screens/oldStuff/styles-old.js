import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#a7d6f9"
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    },
    instructions: {
        textAlign: "center",
        backgroundColor: "#333333",
        marginBottom: 5
    },
    bodybuttons: {
        flex: 1,
        flexDirection: "row",
        maxHeight: 100,
        // Material design blue from https://material.google.com/style/color.html#color-color-palette
        backgroundColor: "#2196F3"
    },
    btn: {
        width: 80,
        height: 80
    }
});
