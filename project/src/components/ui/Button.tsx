import { useNavigate } from "react-router-dom";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  to?: string; // New prop for navigation
  external?: boolean; // New prop for external links
}

export default function Button({ 
  text, 
  onClick, 
  variant = 'primary', 
  className = '', 
  type = 'button',
  disabled = false,
  to,
  external = false
}: ButtonProps) {
  const navigate = useNavigate();
  
  const baseStyles = "font-[Darker Grotesque] font-semibold text-[14px] px-6 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantStyles = {
    primary: "bg-[#E9C672] text-[#121212] hover:bg-[#d4b463] focus:ring-[#E9C672]",
    secondary: "border border-[#E9C672] text-[#E9C672] hover:bg-[#E9C672] hover:text-[#121212] focus:ring-[#E9C672]",
    outline: "border border-[#B097BE] text-[#B097BE] hover:bg-[#B097BE] hover:text-white focus:ring-[#B097BE]",
  };

  const handleClick = () => {
    if (disabled) return;
    
    if (to) {
      if (external) {
        window.open(to, '_blank', 'noopener,noreferrer');
      } else {
        navigate(to);
      }
    }
    
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      aria-label={text}
    >
      {text}
    </button>
  );
}


