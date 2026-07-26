function Loader({ text = "Loading..." }) {
  return (
    <div className="loader-box">
      <div className="loader-spinner" />
      <p className="text-muted text-sm font-semibold">{text}</p>
    </div>
  );
}

export default Loader;
