import * as SQLite from 'expo-sqlite';

let db;
let isInitialized = false;

export async function initDB() {
  if (!isInitialized) {
    console.log('📱 Iniciando banco de dados...');
    db = await SQLite.openDatabaseAsync('todo.db');
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL
      );
    `);
    isInitialized = true;
    console.log('✅ Banco de dados inicializado com sucesso');
  }
  return db;
}

export const addTodo = async (title) => {
  if (!isInitialized) await initDB();
  console.log('📝 Adicionando nova tarefa:', title);
  const result = await db.runAsync(
    'INSERT INTO todos (title) VALUES (?)',
    [title]
  );
  console.log('✅ Tarefa adicionada com ID:', result.lastInsertRowId);
  return result.lastInsertRowId;
};

export const getTodos = async () => {
  if (!isInitialized) await initDB();
  console.log('📋 Buscando todas as tarefas...');
  const todos = await db.getAllAsync('SELECT * FROM todos');
  console.log('✅ Tarefas encontradas:', todos.length);
  return todos;
};

export const updateTodo = async (id, title) => {
  if (!isInitialized) await initDB();
  console.log('✏️ Atualizando tarefa:', { id, title });
  await db.runAsync(
    'UPDATE todos SET title = ? WHERE id = ?',
    [title, id]
  );
  console.log('✅ Tarefa atualizada com sucesso');
};

export const deleteTodo = async (id) => {
  if (!isInitialized) await initDB();
  console.log('🗑️ Deletando tarefa:', id);
  await db.runAsync(
    'DELETE FROM todos WHERE id = ?',
    [id]
  );
  console.log('✅ Tarefa deletada com sucesso');
};

export default db;
