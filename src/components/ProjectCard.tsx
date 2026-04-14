import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography, shadows } from '../theme';
import { Project } from '../models';

type Props = {
  project: Project;
  onPress: () => void;
  onDelete?: () => void;
};

export default function ProjectCard({ project, onPress, onDelete }: Props) {
  const accentColor = project.mode === 'diy' ? colors.primary : colors.accent;
  const formatDate = (iso?: string) => {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
  };

  return (
    <TouchableOpacity style={[styles.card, shadows.sm]} onPress={onPress} activeOpacity={0.8}>
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
              {project.createdAt && (
                <Text style={typography.caption}>{formatDate(project.createdAt)}</Text>
              )}
            </View>
          </View>
          {onDelete && (
            <TouchableOpacity onPress={onDelete} style={styles.deleteBtn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Text style={styles.deleteTxt}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
        {project.description ? (
          <Text style={[typography.bodySmall, { marginTop: spacing.sm }]} numberOfLines={2}>
            {project.description}
          </Text>
        ) : null}
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
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  deleteBtn: { padding: spacing.sm },
  deleteTxt: { color: colors.danger, fontSize: 14, fontWeight: 'bold' },
});
