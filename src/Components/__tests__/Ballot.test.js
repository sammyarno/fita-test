import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Ballot from '../Ballot';

const data = [
  {
    id: 'best-picture',
    title: 'Best Picture',
    items: [
      {
        id: 'nomadland',
        title: 'Nomadland',
        photoUrl: 'https://variety.com/wp-content/uploads/2020/12/nomadland_ver2.jpg',
      },
      {
        id: 'mank',
        title: 'Mank',
        photoUrl: 'https://variety.com/wp-content/uploads/2020/12/mank.jpg',
      },
    ],
  }
];

beforeEach(() => {
  jest.useFakeTimers()
});

afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
});

jest.mock('../../Api', () => ({
  ...jest.requireActual('../../Api'),
  getBallotData: () => ({
    items: data,
  })
}));

test('renders ballot successfully', () => {
  render(<Ballot />);
  const title = screen.getByText('awards 2021');
  expect(title).toBeInTheDocument();
});

test('renders categories correctly', async () => {
  render(<Ballot />);

  const categories = await screen.findAllByTestId('categoryItemToggle');
  expect(categories).toHaveLength(data.length);
  expect(categories[0]).toBeInTheDocument();

  userEvent.click(categories[0]);

  const nominees = await screen.findAllByTestId('nomineeItem');
  expect(nominees).toHaveLength(data[0].items.length);
  expect(nominees[0]).toBeInTheDocument();
});
