import {TouchableOpacity, Platform, KeyboardAvoidingView, TextInput, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const CreatePostTitle = () => {
    return (
    <View style = {styles.Center}>
        {/* Write a post title */}
        <KeyboardAvoidingView
                behavior = {Platform.OS == "ios" ? "padding" : "height"}
                style ={styles.writeTaskWrapper} 
            >
                
            <TextInput style ={styles.input} placeholder = {"Write a post title"}/>
        </KeyboardAvoidingView>
    </View>
    );
}

const styles = StyleSheet.create({
    Center: {
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 100
        
    },

    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 250
    },

    writeTaskWrapper:{
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
  });

export default CreatePostTitle;