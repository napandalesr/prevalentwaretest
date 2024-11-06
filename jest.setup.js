import '@testing-library/jest-dom';


jest.mock('next/navigation', () => ({
  ...require('next-router-mock'),
  useRouter: () => {
    const router = {
      push: jest.fn(params => params)
    }
    return router;
  }
}));