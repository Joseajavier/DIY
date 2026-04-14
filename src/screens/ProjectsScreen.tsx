import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Project } from '../models';
import { getProjects, deleteProject } from '../storage/projectRepository';
import { colors } from '../utils/theme';
import { Card } from '../components';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Projects'> };

export default function ProjectsScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);

  useFocusEffect(useCallback(() => { getProjects().then(setProjects); }, []));

  const handleDelete = (id: string, name: string) => {
    Alert.alert(t('projects.delete'), t('projects.deleteConfirm', { name }), [
      { text: t('projects.cancel'), style: 'cancel' },
      { text: t('projects.deleteBtn'), style: 'destructive', onPress: async () => { await deleteProject(id); setProjects((p) => p.filter((x) => x.id !== id)); } },
    ]);
  };

  const formatDate = (iso?: string) => {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  if (!projects.length) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyIcon}>📂</Text>
        <Text style={styles.emptyTitle}>{t('projects.empty')}</Text>
        <Text style={styles.emptyDesc}>{t('projects.emptyDesc')}</Text>
        <TouchableOpacity style={styles.emptyBtn} onPress={() => navigation.navigate('ModeSelection')}>
          <Text style={styles.emptyBtnTxt}>{t('projects.create')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={projects}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => item.mode === 'diy' ? navigation.navigate('DIYInput') : navigation.navigate('ProInput')} activeOpacity={0.8}>
          <Card>
            <View style={styles.row}>
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.tagRow}>
                  <View style={[styles.tag, { backgroundColor: item.mode === 'diy' ? colors.accent + '33' : colors.accentPro + '33' }]}>
                    <Text style={[styles.tagText, { color: item.mode === 'diy' ? colors.accent : colors.accentPro }]}>{item.mode === 'diy' ? 'DIY' : 'PRO'}</Text>
                  </View>
                  {item.createdAt && <Text style={styles.meta}>{formatDate(item.createdAt)}</Text>}
                </View>
                {item.description ? <Text style={styles.desc} numberOfLines={1}>{item.description}</Text> : null}
              </View>
              <TouchableOpacity onPress={() => handleDelete(item.id, item.name)} style={styles.delBtn}>
                <Text style={styles.delTxt}>✕</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, paddingBottom: 40 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 6 },
  tagRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  tag: { borderRadius: 6, paddingHorizontal: 10, paddingVertical: 3 },
  tagText: { fontSize: 11, fontWeight: '700' },
  meta: { fontSize: 12, color: colors.textSecondary },
  desc: { fontSize: 12, color: colors.textMuted, marginTop: 6 },
  delBtn: { padding: 10 },
  delTxt: { color: colors.danger, fontSize: 16, fontWeight: 'bold' },
  empty: { flex: 1, backgroundColor: colors.bg, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: '600', color: colors.text, marginBottom: 8 },
  emptyDesc: { fontSize: 14, color: colors.textSecondary, textAlign: 'center', marginBottom: 24 },
  emptyBtn: { backgroundColor: colors.accent, paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12 },
  emptyBtnTxt: { fontSize: 16, fontWeight: '600', color: colors.textDark },
});
