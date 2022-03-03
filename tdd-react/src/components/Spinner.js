const Spinner = ({ size }) => {
  const spinnerClass = size
    ? `spinner-border spinner-border-${size}`
    : 'spinner-border';

  return (
    <span className={spinnerClass} role="status" aria-hidden="true"></span>
  );
};

export default Spinner;
