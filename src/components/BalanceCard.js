import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const formatRupiah = (angka) => {
  return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export default function BalanceCard({ balance, income, expense }) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Sisa Saldo Saat Ini</Text>
      <Text style={styles.balanceText}>{formatRupiah(balance)}</Text>

      <View style={styles.row}>
        <View style={styles.box}>
          <Text style={styles.subLabel}>Pemasukan</Text>
          <Text style={[styles.amount, { color: '#16A34A' }]}>
            + {formatRupiah(income)}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.box}>
          <Text style={styles.subLabel}>Pengeluaran</Text>
          <Text style={[styles.amount, { color: '#DC2626' }]}>
            - {formatRupiah(expense)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    elevation: 3,
    shadowColor: '#0284C7',
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  label: { fontSize: 13, color: '#64748B' },
  balanceText: { fontSize: 28, fontWeight: 'bold', color: '#000000', marginVertical: 8 },
  row: { flexDirection: 'row', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderColor: '#E0F2FE' },
  box: { flex: 1 },
  divider: { width: 1, backgroundColor: '#E0F2FE', marginHorizontal: 10 },
  subLabel: { fontSize: 12, color: '#64748B' },
  amount: { fontSize: 14, fontWeight: 'bold', marginTop: 4 },
});