// ═══════════════════════════════════════════════════════════════
// PROJECT IDEAS SCREEN — biblioteca de ideas de proyectos DIY.
// ───────────────────────────────────────────────────────────────
// Browse inspiracional filtrable por categoría y dificultad.
// (No confundir con ProjectsScreen, que lista proyectos guardados.)
// ═══════════════════════════════════════════════════════════════

import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, radius, typography, shadows } from '../theme';
import {
  ProjectIdea,
  ProjectCategory,
  ProjectDifficulty,
} from '../models/projectIdea';
import { PROJECT_IDEAS } from '../data/projectIdeas';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProjectIdeas'>;
};

type CategoryFilter = ProjectCategory | 'all';
type DifficultyFilter = ProjectDifficulty | 'all';

const CATEGORY_CHIPS: { key: CategoryFilter; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'furniture', label: 'Mobiliario' },
  { key: 'storage', label: 'Almacenaje' },
  { key: 'decor', label: 'Deco' },
  { key: 'outdoor', label: 'Exterior' },
  { key: 'kids', label: 'Niños' },
  { key: 'kitchen', label: 'Cocina' },
  { key: 'workshop', label: 'Taller' },
  { key: 'repair', label: 'Reparación' },
];

const DIFFICULTY_CHIPS: {
  key: DifficultyFilter;
  label: string;
  dot?: string;
}[] = [
  { key: 'all', label: 'Todas' },
  { key: 'easy', label: 'Fácil', dot: colors.success },
  { key: 'medium', label: 'Medio', dot: colors.warning },
  { key: 'hard', label: 'Difícil', dot: colors.danger },
];

const DIFFICULTY_COLOR: Record<ProjectDifficulty, string> = {
  easy: colors.success,
  medium: colors.warning,
  hard: colors.danger,
};

const DIFFICULTY_LABEL: Record<ProjectDifficulty, string> = {
  easy: 'Fácil',
  medium: 'Medio',
  hard: 'Difícil',
};

function formatTime(h: number): string {
  if (h < 1) return '<1h';
  if (h < 10) return `${h}h`;
  return `${h}h`;
}

function formatCost(min: number, max: number): string {
  if (min === 0) return `hasta ${max}€`;
  return `${min}–${max}€`;
}

export default function ProjectIdeasScreen({ navigation }: Props) {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('all');

  const filtered = useMemo(() => {
    return PROJECT_IDEAS.filter((idea) => {
      if (category !== 'all' && idea.category !== category) return false;
      if (difficulty !== 'all' && idea.difficulty !== difficulty) return false;
      return true;
    });
  }, [category, difficulty]);

  const handlePressIdea = (idea: ProjectIdea) => {
    Alert.alert(idea.title, idea.description);
  };

  const renderCard = ({ item }: { item: ProjectIdea }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => handlePressIdea(item)}
    >
      <View style={styles.emojiBox}>
        <Text style={styles.emoji}>{item.emoji ?? '🪵'}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.cardTagline} numberOfLines={2}>
          {item.tagline}
        </Text>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <View
              style={[
                styles.dot,
                { backgroundColor: DIFFICULTY_COLOR[item.difficulty] },
              ]}
            />
            <Text style={styles.metaText}>
              {DIFFICULTY_LABEL[item.difficulty]}
            </Text>
          </View>
          <Text style={styles.metaSeparator}>·</Text>
          <Text style={styles.metaText}>{formatTime(item.timeHours)}</Text>
          <Text style={styles.metaSeparator}>·</Text>
          <Text style={styles.metaText}>
            {formatCost(item.costMinEur, item.costMaxEur)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
        >
          {CATEGORY_CHIPS.map((c) => {
            const active = category === c.key;
            return (
              <TouchableOpacity
                key={c.key}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setCategory(c.key)}
                activeOpacity={0.7}
              >
                <Text
                  style={[styles.chipLabel, active && styles.chipLabelActive]}
                >
                  {c.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
        >
          {DIFFICULTY_CHIPS.map((d) => {
            const active = difficulty === d.key;
            return (
              <TouchableOpacity
                key={d.key}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setDifficulty(d.key)}
                activeOpacity={0.7}
              >
                {d.dot && (
                  <View
                    style={[styles.chipDot, { backgroundColor: d.dot }]}
                  />
                )}
                <Text
                  style={[styles.chipLabel, active && styles.chipLabelActive]}
                >
                  {d.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.resultsLabel}>
            {filtered.length} idea{filtered.length === 1 ? '' : 's'}
          </Text>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyTitle}>Sin resultados</Text>
            <Text style={styles.emptyText}>
              Prueba a cambiar los filtros de categoría o dificultad.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  filters: {
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    backgroundColor: colors.bg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  chipsRow: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    gap: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipLabel: {
    ...typography.buttonSmall,
    color: colors.textSecondary,
  },
  chipLabelActive: {
    color: colors.textOnPrimary,
  },
  chipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  listContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  resultsLabel: {
    ...typography.caption,
    marginBottom: spacing.md,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  emojiBox: {
    width: 72,
    height: 72,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  emoji: {
    fontSize: 40,
  },
  cardBody: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    ...typography.h3,
    marginBottom: 2,
  },
  cardTagline: {
    ...typography.bodySmall,
    marginBottom: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  metaText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  metaSeparator: {
    ...typography.caption,
    color: colors.textMuted,
    marginHorizontal: spacing.xs,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  emptyText: {
    ...typography.bodySmall,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },
});
