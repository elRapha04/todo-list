import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { CiCircleChevUp } from "react-icons/ci";
import { CiCircleChevDown } from "react-icons/ci";

const TodoList = () => {
  const [tasks, setTasks] = useState([
    "Hover then",
    "[Shift + scroll]",
    "to scroll",
    "horizontally.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam consequatur est ipsum officiis eveniet voluptates, amet magnam, obcaecati eligendi maiores laborum recusandae, illo animi a ipsam suscipit eos molestiae tempore rerum in corporis.",
    "Accusantium qui facilis nisi doloribus sapiente beatae saepe consequatur magni sequi quidem voluptatem quaerat unde voluptatibus corporis recusandae laudantium, quas amet cum blanditiis, animi molestiae.",
    "Ipsa possimus culpa, ducimus nemo dicta debitis pariatur explicabo quisquam molestiae non placeat laboriosam iusto voluptates aut error quod recusandae animi beatae incidunt quo dolorem ratione totam cumque.",
    "Ipsa totam fugiat ut saepe quia, illo assumenda nostrum, vero eius dolor esse nam?"
  ]);
  const [newTask, setNewTask] = useState("");

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index: number) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function editTask(index: number) {
    const updatedTask = prompt("Edit task:", tasks[index]);
    if (updatedTask !== null && updatedTask.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[index] = updatedTask;
      setTasks(updatedTasks);
    }
  }

  function moveUp(index: number) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveDown(index: number) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  return (
    <div className="w-full">
      <div className="sticky backdrop-blur-xs rounded-md z-10 top-0 w-full grid xs:grid-rows-2 sm:grid-cols-[3fr_1fr] mb-8">
        <input
          className="bg-transparent drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] text-lg sm:text-xl rounded-tl-md rounded-bl-md px-4 text-black active:scale-95 transition-all duration-100 font-mono"
          type="text"
          placeholder="Enter task"
          value={newTask}
          maxLength={50}
          onChange={handleInput}
          title="Enter Task"
        />
        <Button
          className="bg-green-400/50 hover:bg-green-600/60 text-black text-md sm:text-xl hover:scale-105 hover:text-white cursor-pointer rounded-tl-none sm:rounded-bl-none border-t-2 sm:border-t-0 border-black border-dashed rounded-tr-none sm:rounded-tr-md rounded-br-md transition-all duration-100 active:scale-95 font-bold"
          onClick={addTask}
          title="Add Task"
        >
          ADD
        </Button>
      </div>

      <div className="w-full">
        <ol className="space-y-2">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="w-full h-1/5 backdrop-blur-xs border-2 border-black/50 rounded-2xl p-2 grid items-center grid-cols-[10%_1fr_64px] text-nowrap"
            >
              <Checkbox
                onClick={() => deleteTask(index)}
                title="Mark as done"
                className="justify-self-center cursor-pointer hover:bg-black/50 hover:border-1 hover:border-white active:bg-white transition-all duration-300"
              />

              <span className="flex drop-shadow-[0_0px_2px_rgba(255,255,255,0.8)] overflow-scroll sm:pl-4 custom-scrollbar text-black text-lg sm:text-2xl font-mono w-9/10">
                {task}
              </span>

              <span className="grid grid-cols-[1fr_1fr]">
                <MdDeleteOutline
                  onClick={() => deleteTask(index)}
                  title="Delete Task"
                  className="size-8 cursor-pointer bg-red-500 text-black hover:bg-red-700 hover:text-white active:text-red-700 active:bg-white rounded-tl-xl transition-all duration-300 border-t-2 border-l-2 border-b-2 border-black"
                />
                <FiEdit
                  onClick={() => editTask(index)}
                  title="Edit Task"
                  className="size-8 cursor-pointer bg-yellow-500 text-black hover:bg-yellow-700 hover:text-white active:text-red-700 active:bg-white rounded-tr-xl transition-all duration-300 border-2 border-black"
                />
                <CiCircleChevUp
                  onClick={() => moveUp(index)}
                  title="Move Task Up"
                  className="size-8 cursor-pointer bg-blue-500 text-black hover:bg-blue-700 hover:text-white active:text-blue-700 active:bg-white rounded-bl-xl transition-all duration-300 border-b-2 border-l-2 border-black"
                />
                <CiCircleChevDown
                  onClick={() => moveDown(index)}
                  title="Move Task Down"
                  className="size-8 cursor-pointer bg-blue-500 text-black hover:bg-blue-700 hover:text-white active:text-blue-700 active:bg-white rounded-br-xl transition-all duration-300 border-b-2 border-r-2 border-black"
                />
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default TodoList;
