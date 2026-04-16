import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Project } from '../models';
import { getProjects, deleteProject } from '../storage/projectRepository';
import { colors, spacing, radius, typography } from '../theme';
import { ProjectCard, EmptyState } from '../components';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Projects'> };

export default function ProjectsScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState('');

  useFocusEffect(useCallback(() => { getProjects().then(setProjects); }, []));

  const filtered = search.trim()
    ? projects.filter((p: Project) => p.name.toLowerCase().includes(search.toLowerCase()))
    : projects;

  const handleDelete = (id: string, name: string) => {
    Alert.alert(t('projects.delete'), t('projects.deleteConfirm', { name }), [
      { text: t('projects.cancel'), style: 'cancel' },
      { text: t('projects.deleteBtn'), style: 'destructive', onPress: async () => { await deleteProject(id); setProjects((p: Project[]) => p.filter((x: Project) => x.id !== id)); } },
    ]);
  };

  if (!projects.length) {
    return <EmptyState icon="📂" title={t('projects.empty')} description={t('projects.emptyDesc')} actionLabel={t('projects.create')} onAction={() => navigation.navigate('ModeSelection')} />;
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      ListHeaderComponent={
        <TextInput style={styles.search} placeholder="Buscar proyecto..." placeholderTextColor={colors.textMuted} value={search} onChangeText={setSearch} />
      }
      data={filtered}
      keyExtractor={(item: Project) => item.id}
      renderItem={({ item }) => (
        <ProjectCard
          project={item}
          onPress={() => navigation.navigate('ProjectDetail', { projectId: item.id })}
          onDelete={() => handleDelete(item.id, item.name)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  search: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.lg, fontSize: 15, color: colors.text, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.xl },
});
