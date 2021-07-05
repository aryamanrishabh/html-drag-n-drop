const Dropzone = ({ complete, tasks }) => {
  const onDrop = (event, cat) => {
    let id = event.dataTransfer.getData("id");

    tasks.filter((task) => {
      if (task.name === id) {
        task.category = cat;
      }
      return task;
    });
  };

  return (
    <div
      className="dropzone"
      onDrop={(e) => onDrop(e, "complete")}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      <h1>Completed</h1>
      {complete.map((c) => (
        <div>{c}</div>
      ))}
    </div>
  );
};

export default Dropzone;
