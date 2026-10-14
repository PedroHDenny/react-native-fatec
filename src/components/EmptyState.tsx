import { TaskFilter } from '../types/task';
import { StyleSheet, Text, View } from 'react-native';

const messages: Record<TaskFilter, { emoji: string; title: string; subtitle: string }> = {
  all: { emoji: '📋', title: 'Nenhuma tarefa ainda!', subtitle: 'Toque no botão + para adicionar sua primeira tarefa.' },
  pending: { emoji: '🎉', title: 'Tudo em dia!', subtitle: 'Não há tarefas pendentes. Que eficiência!' },
  completed: { emoji: '⏳', title: 'Nenhuma tarefa concluída', subtitle: 'Conclua algumas tarefas para vê-las aqui.' },
};

export function EmptyState({ filter }: { filter: TaskFilter }) {
  const message = messages[filter];
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{message.emoji}</Text>
      <Text style={styles.title}>{message.title}</Text>
      <Text style={styles.subtitle}>{message.subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  emoji: { fontSize: 54, marginBottom: 16 },
  title: { color: '#1f2937', fontSize: 20, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  subtitle: { color: '#9ca3af', fontSize: 14, lineHeight: 21, textAlign: 'center' },
});
