import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const initState = [];
  const [todo, setTodo] = useState("");
  let wip = [];
  let complete = [];

  const resetState = () => {
    setTasks(initState);
    setTodo("");
  };

  const updateState = (task) => {
    const tempstate = [...tasks];
    let newTask = { name: task, category: "wip" };
    tempstate.push(newTask);
    setTasks(tempstate);
  };

  const onDragStart = (event, id) => {
    console.log("dragstart:", id);
    event.dataTransfer.setData("id", id);
  };

  const onDrop = (event, cat) => {
    let id = event.dataTransfer.getData("id");

    let new_tasks = tasks.filter((task) => {
      if (task.name === id) {
        task.category = cat;
      }
      return task;
    });

    setTasks(new_tasks);
  };

  tasks.forEach((t) => {
    const arr = t.category === "wip" ? wip : complete;
    arr.push(
      <div
        onDragStart={(e) => {
          onDragStart(e, t.name);
        }}
        draggable="true"
        key={t.name}
        className="dragcard"
      >
        {t.name}
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 mt-4">
          <h1>HTML Drag & Drop</h1>
        </div>
        <div className="col-md-4"></div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3 my-4"></div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="form-control bg-dark"
        >
          <label className="text-white" htmlFor="todo">
            Add new tasks
          </label>
          <input
            id="todo"
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
            placeholder="Enter task"
            className="form-control"
          />
          <button
            onClick={() => {
              updateState(todo);
            }}
            className="btn btn-primary mt-2"
          >
            Enter
          </button>
          <button onClick={resetState} className="btn btn-danger mt-2 ml-2">
            Reset
          </button>
        </form>
      </div>
      <div className="row mt-2">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center">
            {complete.length === tasks.length ? "All tasks completed!" : ""}
          </h1>
        </div>
      </div>
      <div className="row my-4">
        <div
          className="dragzone col-md-4"
          onDrop={(e) => onDrop(e, "wip")}
          onDragOver={(e) => {
            e.preventDefault();
          }}
        >
          <h1 className="text-white">Work in progress</h1>
          {wip.map((w) => (
            <div>{w}</div>
          ))}
        </div>
        <div className="col-md-4"></div>
        <div
          className="dropzone col-md-4"
          onDrop={(e) => onDrop(e, "complete")}
          onDragOver={(e) => {
            e.preventDefault();
          }}
        >
          <h1 className="text-white">Completed</h1>
          {complete.length > 0 ? (
            complete.map((c) => <div>{c}</div>)
          ) : (
            <span className="text-white">Drop here</span>
          )}
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
