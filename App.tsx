import React from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, Button} from 'react-native';

import NativeLocalStorage from './specs/NativeLocalStorage';

const EMPTY = '<empty>';

function App(): React.JSX.Element {
  const [value, setValue] = React.useState<string | null>(null);
  const [asyncValue, setAsyncValue] = React.useState<string | null>(null);

  const [editingValue, setEditingValue] = React.useState<string | null>(null);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Button
        title="Get Value"
        onPress={() => {
          const savedValue = NativeLocalStorage?.getItem('myKey');
          setValue('' + savedValue);
        }}
      />
      <Text style={styles.text}>Current stored value is: {value}</Text>
      <TextInput
        placeholder="Enter the text you want to store"
        style={styles.textInput}
        onChangeText={setEditingValue}
      />
      <Button
        title="Save"
        onPress={() =>
          NativeLocalStorage.setItem(editingValue ?? EMPTY, 'myKey')
        }
      />
      <Button
        title="Delete"
        onPress={() => NativeLocalStorage.removeItem('myKey')}
      />
      <Button title="Clear" onPress={() => NativeLocalStorage.clear()} />
      <Button
        title="Get Async"
        onPress={() => {
          NativeLocalStorage.asyncGetItem('myKey').then(savedValue =>
            setAsyncValue(savedValue ?? EMPTY),
          );
        }}
      />
      <Text style={styles.text}>
        Current stored async value is: {asyncValue}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    margin: 10,
    fontSize: 20,
  },
  textInput: {
    margin: 10,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
  },
});

export default App;
