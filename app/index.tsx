import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { EmptyState } from '../src/components/EmptyState';
import { FilterBar } from '../src/components/FilterBar';
import { TaskItem } from '../src/components/TaskItem';
import { useTasks } from '../src/hooks/useTasks';

export default function HomeScreen() {
  const router = useRouter();
  const { tasks, filter, loading, allTasksCount, pendingCount, completedCount, setFilter, toggleTask, removeTask } = useTasks();
  const counts = { all: allTasksCount, pending: pendingCount, completed: completedCount } as const;

  return <SafeAreaView style={styles.safe}>
    <View style={styles.container}>
      <View style={styles.summary}><Text style={styles.heading}>Olá! 👋</Text><Text style={styles.subheading}>{pendingCount} {pendingCount === 1 ? 'tarefa pendente' : 'tarefas pendentes'}</Text></View>
      <FilterBar filter={filter} onChange={setFilter} counts={counts} />
      {loading ? <View style={styles.loading}><ActivityIndicator size="large" color="#4f46e5" /></View> : <FlatList data={tasks} keyExtractor={(item) => String(item.id)} renderItem={({ item }) => <TaskItem task={item} onToggle={toggleTask} onRemove={removeTask} />} ListEmptyComponent={<EmptyState filter={filter} />} contentContainerStyle={tasks.length === 0 ? styles.emptyList : undefined} showsVerticalScrollIndicator={false} />}
      <Pressable accessibilityLabel="Adicionar tarefa" onPress={() => router.push('/form')} style={styles.fab}><Text style={styles.fabText}>＋</Text></Pressable>
    </View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({ safe: { backgroundColor: '#f5f7fb', flex: 1 }, container: { flex: 1, paddingHorizontal: 20, paddingTop: 18 }, summary: { marginBottom: 20 }, heading: { color: '#111827', fontSize: 28, fontWeight: '800' }, subheading: { color: '#6b7280', fontSize: 14, marginTop: 5 }, loading: { alignItems: 'center', flex: 1, justifyContent: 'center' }, emptyList: { flex: 1 }, fab: { alignItems: 'center', backgroundColor: '#4f46e5', borderRadius: 30, bottom: 24, elevation: 5, height: 60, justifyContent: 'center', position: 'absolute', right: 24, shadowColor: '#312e81', shadowOpacity: 0.25, shadowRadius: 8, width: 60 }, fabText: { color: '#fff', fontSize: 34, fontWeight: '300', lineHeight: 38 } });
