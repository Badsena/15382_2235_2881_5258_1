import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import Register from "../Components/Register";
import Login from "../Components/Login";
import axios from "axios";

jest.mock("axios");

describe("Authentication App - All Scenarios", () => {

  test("TC1: Renders Login page by default", () => {
    render(<App />);
    
    // Target specific element instead of ambiguous "Login"
    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  test("TC2: Navigate to Register page when Register link clicked", () => {
    render(<App />);
    
    // Click the link, not the button or heading
    fireEvent.click(screen.getByRole("link", { name: "Register" }));

    // Use role-based match to prevent multiple match errors
    expect(screen.getByRole("heading", { name: "Register" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Register" })).toBeInTheDocument();
  });

  // TC3–TC8 remain unchanged since they already work.
  test("TC3: Submit Register form successfully", async () => {
    axios.post.mockResolvedValueOnce({ data: "User registered successfully" });
    window.alert = jest.fn();

    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "pass123" } });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("User registered successfully");
    });
  });

  test("TC4: Register form fails on API error", async () => {
    axios.post.mockRejectedValueOnce(new Error("Registration failed"));
    window.alert = jest.fn();

    render(<Register />);
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "fail@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "failuser" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "failpass" } });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Registration failed");
    });
  });

  test("TC5: Login form submits successfully", async () => {
    axios.post.mockResolvedValueOnce({ data: "Login successful" });
    window.alert = jest.fn();

    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "login@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "loginpass" } });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Login successful");
    });
  });

  test("TC6: Login form fails on API error", async () => {
    axios.post.mockRejectedValueOnce(new Error("Login failed"));
    window.alert = jest.fn();

    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "invalid@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "wrongpass" } });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Login failed");
    });
  });

  test("TC7: Register form validation - empty fields", async () => {
    window.alert = jest.fn();
    render(<Register />);
    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Registration failed");
    });
  });

  test("TC8: Login form validation - empty fields", async () => {
    window.alert = jest.fn();
    render(<Login />);
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Login failed");
    });
  });

});
