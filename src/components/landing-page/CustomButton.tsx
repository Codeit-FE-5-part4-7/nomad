import classNames from 'classnames';
/* eslint-disable */
interface LandingPageButtonProps {
  size: 'xl' | 'lg' | 'md' | 'sm';
  variant?: 'primary' | 'secondary' | 'outline';
  type?: 'button' | 'submit' | 'reset';
  text?: string;
  border?: 'br6' | 'br15';
  disabled?: boolean;
  onClick?: () => void;
  form?: string;
}

function LandingPageButton({ size, variant = 'primary', type = 'button', text = 'Button', border = 'br6', ...props }: LandingPageButtonProps) {
  const sizeClasses = {
    xl: 'w-32 py-4',
    lg: 'w-full py-3.5',
    md: 'w-36 py-4',
    sm: 'w-28 py-2.5',
  };

  const variantClasses = {
    primary: 'bg-[#112211] text-white',
    secondary: 'bg-[#a4a1aa] text-white',
    outline: 'bg-transparent border border-black hover:bg-[#ddd] hover:border-[#adaeb8] focus:bg-[#ddd] focus:border-[#adaeb8]',
  };

  const borderClasses = {
    br6: 'rounded-lg',
    br15: 'rounded-2xl',
  };

  return (
    <button
      className={classNames(
        'h-[4.8rem] text-[1.6rem] inline-flex items-center justify-center font-sans transition-opacity duration-200',
        sizeClasses[size],
        variantClasses[variant],
        borderClasses[border],
        {
          'cursor-pointer': !props.disabled,

          'cursor-not-allowed': props.disabled,
        },
      )}
      type={type}
      {...props}
    >
      <span>{text}</span>
    </button>
  );
}
/* eslint-enable */
export default LandingPageButton;
