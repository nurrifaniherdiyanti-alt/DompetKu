import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import CustomButton from '../components/CustomButton';

const getTodayDate = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function AddTransactionScreen({
  navigation,
  route,
  onAddTransaction,
  onUpdateTransaction,
}) {
  const itemToEdit = route.params?.itemToEdit;

  const [title, setTitle] = useState(itemToEdit ? itemToEdit.title : '');
  const [amount, setAmount] = useState(itemToEdit ? itemToEdit.amount.toString() : '');
  const [type, setType] = useState(itemToEdit ? itemToEdit.type : 'expense');
  const [date, setDate] = useState(itemToEdit ? itemToEdit.date : getTodayDate());

  const handleSave = () => {
    if (!title.trim() || !amount.trim() || isNaN(Number(amount)) || !date.trim()) {
      Alert.alert('Input Tidak Valid', 'Isi keterangan, nominal angka, dan tanggal dengan benar.');
      return;
    }

    if (itemToEdit) {
      const updatedTransaction = {
        ...itemToEdit,
        title: title.trim(),
        amount: parseInt(amount, 10),
        type: type,
        date: date.trim(),
      };
      onUpdateTransaction(updatedTransaction);
    } else {
      const newTransaction = {
        id: Date.now().toString(),
        title: title.trim(),
        amount: parseInt(amount, 10),
        type: type,
        date: date.trim(),
      };
      onAddTransaction(newTransaction);
    }

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title={itemToEdit ? 'Edit Transaksi' : 'Tambah Transaksi'}
        subtitle={
          itemToEdit
            ? 'Perbarui detail transaksi yang salah'
            : 'Masukkan detail keuangan baru'
        }
      />

      <View style={styles.form}>
        <Text style={styles.label}>Jenis Transaksi</Text>
        <View style={styles.typeRow}>
          <TouchableOpacity
            style={[styles.typeBtn, type === 'expense' && styles.expenseActive]}
            onPress={() => setType('expense')}
          >
            <Text style={[styles.typeText, type === 'expense' && styles.activeText]}>
              Pengeluaran
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.typeBtn, type === 'income' && styles.incomeActive]}
            onPress={() => setType('income')}
          >
            <Text style={[styles.typeText, type === 'income' && styles.activeText]}>
              Pemasukan
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Keterangan</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: Beli Makan Siang / Uang Saku"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Nominal (Rp)</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: 25000"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={styles.label}>Tanggal (DD/MM/YYYY)</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: 15/11/2026"
          value={date}
          onChangeText={setDate}
        />

        <View style={styles.buttonGroup}>
          <CustomButton
            title={itemToEdit ? 'Update Transaksi' : 'Simpan Transaksi'}
            onPress={handleSave}
          />
          <CustomButton
            title="Batal"
            color="#94A3B8"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F9FF' },
  form: { padding: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#0C4A6E', marginBottom: 6, marginTop: 12 },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BAE6FD',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: '#0F172A',
  },
  typeRow: { flexDirection: 'row', gap: 10 },
  typeBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  expenseActive: { backgroundColor: '#DC2626', borderColor: '#DC2626' },
  incomeActive: { backgroundColor: '#16A34A', borderColor: '#16A34A' },
  typeText: { fontWeight: '600', color: '#475569' },
  activeText: { color: '#FFFFFF' },
  buttonGroup: { marginTop: 16 },
});