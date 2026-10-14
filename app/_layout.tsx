import '../global.css';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return <Stack screenOptions={{ headerStyle: { backgroundColor: '#4f46e5' }, headerTintColor: '#fff', contentStyle: { backgroundColor: '#f5f7fb' } }}>
    <Stack.Screen name="index" options={{ title: '📋 Minhas Tarefas' }} />
    <Stack.Screen name="form" options={{ title: 'Nova Tarefa' }} />
  </Stack>;
}
