import { useState } from "react";


const EditTodo = ({ todo }) => { //calling todo prop
  const [description, setDescription] = useState(todo.description); //this allows you to call the description so you can edit it pretty much
  const [showPopup, setShowPopup] = useState(false); // this is for the edit popup
  
  const togglePopup = () => { //this allows the edit popup to display itself
    setShowPopup(!showPopup);
  };
  
  const closePopup = () => { //this is for closing the popup incase they didnt want to edit it.
    setShowPopup(false);
  };

  //edit description function
  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
      window.location = "/";
      console.log(response);
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <button 
        className="bg-yellow-400 px-3 py-2 rounded-lg"
        onClick={togglePopup}  
      >
        Edit
      </button>

    {showPopup && (
      <div className="fixed w-[300px] h-[200px] flex justify-center bg-gray-200 flex justify-center">
        <div className="flex justify-center flex-col items-center">
          <h1 className="text-4xl text-yellow-400">Edit</h1>
          <form className="flex flex-col pt-6">
            {/* set the value, wont be able to edit it unless you add the onchange */}
            <input 
              type="text" 
              className="h-10 w-100" 
              value={description} 
              onChange={e => setDescription(e.target.value)}
            />
            {/* submiting will now update the description with the onclick */}
            <button className="px-3 py-2 bg-green-400" onClick={e => updateDescription(e)}>Submit</button>
            {/* this will close the popup, and set the description back to its original state */}
            <button 
              className="px-3 py-2 bg-red-400"
              onClick={() => {
                closePopup();
                setDescription(todo.description);
              }}
            >
              Close
            </button>
          </form>
        </div>
      </div>
    )}
    </div>
  )
}

export default EditTodo