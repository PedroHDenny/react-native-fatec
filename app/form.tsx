import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { createTask, getTaskById, updateTask } from '../src/database/taskRepository';

export default function FormScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isEditing = Boolean(id);
  const router = useRouter();
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    navigation.setOptions({ title: isEditing ? 'Editar tarefa' : 'Nova tarefa' });
    if (!id) return;
    void getTaskById(Number(id)).then((task) => { if (task) { setTitle(task.title); setDescription(task.description ?? ''); } }).finally(() => setLoading(false));
  }, [id, isEditing, navigation]);

  const save = async () => {
    const cleanTitle = title.trim();
    if (!cleanTitle) { setError('Digite um título para a tarefa.'); return; }
    try { setSaving(true); setError(''); const value = description.trim() || null; if (id) await updateTask({ id: Number(id), title: cleanTitle, description: value }); else await createTask({ title: cleanTitle, description: value }); router.back(); } catch { setError('Não foi possível salvar a tarefa.'); } finally { setSaving(false); }
  };

  if (loading) return <View style={styles.loading}><ActivityIndicator size="large" color="#4f46e5" /></View>;
  return <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
    <Text style={styles.label}>Título</Text><TextInput autoFocus={!isEditing} value={title} onChangeText={setTitle} placeholder="Ex.: Estudar React Native" placeholderTextColor="#9ca3af" style={styles.input} maxLength={100} />
    <Text style={styles.label}>Descrição <Text style={styles.optional}>(opcional)</Text></Text><TextInput value={description} onChangeText={setDescription} placeholder="Adicione mais detalhes..." placeholderTextColor="#9ca3af" style={[styles.input, styles.multiline]} multiline textAlignVertical="top" maxLength={500} />
    {!!error && <Text style={styles.error}>{error}</Text>}
    <Pressable disabled={saving} onPress={() => void save()} style={[styles.save, saving && styles.disabled]}><Text style={styles.saveText}>{saving ? 'Salvando...' : isEditing ? 'Salvar alterações' : 'Adicionar tarefa'}</Text></Pressable>
  </ScrollView>;
}

const styles = StyleSheet.create({ container: { padding: 20 }, label: { color: '#374151', fontSize: 14, fontWeight: '700', marginBottom: 8, marginTop: 10 }, optional: { color: '#9ca3af', fontWeight: '400' }, input: { backgroundColor: '#fff', borderColor: '#e5e7eb', borderRadius: 12, borderWidth: 1, color: '#111827', fontSize: 16, padding: 14 }, multiline: { height: 130 }, error: { color: '#dc2626', fontSize: 13, marginTop: 10 }, save: { alignItems: 'center', backgroundColor: '#4f46e5', borderRadius: 12, marginTop: 24, padding: 16 }, disabled: { opacity: 0.6 }, saveText: { color: '#fff', fontSize: 16, fontWeight: '700' }, loading: { alignItems: 'center', flex: 1, justifyContent: 'center' } });
