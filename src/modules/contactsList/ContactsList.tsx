/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, css } from "@emotion/react";
import { ContactsListApiResponse } from "src/api/api.model";
import { Button } from "src/components/button/Button";
import { ErrorMessage } from "src/components/errorMessage/ErrorMessage";
import { LoadingIndicator } from "src/components/loadingIndicator/LoadingIndicator";
import PersonInfo from "src/components/personInfo/PersonInfo";
import {
  LOAD_MORE,
  REQUEST_FAILED_MESSAGE,
  SELECTED_CONTACTS,
  TRY_AGAIN,
} from "./contactsList.settings";
import { useContactsList } from "./useContactsList";

interface ContactListProps {
  api?: () => Promise<ContactsListApiResponse>;
}

export const ContactsList = ({ api }: ContactListProps) => {
  const {
    contactsList,
    fetchMoreAvailable,
    fetchNextBatch,
    hasError,
    isLoading,
    retryCurrentBatch,
    selectedContactsNumber,
    onContactSelectToggle,
  } = useContactsList(api);
  return (
    <section
      css={css`
        display: flex;
        flex-flow: column wrap;
        align-items: center;
      `}
    >
      <div
        css={css`
          color: #333333;
          font-size: 26px;
          font-weight: 700;
          padding: 10px 20px;
          position: sticky;
          top: 0;
          background-color: #f4f4f4;
          width: 100%;
          box-shadow: 0 0 0 10px #f4f4f4;
        `}
      >{`${SELECTED_CONTACTS}${selectedContactsNumber}`}</div>
      <ul
        css={css`
          overflow-anchor: none;
          padding: 0;
        `}
      >
        {contactsList.map((contact) => (
          <PersonInfo
            key={contact.id}
            onSelect={onContactSelectToggle}
            {...contact}
          />
        ))}
      </ul>
      {isLoading && (
        <div
          css={css`
            margin-bottom: 10px;
          `}
        >
          <LoadingIndicator />
        </div>
      )}
      {hasError && (
        <div
          css={css`
            display: flex;
            flex-flow: column wrap;
            align-items: center;
          `}
        >
          <div
            css={css`
              margin-bottom: 10px;
            `}
          >
            <ErrorMessage text={REQUEST_FAILED_MESSAGE} />
          </div>
          <Button onClick={retryCurrentBatch} text={TRY_AGAIN} />
        </div>
      )}
      {!hasError && fetchMoreAvailable && (
        <Button onClick={fetchNextBatch} text={LOAD_MORE} />
      )}
    </section>
  );
};
