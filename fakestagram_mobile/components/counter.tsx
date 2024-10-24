import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const Counter: React.FC = () => {
    const [count, setCount] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.counterText}>Cantidad: {count}</Text>
            <TouchableOpacity style={styles.buttonText} onPress={() => setCount(count + 1)}><Text>Sumar</Text></TouchableOpacity>
            <TouchableOpacity style={styles.buttonText} onPress={() => setCount(count - 1)}></TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        backgroundColor: 'blue',
        padding: 10,
        margin : 10,
        borderRadius: 15,
        color: 'white',
    },
    counterText: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default Counter;