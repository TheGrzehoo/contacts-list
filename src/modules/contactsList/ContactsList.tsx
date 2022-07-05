import { useState } from "react";
import apiData from "src/api/api";
import { ContactResponse } from "src/api/api.model";
import PersonInfo from "src/components/personInfo/PersonInfo";
import { SELECTED_CONTACTS } from "./contactsList.settings";

interface ContactListProps {
  api?: () => Promise<ContactResponse[] | void>;
}

export const ContactsList = ({ api = apiData }: ContactListProps) => {
  const [data, setData] = useState<ContactResponse[]>([]);
  const [selected, setSelected] = useState([]);
  return (
    <>
      <div className="selected">{`${SELECTED_CONTACTS}${selected.length}`}</div>
      <div className="list">
        {data.map(({ emailAddress, firstNameLastName, id, jobTitle }) => (
          <PersonInfo
            key={id}
            emailAddress={emailAddress}
            firstNameLastName={firstNameLastName}
            jobTitle={jobTitle}
          />
        ))}
      </div>
    </>
  );
};
