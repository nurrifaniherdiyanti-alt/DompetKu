import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import BalanceCard from '../components/BalanceCard';
import TransactionItem from '../components/TransactionItem';
import CustomButton from '../components/CustomButton';

export default function HomeScreen({ navigation, transactions, onDeleteTransaction }) {
  const [summary, setSummary] = useState({ balance: 0, income: 0, expense: 0 });

  useEffect(() => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((item) => {
      if (item.type === 'income') {
        totalIncome += item.amount;
      } else {
        totalExpense += item.amount;
      }
    });

    setSummary({
      income: totalIncome,
      expense: totalExpense,
      balance: totalIncome - totalExpense,
    });
  }, [transactions]);

  const confirmDelete = (id, title) => {
    Alert.alert(
      'Hapus Transaksi',
      `Yakin ingin menghapus "${title}"?`,
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus', style: 'destructive', onPress: () => onDeleteTransaction(id) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="DompetKu"
        subtitle="Catat pemasukan & pengeluaran harianmu"
      />

      <BalanceCard
        balance={summary.balance}
        income={summary.income}
        expense={summary.expense}
      />

      <Text style={styles.sectionTitle}>Riwayat Transaksi</Text>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem
            title={item.title}
            amount={item.amount}
            type={item.type}
            date={item.date}
            onEdit={() => navigation.navigate('AddTransaction', { itemToEdit: item })}
            onDelete={() => confirmDelete(item.id, item.title)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Belum ada transaksi tercatat.</Text>
        }
      />

      <View style={styles.footer}>
        <CustomButton
          title="+ Tambah Transaksi"
          onPress={() => navigation.navigate('AddTransaction')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F9FF' },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0C4A6E',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  emptyText: { textAlign: 'center', color: '#64748B', marginTop: 20 },
  footer: { paddingHorizontal: 16, paddingBottom: 10 },
});