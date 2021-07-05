import React, { useState } from "react";
import ReactDOM from "react-dom";

const Index = () => {
  const [tasks, setTasks] = useState([
    { name: "HTML", category: "wip" },
    { name: "CSS", category: "wip" },
    { name: "JS", category: "wip" },
    { name: "ReactJS", category: "wip" },
  ]);
  let wip = [];
  let complete = [];

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
        <div className="col-md-4">
          <h1>HTML Drag & Drop</h1>
        </div>
        <div className="col-md-4"></div>
      </div>
      <div className="row mt-4">
        <div
          className="dragzone col-md-4"
          onDrop={(e) => onDrop(e, "wip")}
          onDragOver={(e) => {
            e.preventDefault();
          }}
        >
          <h1 className="text-white">Work in progress</h1>
          {wip.length > 0 ? (
            wip.map((w) => <div>{w}</div>)
          ) : (
            <span className="text-white">All tasks completed!</span>
          )}
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

ReactDOM.render(<Index />, document.getElementById("root"));
