const Dragzone = ({ wip }) => {
  return (
    <div className="dragzone">
      <h1>Work in progress</h1>
      {wip.map((w) => (
        <div>{w}</div>
      ))}
    </div>
  );
};

export default Dragzone;
