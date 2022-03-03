const Alert = ({ type, children }) => {
  const alertClass = `alert alert-${type}`;

  return <div className={alertClass}>{children}</div>;
};

Alert.defaultProps = {
  type: 'success',
};

export default Alert;
