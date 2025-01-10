/**
 * @file apiEndpoints.ts
 * Contains the default base URL and endpoint paths for the Dropstab API.
 * This file provides a central location to manage all API endpoints.
 */

export const apiEndpoints = {
  /**
   * The base URL for the Dropstab API.
   */
  baseURL: 'https://api2.icodrops.com',

  auth: {
    /**
     * Endpoint for user login.
     * Method: POST
     */
    login: '/portfolio/login',

    /**
     * Endpoint for refreshing the access token.
     * Method: POST
     */
    refreshToken: '/portfolio/refreshToken',
  },

  portfolio: {
    /**
     * Endpoint for creating a portfolio group.
     * Method: POST
     */
    create: {
      method: 'POST',
      url: '/portfolio/api/portfolioGroup',
    },

    /**
     * Endpoint for retrieving a short list of portfolio groups.
     * Method: GET
     */
    group: {
      method: 'GET',
      url: '/portfolio/api/portfolioGroup/short'
    },

    /**
     * Endpoint for retrieving details of a specific portfolio group by ID.
     * Method: GET
     * Replace `:id` with the portfolio group ID.
     */
    item: {
      method: 'GET',
      url: '/portfolio/api/portfolioGroup/:id'
    }
  },
};
