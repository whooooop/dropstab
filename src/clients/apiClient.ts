/**
 * @class ApiClient
 * A generic API client for making HTTP requests to the Dropstab API.
 * This client handles request methods like GET, POST, PUT, and DELETE,
 * and automatically attaches authentication headers.
 */

import axios, { AxiosInstance } from 'axios';
import { AuthService } from '../services/authService';
import { Logger } from "../utils/logger";

export interface ApiClientConfig {
  baseURL: string;
}

export class ApiClient {
  private client: AxiosInstance;
  private authService: AuthService;
  private logger: Logger = new Logger('ApiClient');

  /**
   * Initializes the ApiClient with authentication and configuration.
   *
   * @param {AuthService} authService - The authentication service to manage tokens.
   * @param {ApiClientConfig} config - Configuration object with baseURL for the API.
   */
  constructor(authService: AuthService, config: ApiClientConfig) {
    this.authService = authService;

    this.client = axios.create({
      baseURL: config.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Intercept requests to add Authorization header
    this.client.interceptors.request.use(async (config) => {
      const token = await this.authService.getAccessToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });
  }

  /**
   * Sends a GET request to the specified URL.
   *
   * @template T
   * @param {string} url - The endpoint URL to send the GET request to.
   * @returns {Promise<T>} The response data.
   */
  public get<T>(url: string) {
    return this.client.get<T>(url);
  }

  /**
   * Sends a POST request to the specified URL with optional data.
   *
   * @template T
   * @param {string} url - The endpoint URL to send the POST request to.
   * @param {any} [data] - Optional data to send in the POST request.
   * @returns {Promise<T>} The response data.
   */
  public post<T>(url: string, data?: any) {
    return this.client.post<T>(url, data);
  }
}
