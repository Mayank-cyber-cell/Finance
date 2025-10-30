import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, Category, Budget, AppContextType, User } from '../types';
import { useAuth } from './AuthContext';
import { mockTransactions, mockCategories } from '../data/mockData';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    if (user) {
      // Load user data
      const savedTransactions = localStorage.getItem(`transactions_${user.id}`);
      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions));
      } else {
        setTransactions(mockTransactions);
      }
    }
  }, [user]);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'userId'>) => {
    if (!user) return;
    
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      userId: user.id
    };
    
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    localStorage.setItem(`transactions_${user.id}`, JSON.stringify(updatedTransactions));
  };

  const updateTransaction = (id: string, updatedTransaction: Partial<Transaction>) => {
    if (!user) return;
    
    const updatedTransactions = transactions.map(t => 
      t.id === id ? { ...t, ...updatedTransaction } : t
    );
    setTransactions(updatedTransactions);
    localStorage.setItem(`transactions_${user.id}`, JSON.stringify(updatedTransactions));
  };

  const deleteTransaction = (id: string) => {
    if (!user) return;
    
    const updatedTransactions = transactions.filter(t => t.id !== id);
    setTransactions(updatedTransactions);
    localStorage.setItem(`transactions_${user.id}`, JSON.stringify(updatedTransactions));
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString()
    };
    
    setCategories([...categories, newCategory]);
  };

  const updateCategory = (id: string, updatedCategory: Partial<Category>) => {
    setCategories(categories.map(c => 
      c.id === id ? { ...c, ...updatedCategory } : c
    ));
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const updateUser = (updatedUser: Partial<User>) => {
    if (!user) return;
    
    const updated = { ...user, ...updatedUser };
    localStorage.setItem('financeUser', JSON.stringify(updated));
    // In a real app, this would update the auth context
    window.location.reload(); // Simple refresh to update user data
  };

  const value: AppContextType = {
    transactions,
    categories,
    budgets,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addCategory,
    updateCategory,
    deleteCategory,
    updateUser
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};