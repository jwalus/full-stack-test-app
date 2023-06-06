import { useState } from "react";

const InputTodo = () => {

  const [description, setDescription] = useState(""); //blank description by default, this lets the placeholder text show

  const onSubmitForm = async(e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      });

      window.location = "/"; //refresh window to show changes
      console.log(response)
    } catch (error) {
      console.log(error.message);
    }
  };
  
  //everything below is pretty self explanitory
  return (
    <div className="w-full flex justify-center pt-12">
      <div>
        <h1 className="font-semibold text-5xl">Full-Stack Todo List</h1>
        <form className="pt-8 flex justify-center gap-4" onSubmit={onSubmitForm}>
          <input 
            type="text" 
            className="border border-black pl-2 rounded-lg min-w-[300px]" 
            placeholder="Clean my bedroom..." 
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <button className="bg-green-400 px-3 py-2 rounded-lg">Add</button>
        </form>
      </div>
    </div>
  )
}

export default InputTodo