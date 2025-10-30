import { Transaction, Category } from '../types';

export const mockCategories: Category[] = [
  // Expense categories
  { id: '1', name: 'Food & Dining', icon: '🍽️', color: '#F59E0B', type: 'expense' },
  { id: '2', name: 'Transportation', icon: '🚗', color: '#3B82F6', type: 'expense' },
  { id: '3', name: 'Shopping', icon: '🛍️', color: '#8B5CF6', type: 'expense' },
  { id: '4', name: 'Entertainment', icon: '🎬', color: '#EF4444', type: 'expense' },
  { id: '5', name: 'Bills & Utilities', icon: '⚡', color: '#F97316', type: 'expense' },
  { id: '6', name: 'Healthcare', icon: '🏥', color: '#10B981', type: 'expense' },
  { id: '7', name: 'Education', icon: '📚', color: '#6366F1', type: 'expense' },
  { id: '8', name: 'Travel', icon: '✈️', color: '#14B8A6', type: 'expense' },
  
  // Income categories
  { id: '9', name: 'Salary', icon: '💰', color: '#10B981', type: 'income' },
  { id: '10', name: 'Freelance', icon: '💻', color: '#6366F1', type: 'income' },
  { id: '11', name: 'Investment', icon: '📈', color: '#059669', type: 'income' },
  { id: '12', name: 'Gift', icon: '🎁', color: '#EC4899', type: 'income' }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 75000,
    categoryId: '9',
    description: 'Monthly Salary',
    date: '2025-01-01',
    userId: '1'
  },
  {
    id: '2',
    type: 'expense',
    amount: 1250,
    categoryId: '1',
    description: 'Grocery shopping at Big Bazaar',
    date: '2025-01-02',
    userId: '1'
  },
  {
    id: '3',
    type: 'expense',
    amount: 2500,
    categoryId: '2',
    description: 'Petrol fill-up',
    date: '2025-01-02',
    userId: '1'
  },
  {
    id: '4',
    type: 'expense',
    amount: 499,
    categoryId: '4',
    description: 'Netflix subscription',
    date: '2025-01-03',
    userId: '1'
  },
  {
    id: '5',
    type: 'expense',
    amount: 3500,
    categoryId: '5',
    description: 'Electric bill',
    date: '2025-01-04',
    userId: '1'
  },
  {
    id: '6',
    type: 'income',
    amount: 15000,
    categoryId: '10',
    description: 'Web design project',
    date: '2025-01-05',
    userId: '1'
  },
  {
    id: '7',
    type: 'expense',
    amount: 1800,
    categoryId: '1',
    description: 'Dinner at restaurant',
    date: '2025-01-06',
    userId: '1'
  },
  {
    id: '8',
    type: 'expense',
    amount: 4500,
    categoryId: '3',
    description: 'New running shoes',
    date: '2025-01-07',
    userId: '1'
  }
];