
import { useRootStore } from "./useRootStore";

global.fetch = jest.fn();

const currentState = useRootStore.getState();

beforeEach(() => {

  useRootStore.setState({
    auth: {
      ...currentState.auth,
      user: null,
      accessToken: null,
      isLoading: false,
      error: null,
    },
  });

  jest.clearAllMocks();
});

describe("auth store - login", () => {
  it("при успешном логине сохраняет user и accessToken", async () => {
  
    const mockUser = {
      id: "123",
      email: "test@test.com",
      firstName: "Тест",
    };
    const mockToken = "fake-access-token";

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        data: {
          user: mockUser,
          accessToken: mockToken,
        },
      }),
    });

    const { auth } = useRootStore.getState();
    const result = await auth.login("test@test.com", "123456");

    expect(result).toBe(true);

    expect(useRootStore.getState().auth.user).toEqual(mockUser);

    expect(useRootStore.getState().auth.accessToken).toBe(mockToken);

    expect(useRootStore.getState().auth.isLoading).toBe(false);
  });

  it("при ошибке логина не сохраняет пользователя", async () => {

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        success: false,
        error: { message: "Invalid credentials" },
      }),
    });

    const initialState = useRootStore.getState();

    const { auth } = useRootStore.getState();
    const result = await auth.login("wrong@test.com", "wrong");

    expect(result).toBe(false);

    expect(useRootStore.getState().auth.user).toBe(initialState.auth.user);

    expect(useRootStore.getState().auth.accessToken).toBe(
      initialState.auth.accessToken,
    );
  });
});

describe('auth store - register', () => {
  it('при успешной регистрации сохраняет user и accessToken', async () => {
    const mockUser = { id: '456', email: 'new@test.com', firstName: 'Новый' };
    const mockToken = 'fake-register-token';

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        data: { user: mockUser, accessToken: mockToken },
      }),
    });

    const { auth } = useRootStore.getState();
    const result = await auth.register({
      email: 'new@test.com',
      password: '123456',
      firstName: 'Новый',
    });

    expect(result).toBe(true);
    expect(useRootStore.getState().auth.user).toEqual(mockUser);
    expect(useRootStore.getState().auth.accessToken).toBe(mockToken);
  });

  it('при ошибке регистрации не сохраняет пользователя', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        success: false,
        error: { message: 'Email already exists' },
      }),
    });

    const initialState = useRootStore.getState();
    const { auth } = useRootStore.getState();
    const result = await auth.register({
      email: 'exists@test.com',
      password: '123456',
      firstName: 'Тест',
    });

    expect(result).toBe(false);
    expect(useRootStore.getState().auth.user).toBe(initialState.auth.user);
    expect(useRootStore.getState().auth.accessToken).toBe(initialState.auth.accessToken);
  });
});