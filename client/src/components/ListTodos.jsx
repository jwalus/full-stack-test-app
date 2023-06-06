import { useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  //delete todos
  const deleteTodo= async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE"
      });

      setTodos(todos.filter(todo => todo.todo_id !== id))
    } catch (error) {
      console.log(error.message);
    }
  };

  //get all the todos
  const getTodos = async() => {
    try {
      const response = await fetch("http://localhost:5000/todos")
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  console.log(todos);

  return (
    <div className="w-full flex justify-center pt-12">
        <table className="min-w-[500px]">
          <thead>
            <tr className="flex justify-between">
              <th className="pl-8">Description</th>
              <th className="pl-8">Edit</th>
              <th className="pr-9">Delete</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {todos.map(todo => (
              <tr key={todo.todo_id} className="flex justify-between pl-6 py-2">
                <td className="font-semibold border border-black max-w-[190px] min-w-[190px] pl-1 overflow-hidden">{todo.description}</td>
                {/* add todo as a prop for the edit feature "todo = {todo}" this will let you use it in the EditTodo as long as you call it in the const. */}
                <td className="pr-12">
                    <EditTodo todo={todo} /> 
                </td>
                <td className="pr-6">
                  <button 
                  onClick={() => deleteTodo(todo.todo_id)}
                  className="bg-red-500 px-3 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default ListTodos