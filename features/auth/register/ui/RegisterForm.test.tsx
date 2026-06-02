import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RegisterForm } from "./RegisterForm";
import { useRootStore } from "@/stores/useRootStore";
import { useRouter } from "next/navigation";

jest.mock("@/stores/useRootStore", () => ({
  useRootStore: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("RegisterForm", () => {
  const mockPush = jest.fn();
  const mockRegister = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    const mockUseRootStore = useRootStore as unknown as jest.Mock;

    mockUseRootStore.mockReturnValue({
      auth: {
        register: mockRegister,
        isLoading: false,
        error: null,
        clearError: jest.fn(),
      },
    });
  });

  it("рендерит поля email, password, firstName и кнопку", () => {
    render(<RegisterForm />);

    expect(screen.getByTestId(/email/i)).toBeInTheDocument();
    expect(screen.getByTestId(/password/i)).toBeInTheDocument();
    expect(screen.getByTestId(/name/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /стать участником/i }),
    ).toBeInTheDocument();
  });

  it("показывает ошибку при невалидном email", async () => {
    render(<RegisterForm />);

    const emailInput = screen.getByTestId("email");
    const submitButton = screen.getByRole("button", {
      name: /стать участником/i,
    });

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/некорректный формат email/i),
      ).toBeInTheDocument();
    });

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it("показывает ошибку при пароле короче 6 символов", async () => {
    render(<RegisterForm />);

    const passwordInput = screen.getByTestId("password");
    const submitButton = screen.getByRole("button", {
      name: /стать участником/i,
    });

    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/минимум 6 символов/i)).toBeInTheDocument();
    });

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it("при успешной регистрации вызывает register и делает редирект на главную", async () => {
    mockRegister.mockResolvedValueOnce(true); // регистрация успешна

    render(<RegisterForm />);

    fireEvent.change(screen.getByTestId("name"), {
      target: { value: "Тест" },
    });
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /стать участником/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        email: "test@test.com",
        password: "123456",
        firstName: "Тест",
        lastName: undefined,
        city: undefined,
      });

      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });
});
