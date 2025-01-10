import { config } from 'dotenv';
import { DropstabAPI } from "./core/serviceAPIFactory";
import { PortfolioColor } from "./types/portfolio";

config();

(async () => {
  const email = process.env.EMAIL!;
  const password = process.env.PASSWORD!;

  const apiClient = new DropstabAPI({
    logLevels: ['info', 'error', 'debug'],
  });

  // Login
  await apiClient.login({ email, password });

  const portfolioService = apiClient.getPortfolioService();

  // Create Portfolio
  // const newPortfolio = await portfolioService.createPortfolio({
  //   name: 'My Portfolio',
  //   description: 'This is my first portfolio',
  //   color: PortfolioColor.BLUE,
  //   includeInTotal: true,
  // });

  // console.log('✅ Created Portfolio:', newPortfolio);
})();
