import React, { useEffect } from 'react';
import { initDB } from './src/services/db';
import TodoScreen from './src/screens/TodoScreen';

export default function App() {
  useEffect(() => { initDB(); }, []);
  return <TodoScreen />;
}


{/* <View style={styles.container}></View>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */}
