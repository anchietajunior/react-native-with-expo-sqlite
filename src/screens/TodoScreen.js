import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { initDB, addTodo, getTodos, updateTodo, deleteTodo } from '../services/db';

export default function TodoScreen() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);

  const loadTodos = async () => {
    try {
      await initDB();
      const list = await getTodos();
      setTodos(list);
    } catch (error) {
      console.error('Erro ao carregar todos:', error);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const save = async () => {
    try {
      if (editId) {
        await updateTodo(editId, text);
      } else {
        await addTodo(text);
      }
      setEditId(null);
      setText('');
      await loadTodos();
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      await loadTodos();
    } catch (error) {
      console.error('Erro ao deletar:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection:'row', marginVertical:4 }}>
      <Text style={{ flex:1 }}>{item.title}</Text>
      <TouchableOpacity onPress={() => { setEditId(item.id); setText(item.title); }}>
        <Text>✏️</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Text>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex:1, padding:16 }}>
      <FlatList
        data={todos}
        keyExtractor={i => i.id.toString()}
        renderItem={renderItem}
      />
      <TextInput
        placeholder="Nova tarefa"
        value={text}
        onChangeText={setText}
        style={{ borderWidth:1, padding:8, marginVertical:12 }}
      />
      <Button
        title={editId ? "Atualizar" : "Adicionar"}
        onPress={save}
        disabled={!text.trim()}
      />
    </View>
  );
}
