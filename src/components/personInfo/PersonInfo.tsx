/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React from "react";
import { createInitials } from "src/utils/createInitials";

interface PersonInfoProps {
  firstNameLastName: string;
  jobTitle: string;
  emailAddress: string;
  selected?: boolean;
  id: string;
  onSelect: (personId: string) => void;
}

function PersonInfo({
  firstNameLastName,
  jobTitle,
  emailAddress,
  selected,
  id,
  onSelect,
}: PersonInfoProps) {
  const initials = createInitials(firstNameLastName);
  return (
    <div
      css={css`
        display: flex;
        min-height: 100px;
        justify-content: space-between;
        flex-direction: column;
        padding: 20px;
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
        margin: 10px 0;
        background: #fff;
        cursor: pointer;
        outline: ${selected ? "pink solid 3px" : "none"};
        width: 350px;
        &:hover {
          outline: pink solid 2px;
        }
      `}
      role="listitem"
      onClick={() => onSelect(id)}
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 15px;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            height: 25px;
            width: 25px;
            border-radius: 50%;
            border: 1px solid #000;
            margin-right: 10px;
            padding: 5px;
            font-size: 14px;
          `}
        >
          <span
            css={css`
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            `}
          >
            {initials}
          </span>
        </div>
        <div
          css={css`
            display: flex;
            flex-flow: column wrap;
            text-align: left;
          `}
        >
          <span
            css={css`
              color: #333333;
              font-size: 20px;
              font-weight: 700;
            `}
          >
            {firstNameLastName}
          </span>
          <span
            css={css`
              color: #e74c3c;
              font-size: 14px;
              font-weight: 400;
              text-transform: uppercase;
            `}
          >
            {jobTitle}
          </span>
        </div>
      </div>
      <div
        css={css`
          color: #666666;
          font-size: 14px;
          line-height: 1.8em;
        `}
      >
        {emailAddress}
      </div>
    </div>
  );
}

export default PersonInfo;
