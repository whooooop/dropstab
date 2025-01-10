/**
 * @class DropstabAPI
 * Main factory class to initialize and manage API services for the Dropstab API.
 * Provides easy access to AuthService and PortfolioService.
 */

import { ApiClient } from '../clients/apiClient';
import { AuthService } from '../services/authService';
import { PortfolioService } from '../services/portfolioService';
import { Logger, LogLevel } from '../utils/logger';
import { AuthParams } from "../types/auth";
import { apiEndpoints } from "../config/apiEndpoints";

export interface DropstabAPIConfig {
  /**
   * Optional base URL for the Dropstab API.
   * Defaults to the value in the configuration.
   */
  baseURL?: string;

  /**
   * Optional array of log levels to enable.
   */
  logLevels?: LogLevel[];
}

export class DropstabAPI {
  private readonly apiClient: ApiClient;
  private readonly authService: AuthService;
  private readonly portfolioService: PortfolioService;

  /**
   * Initializes the DropstabAPI with the given configuration.
   *
   * @param {DropstabAPIConfig} config - Configuration object for the API.
   */
  constructor(config: DropstabAPIConfig) {
    const baseURL = config.baseURL || apiEndpoints.baseURL;

    if (config.logLevels) {
      Logger.levels = config.logLevels;
    }

    this.authService = new AuthService(config.baseURL);
    this.apiClient = new ApiClient(this.authService, { baseURL });
    this.portfolioService = new PortfolioService(this.apiClient);
  }

  /**
   * Logs in using the provided credentials and initializes the authentication token.
   *
   * @param {AuthParams} credentials - The email and password for login.
   * @returns {Promise<void>} A promise that resolves when the login is successful.
   */
  public login({ email, password }: AuthParams): Promise<void> {
    return this.authService.login({ email, password });
  }

  /**
   * Get the AuthService service instance.
   *
   * @returns {AuthService} The auth service instance.
   */
  public getAuthService(): AuthService {
    return this.authService;
  }

  /**
   * Gets the portfolio service instance.
   *
   * @returns {PortfolioService} The portfolio service instance.
   */
  public getPortfolioService(): PortfolioService {
    return this.portfolioService;
  }
}
