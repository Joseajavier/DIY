import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography, shadows } from '../theme';
import { Project } from '../models';
import Icon, { IconName } from './Icon';

type Props = {
  project: Project;
  onPress: () => void;
  onDelete?: () => void;
};

const STATUS_META: Record<string, { icon: IconName; label: string }> = {
  pending: { icon: 'time', label: 'Sin empezar' },
  in_progress: { icon: 'hammer', label: 'En curso' },
  completed: { icon: 'check', label: 'Terminado' },
};

const STATUS_COLORS: Record<string, string> = {
  pending: colors.textMuted,
  in_progress: colors.warning,
  completed: colors.success,
};

export default function ProjectCard({ project, onPress, onDelete }: Props) {
  const accentColor = project.mode === 'diy' ? colors.primary : colors.accent;
  const formatDate = (iso?: string) => {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
  };

  const total = project.totalSteps ?? 0;
  const completed = project.completedSteps ?? 0;
  const progressPct = total === 0 ? 0 : Math.round((completed / total) * 100);
  const status = project.status ?? 'pending';
  const statusColor = STATUS_COLORS[status] ?? colors.textMuted;

  return (
    <TouchableOpacity style={[styles.card, shadows.sm]} onPress={onPress} activeOpacity={0.8} accessibilityRole="button" accessibilityLabel={`Proyecto ${project.name}`}>
      <View style={[styles.modeLine, { backgroundColor: accentColor }]} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.info}>
            <Text style={typography.h3} numberOfLines={1}>{project.name}</Text>
            <View style={styles.meta}>
              <View style={[styles.tag, { backgroundColor: accentColor + '1A' }]}>
                <Text style={[typography.caption, { color: accentColor }]}>
                  {project.mode.toUpperCase()}
                </Text>
              </View>
              {total > 0 && (
                <View style={[styles.tag, styles.tagRow, { backgroundColor: statusColor + '1A' }]}>
                  <Icon name={STATUS_META[status].icon} size={11} color={statusColor} />
                  <Text style={[typography.caption, { color: statusColor }]}>
                    {STATUS_META[status].label}
                  </Text>
                </View>
              )}
              {project.createdAt && (
                <Text style={typography.caption}>{formatDate(project.createdAt)}</Text>
              )}
            </View>
          </View>
          {onDelete && (
            <TouchableOpacity onPress={onDelete} style={styles.deleteBtn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} accessibilityRole="button" accessibilityLabel="Eliminar proyecto">
              <Text style={styles.deleteTxt}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
        {project.description ? (
          <Text style={[typography.bodySmall, { marginTop: spacing.sm }]} numberOfLines={2}>
            {project.description}
          </Text>
        ) : null}

        {total > 0 && (
          <View style={styles.progressWrap}>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${progressPct}%`,
                    backgroundColor:
                      status === 'completed' ? colors.success : accentColor,
                  },
                ]}
              />
            </View>
            <Text style={styles.progressLabel}>
              {completed} / {total} pasos · {progressPct}%
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  modeLine: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  info: { flex: 1 },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  tag: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 3,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deleteBtn: { padding: spacing.sm },
  deleteTxt: { color: colors.danger, fontSize: 14, fontWeight: 'bold' },
  progressWrap: {
    marginTop: spacing.md,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: colors.bgAlt,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 4,
    borderRadius: radius.full,
  },
  progressLabel: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 6,
    fontSize: 11,
    fontVariant: ['tabular-nums'],
  },
});
