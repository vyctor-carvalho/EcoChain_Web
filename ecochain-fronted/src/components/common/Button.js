import './Button.css';

function Button({ children, onClick, type = 'primary', size = 'medium' }) {
  return (
    <button 
      className={`btn btn-${type} btn-${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;