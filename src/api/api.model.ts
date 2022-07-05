export interface ContactResponse {
  id: string;
  jobTitle: string;
  emailAddress: string;
  firstNameLastName: string;
}

export interface ContactsListApiResponse {
  data: ContactResponse[];
  fetchMoreAvailable: boolean;
}
