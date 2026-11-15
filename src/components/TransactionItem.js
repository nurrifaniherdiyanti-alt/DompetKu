import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const formatRupiah = (angka) => {
  return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export default function TransactionItem({ title, amount, type, date, onEdit, onDelete }) {
  const isIncome = type === 'income';

  return (
    <View style={styles.item}>
      <View style={styles.infoBox}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.rightSection}>
        <Text style={[styles.amount, { color: isIncome ? '#16A34A' : '#DC2626' }]}>
          {isIncome ? '+ ' : '- '}
          {formatRupiah(amount)}
        </Text>

        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
            <Ionicons name="create-outline" size={16} color="#0284C7" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
            <Ionicons name="trash-outline" size={16} color="#DC2626" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0F2FE',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  infoBox: {
    flex: 1,
    paddingRight: 10,
  },
  title: { fontSize: 15, fontWeight: '600', color: '#0F172A' },
  date: { fontSize: 12, color: '#64748B', marginTop: 4 },
  rightSection: {
    alignItems: 'flex-end',
  },
  amount: { fontSize: 15, fontWeight: 'bold' },
  iconRow: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  editBtn: {
    backgroundColor: '#E0F2FE',
    padding: 6,
    borderRadius: 8,
  },
  deleteBtn: {
    backgroundColor: '#FEE2E2',
    padding: 6,
    borderRadius: 8,
  },
});