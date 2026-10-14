import { useRouter } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Task } from '../types/task';

export function TaskItem({ task, onToggle, onRemove }: { task: Task; onToggle: (id: number, completed: number) => void; onRemove: (id: number) => void }) {
  const router = useRouter();
  const completed = task.completed === 1;
  const date = new Date(task.createdAt).toLocaleDateString('pt-BR');

  const confirmRemove = () => Alert.alert('Excluir tarefa', 'Deseja excluir esta tarefa?', [
    { text: 'Cancelar', style: 'cancel' },
    { text: 'Excluir', style: 'destructive', onPress: () => void onRemove(task.id) },
  ]);

  return (
    <View style={styles.card}>
      <Pressable accessibilityRole="checkbox" accessibilityState={{ checked: completed }} onPress={() => void onToggle(task.id, task.completed)} style={[styles.checkbox, completed && styles.checked]}>
        {completed && <Text style={styles.check}>✓</Text>}
      </Pressable>
      <View style={styles.content}>
        <Text style={[styles.title, completed && styles.done]}>{task.title}</Text>
        {!!task.description && <Text numberOfLines={2} style={[styles.description, completed && styles.done]}>{task.description}</Text>}
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.actions}>
        <Pressable accessibilityLabel="Editar tarefa" onPress={() => router.push({ pathname: '/form', params: { id: String(task.id) } })}><Text style={styles.action}>✎</Text></Pressable>
        <Pressable accessibilityLabel="Excluir tarefa" onPress={confirmRemove}><Text style={styles.delete}>⌫</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, flexDirection: 'row', marginBottom: 10, padding: 16 },
  checkbox: { alignItems: 'center', borderColor: '#c7d2fe', borderRadius: 8, borderWidth: 2, height: 24, justifyContent: 'center', marginRight: 12, width: 24 },
  checked: { backgroundColor: '#4f46e5', borderColor: '#4f46e5' },
  check: { color: '#fff', fontSize: 16, fontWeight: '700' },
  content: { flex: 1 },
  title: { color: '#111827', fontSize: 16, fontWeight: '700' },
  description: { color: '#6b7280', fontSize: 13, marginTop: 5 },
  date: { color: '#9ca3af', fontSize: 11, marginTop: 8 },
  done: { color: '#9ca3af', textDecorationLine: 'line-through' },
  actions: { flexDirection: 'row', gap: 14, marginLeft: 8 },
  action: { color: '#6366f1', fontSize: 22 },
  delete: { color: '#ef4444', fontSize: 22 },
});
