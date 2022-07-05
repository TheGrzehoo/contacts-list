import { useState, useEffect, useMemo } from "react";
import { ContactResponse, ContactsListApiResponse } from "src/api/api.model";
import {
  ContactsListApiStateEnum,
  useContactsListApi,
} from "src/utils/useContactsListApi";

interface ContactItem extends ContactResponse {
  selected: boolean;
}

export const useContactsList = (
  api?: () => Promise<ContactsListApiResponse>
) => {
  const { contactsListApiState, fetchNextBatch, retryCurrentBatch } =
    useContactsListApi(api);
  const [contactsList, setContactsList] = useState<ContactItem[]>([]);

  const selectedContactsNumber = useMemo(() => {
    return contactsList.reduce((total, contact) => {
      if (contact.selected) {
        return total + 1;
      }
      return total;
    }, 0);
  }, [contactsList]);

  const sortedContactsList = [...contactsList].sort((contactA, contactB) => {
    if (contactA.selected && contactB.selected) {
      return 0;
    } else if (contactA.selected && !contactB.selected) {
      return -1;
    } else {
      return 1;
    }
  });

  const onContactSelectToggle = (contactId: string) => {
    setContactsList((currentContactsList) =>
      currentContactsList.map((contact) => {
        if (contact.id === contactId) {
          return { ...contact, selected: !contact.selected };
        } else {
          return contact;
        }
      })
    );
  };

  useEffect(() => {
    fetchNextBatch(true);
  }, [fetchNextBatch]);

  useEffect(() => {
    if (contactsListApiState.type === ContactsListApiStateEnum.Loaded) {
      setContactsList((previousList) => [
        ...previousList,
        ...contactsListApiState.contactsList.map((contactData) => ({
          ...contactData,
          selected: false,
        })),
      ]);
    }
  }, [contactsListApiState]);

  return {
    contactsList: sortedContactsList,
    fetchMoreAvailable:
      contactsListApiState.type === ContactsListApiStateEnum.Loaded &&
      contactsListApiState.fetchMoreAvailable,
    fetchNextBatch: () => fetchNextBatch(),
    retryCurrentBatch,
    onContactSelectToggle,
    isLoading: contactsListApiState.type === ContactsListApiStateEnum.Loading,
    hasError: contactsListApiState.type === ContactsListApiStateEnum.Error,
    selectedContactsNumber,
  };
};
