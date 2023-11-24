function TabBar({ offsetX, offsetWidth }) {
  return (
    <hr
      className={`h-0.5 bg-primary border-0 absolute bottom-0 transition-transform duration-300 ease-in-out`}
      style={{
        transform: `translateX(${offsetX}px)`,
        width: `${offsetWidth}px`,
      }}
    />
  );
}

export default TabBar;
