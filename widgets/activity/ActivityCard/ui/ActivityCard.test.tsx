import { render, screen } from '@testing-library/react';
import { ActivityCard } from './ActivityCard';
import { useRootStore } from '@/stores/useRootStore';

jest.mock('@/stores/useRootStore', () => ({
  useRootStore: jest.fn(),
}));

const mockActivity = {
  id: '1',
  title: 'Поход в горы',
  description: 'Треккинг по горам',
  category: 'Спорт',
  activateOnUtc: '2025-07-10T10:00:00Z',
  location: 'Сочи',
  price: 500,
  currentParticipants: 3,
  maxParticipants: 8,
  isAuthor: false,
  isFavorite: false,
};

describe('ActivityCard', () => {
  it('рендерит заголовок и описание', () => {
  
    (useRootStore as unknown as jest.Mock).mockReturnValue({
      auth: { user: { id: 'user2' } },
    });
    
    render(<ActivityCard data={mockActivity} />);
    
    expect(screen.getByText(/поход в горы/i)).toBeInTheDocument();
    expect(screen.getByText(/Треккинг по горам/)).toBeInTheDocument();
  });
});