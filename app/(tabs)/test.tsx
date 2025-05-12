import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  useAddRowCallback,
  useDelTableCallback,
  useDelRowCallback,
  useHasTable,
  useRow,
  useSetCellCallback,
  useSortedRowIds,
} from "tinybase/ui-react";

// The TinyBase table contains the todos, with 'text' and 'done' cells.
const TODO_TABLE = "todo";
const TEXT_CELL = "text";
const DONE_CELL = "done";

// Emojis to decorate each todo.
const NOT_DONE_ICON = "❌";
const DONE_ICON = "✅";

// The text input component to add a new todo.
const NewTodo = () => {
  const [text, setText] = useState("");
  const handleSubmitEditing = useAddRowCallback(
    TODO_TABLE,
    ({ nativeEvent: { text } }: { nativeEvent: { text: string } }) => {
      setText("");
      return { [TEXT_CELL]: text, [DONE_CELL]: false };
    },
  );
  return (
    <TextInput
      value={text}
      onChangeText={(text) => setText(text)}
      onSubmitEditing={handleSubmitEditing}
      placeholder="What do you want to do today?"
      style={styles.input}
    />
  );
};

// A single todo component, either 'not done' or 'done': press to toggle.
const Todo = ({ id }: { id: any }) => {
  const { text, done } = useRow(TODO_TABLE, id);
  const handleDelete = useDelRowCallback(TODO_TABLE, id);
  const handlePress = useSetCellCallback(
    TODO_TABLE,
    id,
    DONE_CELL,
    () => (done) => !done,
  );
  return (
    <View style={styles.todoContainer}>
      <TouchableOpacity
        key={id}
        onPress={handlePress}
        style={[styles.todo, done ? styles.done : null]}
      >
        <Text style={styles.todoText}>
          {done ? DONE_ICON : NOT_DONE_ICON} {text}
        </Text>
      </TouchableOpacity>
      <Pressable onPress={handleDelete} style={styles.deleteTodo}>
        <Text style={styles.todoText}>❌</Text>
      </Pressable>
    </View>
  );
};

// A list component to show all the todos.
const Todos = () => {
  const renderItem = ({ item: id }: { item: any }) => <Todo id={id} />;
  return (
    <FlatList
      data={useSortedRowIds("session", "name")}
      renderItem={renderItem}
      style={styles.todos}
    />
  );
};

// A button component to delete all the todos, only shows when there are some.
const ClearTodos = () => {
  const handlePress = useDelTableCallback(TODO_TABLE);
  return useHasTable(TODO_TABLE) ? (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.clearTodos}>Clear all</Text>
    </TouchableOpacity>
  ) : null;
};

// The main app.
const Test = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>TinyBase Example</Text>
        <NewTodo />
        <Todos />
        <ClearTodos />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

// Styles for the app.
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    margin: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderColor: "#999",
    borderRadius: 8,
    borderWidth: 2,
    flex: 0,
    height: 64,
    marginTop: 16,
    padding: 16,
    fontSize: 20,
  },
  todos: {
    flex: 1,
    marginTop: 16,
  },
  todo: {
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  done: {
    backgroundColor: "#dfd",
  },
  todoText: {
    fontSize: 20,
  },
  clearTodos: {
    margin: 16,
    flex: 0,
    textAlign: "center",
    fontSize: 16,
  },
  todoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteTodo: {
    borderRadius: 8,
    backgroundColor: "#fdd",
    padding: 16,
    marginBottom: 16,
  },
});

export default Test;
