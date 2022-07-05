/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick: () => void;
}

export const Button = ({ text, onClick, ...rest }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      {...rest}
      css={css`
        background-color: #fff;
        border: 1px solid #d5d9d9;
        box-shadow: rgba(213, 217, 217, 0.5) 0 2px 5px 0;
        box-sizing: border-box;
        color: #0f1111;
        cursor: pointer;
        display: inline-block;
        font-family: "Amazon Ember", sans-serif;
        font-size: 13px;
        line-height: 29px;
        padding: 0 10px 0 11px;
        position: relative;
        text-align: center;
        text-decoration: none;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        vertical-align: middle;
        width: 100px;
        &:hover {
          background-color: #f7fafa;
        }
        &:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `}
    >
      {text}
    </button>
  );
};
