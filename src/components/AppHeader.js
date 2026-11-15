import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AppHeader({ title, subtitle }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: '#38BDF8',
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0C4A6E',
  },
  subtitle: {
    fontSize: 13,
    color: '#0369A1',
    marginTop: 4,
    fontWeight: '500',
  },
});