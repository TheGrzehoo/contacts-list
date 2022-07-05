/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";

interface ErrorMessageProps {
  text: string;
}

export const ErrorMessage = ({ text }: ErrorMessageProps) => {
  return (
    <span
      css={css`
        color: #ff0000;
      `}
    >
      {text}
    </span>
  );
};
