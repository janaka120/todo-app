import React, { useMemo } from 'react';

export type ButtonStyleType = 'primary' | 'default' | 'danger';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    styleType: ButtonStyleType;
};

const BaseButton: React.FC<ButtonProps> = ({ styleType, children, disabled, ...props }) => {
    const buttonStyle = useMemo(() => {
        if(disabled) {
          return 'base_button--disabled'
        }
        return styleType === 'primary' ? 'base_button--primary' : styleType === 'danger' ? 'base_button--danger' : 'base_button--default';
    }, [disabled, styleType]);

    return (
      <button {...props} className={`base_button ${buttonStyle}`}>
        {children}
      </button>
    );
  };

export default BaseButton;
