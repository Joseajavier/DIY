// ═══════════════════════════════════════════════════════════════
// PROJECTS SCREEN — listado de proyectos guardados.
// ───────────────────────────────────────────────────────────────
// Estados:
//   • loading → spinner corto para evitar flash del EmptyState
//   • empty   → EmptyState con CTA doble (crear DIY / abrir diseñador)
//   • list    → FlatList con buscador sticky y card por proyecto
// ═══════════════════════════════════════════════════════════════

import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Project } from '../../models';
import { getProjects, deleteProject } from '../../storage/projectRepository';
import { colors, spacing, radius, typography } from '../../theme';
import {
  ProjectCard,
  EmptyState,
  LoadingState,
  Icon,
} from '../../components';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Projects'>;
};

export default function ProjectsScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      setLoading(true);
      getProjects()
        .then((list) => {
          if (!cancelled) setProjects(list);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
      return () => {
        cancelled = true;
      };
    }, []),
  );

  const filtered = search.trim()
    ? projects.filter((p: Project) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      )
    : projects;

  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      t('projects.delete'),
      t('projects.deleteConfirm', { name }),
      [
        { text: t('projects.cancel'), style: 'cancel' },
        {
          text: t('projects.deleteBtn'),
          style: 'destructive',
          onPress: async () => {
            await deleteProject(id);
            setProjects((p: Project[]) =>
              p.filter((x: Project) => x.id !== id),
            );
          },
        },
      ],
    );
  };

  if (loading) {
    return <LoadingState message={t('projects.title')} />;
  }

  if (!projects.length) {
    return (
      <View style={styles.emptyWrap}>
        <EmptyState
          icon="📂"
          title={t('projects.empty')}
          description={t('projects.emptyDesc')}
          actionLabel={t('projects.create')}
          onAction={() => navigation.navigate('DIYInput')}
        />
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => navigation.navigate('ParametricHome')}
          activeOpacity={0.8}
        >
          <Icon name="cube" size={16} color={colors.primary} />
          <Text style={styles.secondaryText}>{t('nav.designer')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Resultados filtrados vacíos: no es "empty state" global, sólo la
  // búsqueda no encuentra nada. Mantenemos el input accesible.
  const filteredEmpty = filtered.length === 0 && projects.length > 0;

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      ListHeaderComponent={
        <TextInput
          style={styles.search}
          placeholder="Buscar proyecto..."
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      }
      data={filtered}
      keyExtractor={(item: Project) => item.id}
      ListEmptyComponent={
        filteredEmpty ? (
          <View style={styles.filteredEmpty}>
            <Icon name="search" size={32} color={colors.textMuted} />
            <Text style={styles.filteredEmptyText}>
              Ningún proyecto coincide con “{search.trim()}”
            </Text>
          </View>
        ) : null
      }
      renderItem={({ item }) => (
        <ProjectCard
          project={item}
          onPress={() =>
            navigation.navigate('ProjectDetail', { projectId: item.id })
          }
          onDelete={() => handleDelete(item.id, item.name)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  search: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    fontSize: 15,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
  },
  emptyWrap: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.xxxl,
    marginBottom: spacing.xxxl,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.primary + '55',
    backgroundColor: colors.primaryMuted,
  },
  secondaryText: {
    ...typography.buttonSmall,
    color: colors.primary,
    fontWeight: '700',
  },
  filteredEmpty: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
    gap: spacing.md,
  },
  filteredEmptyText: {
    ...typography.bodySmall,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
