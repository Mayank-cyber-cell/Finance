import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Target, BarChart3, Plus, Settings } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

const DashboardOverview: React.FC = () => {
  const { transactions, categories, updateUser } = useApp();
  const { user } = useAuth();

  // Calculate current month data
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const currentMonthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate.getMonth() === currentMonth && 
           transactionDate.getFullYear() === currentYear;
  });

  const totalIncome = currentMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = currentMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const currentBalance = totalIncome - totalExpenses;

  // Calculate previous month for comparison
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const previousMonthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate.getMonth() === previousMonth && 
           transactionDate.getFullYear() === previousYear;
  });

  const previousMonthExpenses = previousMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenseChange = previousMonthExpenses > 0 
    ? ((totalExpenses - previousMonthExpenses) / previousMonthExpenses) * 100 
    : 0;

  const stats = [
    {
      title: 'Current Balance',
      value: currentBalance,
      icon: DollarSign,
      color: currentBalance >= 0 ? 'text-green-600' : 'text-red-600',
      bgColor: currentBalance >= 0 ? 'bg-green-50' : 'bg-red-50',
      borderColor: currentBalance >= 0 ? 'border-green-200' : 'border-red-200'
    },
    {
      title: 'Monthly Income',
      value: user?.monthlyIncome || 0,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      isIncome: true
    },
    {
      title: 'Total Income',
      value: totalIncome,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      change: '+12.5%'
    },
    {
      title: 'Total Expenses',
      value: totalExpenses,
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      change: expenseChange > 0 ? `+${expenseChange.toFixed(1)}%` : `${expenseChange.toFixed(1)}%`
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
        <p className="text-blue-100">Here's your financial overview for this month</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`p-6 rounded-xl border ${stat.borderColor} ${stat.bgColor} hover:shadow-lg transition-all duration-200`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>
                    {formatCurrency(stat.value)}
                  </p>
                  {stat.isIncome && user?.monthlyIncome && (
                    <button 
                      onClick={() => {
                        const income = prompt('Update monthly income (₹):', user.monthlyIncome?.toString());
                        if (income && !isNaN(Number(income))) {
                          updateUser({ monthlyIncome: Number(income) });
                        }
                      }}
                      className="text-xs text-blue-600 hover:text-blue-700 mt-1 flex items-center"
                    >
                      <Settings className="w-3 h-3 mr-1" />
                      Update
                    </button>
                  )}
                  {stat.change && (
                    <p className={`text-sm font-medium mt-1 ${
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change} from last month
                    </p>
                  )}
                </div>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 text-center bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-xl border border-green-200 transition-all duration-200 group">
            <div className="w-10 h-10 bg-green-500 rounded-lg mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-medium text-green-700">Add Income</p>
          </button>
          
          <button className="p-4 text-center bg-gradient-to-r from-red-50 to-rose-50 hover:from-red-100 hover:to-rose-100 rounded-xl border border-red-200 transition-all duration-200 group">
            <div className="w-10 h-10 bg-red-500 rounded-lg mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingDown className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-medium text-red-700">Add Expense</p>
          </button>
          
          <button className="p-4 text-center bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl border border-blue-200 transition-all duration-200 group">
            <div className="w-10 h-10 bg-blue-500 rounded-lg mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-medium text-blue-700">View Reports</p>
          </button>
          
          <button className="p-4 text-center bg-gradient-to-r from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 rounded-xl border border-purple-200 transition-all duration-200 group">
            <div className="w-10 h-10 bg-purple-500 rounded-lg mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Target className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-medium text-purple-700">Set Budget</p>
          </button>
        </div>
      </div>

      {/* Recent Transactions Preview */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View All</button>
        </div>
        <div className="space-y-3">
          {currentMonthTransactions.slice(0, 5).map((transaction) => {
            const category = categories.find(c => c.id === transaction.categoryId);
            return (
              <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{category?.icon || '💰'}</div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{category?.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;