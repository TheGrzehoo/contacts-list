/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";

export const LoadingIndicator = () => {
  return (
    <div
      role="alert"
      css={css`
        display: inline-block;
        width: 80px;
        height: 80px;
        &:after {
          content: " ";
          display: block;
          width: 64px;
          height: 64px;
          margin: 8px;
          border-radius: 50%;
          border: 6px solid #000000;
          border-color: #000000 transparent #000000 transparent;
          animation: loadingIndicator 1.2s linear infinite;
        }
        @keyframes loadingIndicator {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}
    ></div>
  );
};
