import { useCallback, useState } from "react";
import apiData from "src/api/api";
import { ContactResponse, ContactsListApiResponse } from "src/api/api.model";

export enum ContactsListApiStateEnum {
  Loaded,
  Loading,
  Error,
}

interface LoadedContactsListApiState {
  type: ContactsListApiStateEnum.Loaded;
  contactsList: ContactResponse[];
  fetchMoreAvailable: boolean;
}

interface LoadingContactsListApiState {
  type: ContactsListApiStateEnum.Loading;
}

interface ErrorContactsListApiState {
  type: ContactsListApiStateEnum.Error;
  contactsList: ContactResponse[];
  errorMessage: string;
}

export const useContactsListApi = (
  api: () => Promise<ContactsListApiResponse> = apiData
) => {
  const [contactsListApiState, setContactsListApiState] = useState<
    | LoadedContactsListApiState
    | LoadingContactsListApiState
    | ErrorContactsListApiState
  >({
    type: ContactsListApiStateEnum.Loading,
  });

  const fetchNextBatch = useCallback(
    (isInitialDataLoad?: boolean) => {
      if (!isInitialDataLoad) {
        setContactsListApiState({
          type: ContactsListApiStateEnum.Loading,
        });
      }
      api()
        .then(({ data, fetchMoreAvailable }) => {
          setContactsListApiState({
            type: ContactsListApiStateEnum.Loaded,
            contactsList: data,
            fetchMoreAvailable,
          });
        })
        .catch((error) => {
          setContactsListApiState({
            type: ContactsListApiStateEnum.Error,
            contactsList: [],
            errorMessage: error.message,
          });
        });
    },
    [api]
  );

  const retryCurrentBatch = () => fetchNextBatch(false);

  return {
    contactsListApiState,
    fetchNextBatch,
    retryCurrentBatch,
  };
};
