import { describe, expect, jest, beforeEach, xit, it } from '@jest/globals';
import { PortfolioService } from '../src/services/portfolioService';
import { ApiClient } from '../src/clients/apiClient';
import axios from 'axios';
import { Logger } from "../src/utils/logger";
import { AuthService } from "../src/services/authService";
import { apiEndpoints } from "../src/config/apiEndpoints";
import { PortfolioColor } from "../src/types/portfolio";

// Mock axios
jest.mock('axios');
const mockedAxios = axios.create() as jest.Mocked<typeof axios>;

// Disable logs
Logger.levels = [];

describe('PortfolioService', () => {
  let portfolioService: PortfolioService;
  let authService: AuthService;
  let apiClient: ApiClient;

  beforeEach(() => {
    authService = new AuthService(apiEndpoints.baseURL);
    apiClient = new ApiClient(authService, { baseURL: apiEndpoints.baseURL });
    portfolioService = new PortfolioService(apiClient);
  });

  xit('should create a portfolio successfully', async () => {
    // Mock API response
    const mockResponse = {
      data: {
        id: 1402496,
        name: 'Test Portfolio',
        description: 'Test Description',
        options: {
          color: 'INDIGO',
          includeInTotal: true,
        },
      },
    };

    // Mock axios POST request
    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    // Portfolio data
    const portfolioData = {
      name: 'Test Portfolio',
      description: 'Test Description',
      color: PortfolioColor.INDIGO,
      includeInTotal: true,
    };

    // Call createPortfolio method
    const result = await portfolioService.createPortfolio(portfolioData);

    // Verify that the returned result matches the mock response
    expect(result).toEqual(mockResponse.data);

    // Check that axios POST was called with correct parameters
    expect(mockedAxios.post).toHaveBeenCalledWith(
      '/portfolio/api/portfolioGroup',
      portfolioData
    );
  });

  xit('should fetch portfolios successfully', async () => {
    // Mock API response
    const mockResponse = {
      data: [
        {
          id: 1,
          name: 'Portfolio 1',
          description: 'First Portfolio',
        },
        {
          id: 2,
          name: 'Portfolio 2',
          description: 'Second Portfolio',
        },
      ],
    };

    // Mock axios GET request
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    // Call getPortfolios method
    const result = await portfolioService.getPortfolioGroups();

    // Verify that the returned result matches the mock response
    expect(result).toEqual(mockResponse.data);

    // Check that axios GET was called with the correct endpoint
    expect(mockedAxios.get).toHaveBeenCalledWith('/portfolio/api/portfolioGroup/short');
  });
});
