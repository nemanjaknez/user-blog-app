import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../utils/testUtils";
import { UsersTable } from "./UsersTable";
import { setupStore } from "../../redux/store";

describe("UsersTable Component", () => {
  it("renders UsersTable component", () => {
    renderWithProviders(<UsersTable />);

    expect(screen.getByText("NaviPartner Tech Test")).toBeInTheDocument();
  });

  it("filters users by name", async () => {
    renderWithProviders(<UsersTable />);

    const searchInput = screen.getByLabelText("Search by Name:");

    await waitFor(() => screen.getByText("Timothee"));

    fireEvent.change(searchInput, { target: { value: "Timothee" } });
    expect(screen.getByText("Timothee")).toBeInTheDocument();
  });
});
