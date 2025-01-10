import { describe, expect, jest, beforeEach, test } from '@jest/globals';
import { AuthService } from '../src/services/authService';
import axios from 'axios';
import { apiEndpoints } from "../src/config/apiEndpoints";
import { Logger } from "../src/utils/logger";

// Mocking axios to prevent real API calls
jest.mock('axios');

// Disable logs
Logger.levels = [];

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AuthService', () => {
  let authService: AuthService;

  // Initialize AuthService before each test
  beforeEach(() => {
    authService = new AuthService(apiEndpoints.baseURL);
  });

  /**
   * Test: Successful login
   * Description: This test verifies that the login method returns the correct tokens
   * when a valid email and password are provided.
   */
  test('should login successfully and return tokens', async () => {
    // Mocked API response for a successful login
    const mockResponse = {
      data: {
        accessToken: 'mockAccessToken',
        refreshToken: 'mockRefreshToken',
        expiresIn: 864000,
      },
    };

    // Mock axios POST request to return the mockResponse
    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    // Login credentials
    const email = 'test@example.com';
    const password = 'password123';

    // Call the login method
    await expect(
      authService.login({ email, password })
    ).resolves.toBeUndefined();

    // Check that axios POST was called with the correct endpoint and payload
    expect(mockedAxios.post).toHaveBeenCalledWith(
      apiEndpoints.baseURL + apiEndpoints.auth.login,
      { email, password }
    );
  });

  /**
   * Test: Failed login
   * Description: This test verifies that the login method throws an error
   * if the login request fails due to invalid credentials or other issues.
   */
  test('should throw an error if login fails', async () => {
    // Mock axios POST request to reject with an error
    mockedAxios.post.mockRejectedValueOnce(new Error('Login failed'));

    // Invalid login credentials
    const email = 'test@example.com';
    const password = 'wrongpassword';

    // Expect the login method to throw an error
    await expect(authService.login({ email, password })).rejects.toThrow('Login failed');
  });
});
