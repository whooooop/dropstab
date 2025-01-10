/**
 * @class PortfolioService
 * Service for managing portfolios on the Dropstab API.
 * This service includes methods for creating and fetching portfolio groups.
 */

import { ApiClient } from '../clients/apiClient';
import { apiEndpoints } from '../config/apiEndpoints';
import { Logger } from '../utils/logger';
import { CreatePortfolioParams, PortfolioShort } from "../types/portfolio";

export class PortfolioService {
  private apiClient: ApiClient;
  private logger: Logger = new Logger('PortfolioService');

  /**
   * Initializes the PortfolioService with an instance of ApiClient.
   * @param {ApiClient} apiClient - The API client to use for making requests.
   */
  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Create a new portfolio group.
   * This method sends a POST request to the API to create a new portfolio group with the provided parameters.
   *
   * @param {CreatePortfolioParams} params - Parameters required to create a portfolio group.
   * @returns {Promise<any>} The created portfolio details.
   * @throws Will throw an error if the request fails.
   */
  public async createPortfolio(params: CreatePortfolioParams): Promise<any> {
    try {
      const { url, method } = apiEndpoints.portfolio.create;
      this.logger.info('Creating portfolio...', params);
      const response = await this.apiClient[method](url, params);
      this.logger.info('Portfolio created successfully:', response.data);
      return response.data;
    } catch (error) {
      this.logger.error('Error creating portfolio:', error);
      throw error;
    }
  }

  /**
   * Get the list of portfolio groups.
   * This method sends a GET request to retrieve all portfolio groups for the authenticated user.
   *
   * @returns {Promise<PortfolioShort[]>} An array of portfolio group details.
   * @throws Will throw an error if the request fails.
   */
  public async getPortfolioGroups(): Promise<PortfolioShort> {
    this.logger.info('Fetching portfolio groups');
    try {
      const { url, method } = apiEndpoints.portfolio.group;
      const response = await this.apiClient[method](url);
      this.logger.info('Portfolio groups fetched successfully');
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching portfolio groups', error);
      throw error;
    }
  }
}
