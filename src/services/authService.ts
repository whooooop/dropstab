/**
 * @class AuthService
 * Service for handling authentication with the Dropstab API.
 * This service includes methods for logging in and refreshing tokens.
 */

import axios from 'axios';
import { apiEndpoints } from '../config/apiEndpoints';
import { Logger } from '../utils/logger';
import { AuthParams } from "../types/auth";

export class AuthService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private readonly apiUrl: string;
  private logger: Logger = new Logger('AuthService');

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  /**
   * Perform login with email and password.
   * This method sends a POST request to the `/portfolio/login` endpoint to authenticate a user.
   *
   * @param {AuthParams} params - Object containing email and password.
   * @returns {Promise<void>}
   * @throws Will throw an error if the login request fails.
   */
  public async login({ email, password }: AuthParams): Promise<void> {
    try {
      this.logger.info('Attempting to log in...', email);
      const response = await axios.post(`${this.apiUrl}${apiEndpoints.auth.login}`, { email, password });
      this.accessToken = response.data.accessToken;
      this.refreshToken = response.data.refreshToken;
      this.logger.info('✅ Login successful');
    } catch (error) {
      this.logger.error('Login failed:', error.message);
      throw error;
    }
  }

  /**
   * Refresh the access token if it's expired.
   * This method sends a POST request to the `/portfolio/refreshToken` endpoint to get a new access token.
   *
   * @returns {Promise<void>}
   * @throws Will throw an error if the refresh request fails or if the refresh token is not available.
   */
  public async refreshAccessToken(): Promise<void> {
    if (!this.refreshToken) {
      this.logger.warn('No refresh token available. Please log in again.');
      throw new Error('No refresh token available. Please log in again.');
    }

    try {
      this.logger.info('Refreshing access token...');
      const response = await axios.post(`${this.apiUrl}${apiEndpoints.auth.refreshToken}`, {
        refreshToken: this.refreshToken,
      });
      this.accessToken = response.data.accessToken;
      this.refreshToken = response.data.refreshToken;
      this.logger.info('Access token refreshed');
    } catch (error) {
      this.logger.error('Token refresh failed:', error);
      throw error;
    }
  }

  /**
   * Get the current access token
   */
  public async getAccessToken(): Promise<string> {
    if (this.accessToken) {
      this.logger.debug('Returning cached access token');
      return this.accessToken;
    }

    await this.refreshAccessToken();
    return this.accessToken!;
  }
}
