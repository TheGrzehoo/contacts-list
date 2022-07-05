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
    errorMessage,
    fetchMoreAvailable,
    fetchNextBatch,
    hasError,
    isLoading,
    retryCurrentBatch,
    selectedContactsNumber,
    onContactSelectToggle,
  } = useContactsList(api);
  return (
    <div
      css={css`
        display: flex;
        flex-flow: column wrap;
        align-items: center;
      `}
    >
      <div className="selected">{`${SELECTED_CONTACTS}${selectedContactsNumber}`}</div>
      <div className="list" role="list">
        {contactsList.map((contact) => (
          <PersonInfo
            key={contact.id}
            onSelect={onContactSelectToggle}
            {...contact}
          />
        ))}
      </div>
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
      {!hasError && (
        <div className="fetchMoreContainer">
          <Button
            disabled={!fetchMoreAvailable || isLoading}
            onClick={fetchNextBatch}
            text={LOAD_MORE}
          />
        </div>
      )}
    </div>
  );
};
