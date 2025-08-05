import React, {Component} from "react";
import { View, Text, Image, ScrollView, StyleSheet} from "react-native";

class ScrollViewExample extends Component {
  state = { 
    names: [
        {name: "John Doe", 'id': 1},
        {name: "Jane Smith", 'id': 2},
        {name: "Michael Johnson", 'id': 3},
        {name: "Emily Davis", 'id': 4},
        {name: "Chris Brown", 'id': 5},
        {name: "Jessica Wilson", 'id': 6},
        {name: "David Garcia", 'id': 7},
        {name: "Sarah Martinez", 'id': 8},
        {name: "Daniel Rodriguez", 'id': 9},
        {name: "Laura Hernandez", 'id': 10},
        {name: "Matthew Lopez", 'id': 11},
        {name: "Sophia Gonzalez", 'id': 12},
    ]
  }

    render() {
        return (
            <View>
                <ScrollView>
                {            
                    this.state.names.map((item, index) => (
                        <View 
                         key={item.id}
                         style={styles.item}   
                        >
                        <Image source={require('../assets/favicon.png')} />
                        <Text>{item.name}</Text>
                        </View>
                    ))

                }
                </ScrollView>
            </View>
        );
    }
}

export default ScrollViewExample;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
        margin: 2,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: '#d2f7f1'
    }
});