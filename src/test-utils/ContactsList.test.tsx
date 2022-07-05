import {
  render,
  waitForElementToBeRemoved,
  screen,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  REQUEST_FAILED_MESSAGE,
  SELECTED_CONTACTS,
} from "src/modules/contactsList/contactsList.settings";
import { API_BATCH_SIZE } from "../api/api.settings";
import { failApiMock, successApiMock } from "./api.mock";
import mockData from "../mockData.json";
import { ContactsList } from "src/modules/contactsList/contactsList";

describe("[ContactsList]", () => {
  it("should display first batch of contacts on initail load", async () => {
    render(<ContactsList api={successApiMock} />);
    await waitForElementToBeRemoved(screen.getByRole("alert"));

    expect(screen.getAllByRole("listitem").length).toEqual(API_BATCH_SIZE);
  });

  it("should display next batch of contacts on more contacts request", async () => {
    render(<ContactsList api={successApiMock} />);
    await waitForElementToBeRemoved(screen.getByRole("alert"));

    userEvent.click(
      screen.getByRole("button", { name: /show-more-contacts/i })
    );

    await waitForElementToBeRemoved(screen.getByRole("alert"));

    expect(screen.getAllByRole("listitem").length).toEqual(API_BATCH_SIZE * 2);
  });

  it("should display error message on fail request and allow user to manually refetch contacts", async () => {
    render(<ContactsList api={failApiMock} />);
    await waitForElementToBeRemoved(screen.getByRole("alert"));

    expect(screen.getByText(REQUEST_FAILED_MESSAGE));

    userEvent.click(
      screen.getByRole("button", { name: /retry-contacts-fetch/i })
    );

    await waitForElementToBeRemoved(screen.getByRole("alert"));
  });

  it("should display proper number of selected contacts, and place selected contacts on top of the list, deselect contacts", async () => {
    render(<ContactsList api={successApiMock} />);
    await waitForElementToBeRemoved(screen.getByRole("alert"));

    expect(
      within(screen.getAllByRole("listitem")[0]).getByText(
        mockData[0].firstNameLastName
      )
    ).toBeVisible();

    userEvent.click(screen.getAllByRole("listitem")[1]);
    userEvent.click(screen.getAllByRole("listitem")[3]);

    expect(
      within(screen.getAllByRole("listitem")[0]).getByText(
        mockData[1].firstNameLastName
      )
    ).toBeVisible();
    expect(
      within(screen.getAllByRole("listitem")[1]).getByText(
        mockData[3].firstNameLastName
      )
    ).toBeVisible();
    expect(screen.getByText(`${SELECTED_CONTACTS}2`));

    userEvent.click(screen.getAllByRole("listitem")[0]);
    expect(
      within(screen.getAllByRole("listitem")[0]).getByText(
        mockData[3].firstNameLastName
      )
    ).toBeVisible();
    expect(screen.getByText(`${SELECTED_CONTACTS}1`));
  });
});
