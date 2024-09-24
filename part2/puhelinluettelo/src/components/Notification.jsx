const Notification = ({ message, state }) => {
  const style = { color: state === "success" ? "green" : "red" };
  if (message === null) return null;
  return <div style={style}>{message}</div>;
};

export default Notification;
