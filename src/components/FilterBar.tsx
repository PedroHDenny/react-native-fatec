import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TaskFilter } from '../types/task';

const options: Array<{ value: TaskFilter; label: string }> = [
  { value: 'all', label: 'Todas' },
  { value: 'pending', label: 'Pendentes' },
  { value: 'completed', label: 'Concluídas' },
];

export function FilterBar({ filter, onChange, counts }: { filter: TaskFilter; onChange: (filter: TaskFilter) => void; counts: Record<TaskFilter, number> }) {
  return (
    <View style={styles.container}>
      {options.map((option) => {
        const active = filter === option.value;
        return (
          <Pressable key={option.value} onPress={() => onChange(option.value)} style={[styles.button, active && styles.activeButton]}>
            <Text style={[styles.label, active && styles.activeLabel]}>{option.label}</Text>
            <Text style={[styles.count, active && styles.activeLabel]}>{counts[option.value]}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', borderRadius: 14, flexDirection: 'row', marginBottom: 16, padding: 4 },
  button: { alignItems: 'center', borderRadius: 10, flex: 1, paddingHorizontal: 4, paddingVertical: 10 },
  activeButton: { backgroundColor: '#4f46e5' },
  label: { color: '#6b7280', fontSize: 12, fontWeight: '600' },
  count: { color: '#9ca3af', fontSize: 12, marginTop: 2 },
  activeLabel: { color: '#fff' },
});
