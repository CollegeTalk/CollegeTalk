
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';


const TextBox = () => {
    return (
        <View style = {styles.Center}>
            <Text> Post textbody here...Example: I'm a freshman at the college and I'm 
                looking to start a band. I play a multitude of instruments, but I focus on 
                guitar, bass, and drums. I can write songs and have an elementary knowledge 
                in recording/producing, though I warn you, this knowledge is ELEMENTARY. 
                In the band I would want to play guitar and vocals when performing my own songs,
                 however, if any of you wish to provide your own songs, I'd be happy to play the 
                 drums. </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    Center: {
        alignItems: 'center'
    }
  });

export default TextBox;