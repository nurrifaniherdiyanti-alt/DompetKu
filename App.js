import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AddTransactionScreen from './src/screens/AddTransactionScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [transactions, setTransactions] = useState([
    { id: '1', title: 'Uang Saku Mingguan', amount: 300000, type: 'income', date: '14/11/2026' },
    { id: '2', title: 'Jajan & Kopi', amount: 25000, type: 'expense', date: '14/11/2026' },
  ]);

  // CREATE
  const handleAddTransaction = (newItem) => {
    setTransactions([newItem, ...transactions]);
  };

  // UPDATE
  const handleUpdateTransaction = (updatedItem) => {
    setTransactions(
      transactions.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  // DELETE
  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home">
            {(props) => (
              <HomeScreen
                {...props}
                transactions={transactions}
                onDeleteTransaction={handleDeleteTransaction}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="AddTransaction">
            {(props) => (
              <AddTransactionScreen
                {...props}
                onAddTransaction={handleAddTransaction}
                onUpdateTransaction={handleUpdateTransaction}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}