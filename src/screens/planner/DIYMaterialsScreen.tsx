import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Material, Tool } from '../../models';
import { colors, spacing, radius, typography, shadows } from '../../theme';
import Icon from '../../components/Icon';
import HeroBanner from '../../components/HeroBanner';
import SectionHeader from '../../components/SectionHeader';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DIYMaterials'>;
  route: RouteProp<RootStackParamList, 'DIYMaterials'>;
};

// Estimación de precio por unidad según nombre del material (heurística simple)
function estimateUnitPrice(name: string): number | null {
  const n = name.toLowerCase();
  if (n.includes('tornillo') || n.includes('clavo') || n.includes('perno')) return 0.05;
  if (n.includes('bisagra')) return 1.5;
  if (n.includes('cola') || n.includes('pegamento') || n.includes('adhesivo')) return 6;
  if (n.includes('lija') || n.includes('abrasivo')) return 2;
  if (n.includes('barniz') || n.includes('pintura') || n.includes('aceite')) return 12;
  if (n.includes('mdf') || n.includes('tablero') || n.includes('aglomerado')) return 22;
  if (n.includes('contrachapado') || n.includes('madera')) return 18;
  if (n.includes('pino') || n.includes('listón') || n.includes('tabla')) return 8;
  if (n.includes('roble') || n.includes('haya') || n.includes('nogal')) return 35;
  if (n.includes('perfil') || n.includes('ángulo') || n.includes('herraje')) return 3;
  return null;
}

function MaterialRow({
  mat, checked, onToggle, onFind,
}: {
  mat: Material; checked: boolean; onToggle: () => void; onFind: () => void;
}) {
  const unitPrice = estimateUnitPrice(mat.name);
  const qty = typeof mat.quantity === 'number' ? mat.quantity : parseFloat(String(mat.quantity)) || 1;
  const estimated = unitPrice ? unitPrice * qty : null;

  return (
    <TouchableOpacity
      style={[styles.row, checked && styles.rowChecked]}
      onPress={onToggle}
      activeOpacity={0.75}
    >
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Icon name="check" size={12} color="#fff" />}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.rowName, checked && styles.rowNameChecked]}>{mat.name}</Text>
        <Text style={typography.caption}>
          {mat.quantity} {mat.unit || 'ud'}
          {estimated ? `  ·  ~${estimated.toFixed(0)} €` : ''}
        </Text>
      </View>
      <TouchableOpacity style={styles.findBtn} onPress={onFind} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <Icon name="search" size={14} color={colors.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

function ToolRow({
  tool, onFind,
}: {
  tool: Tool; onFind: () => void;
}) {
  return (
    <View style={styles.toolRow}>
      <Icon name="wrench" size={16} color={tool.optional ? colors.textMuted : colors.primary} />
      <View style={{ flex: 1, marginLeft: spacing.sm }}>
        <Text style={[styles.rowName, tool.optional && { color: colors.textMuted }]}>
          {tool.name}
          {tool.optional ? ' (opcional)' : ''}
        </Text>
      </View>
      <TouchableOpacity style={styles.findBtn} onPress={onFind} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <Text style={[typography.caption, { color: colors.primary }]}>Ver catálogo</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function DIYMaterialsScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { result } = route.params;
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setChecked((prev: Set<number>) => { const s = new Set(prev); s.has(i) ? s.delete(i) : s.add(i); return s; });

  // Coste total estimado
  const totalEst = useMemo(() => {
    let sum = 0;
    let known = 0;
    result.materials.forEach((m: Material) => {
      const p = estimateUnitPrice(m.name);
      const qty = typeof m.quantity === 'number' ? m.quantity : parseFloat(String(m.quantity)) || 1;
      if (p) { sum += p * qty; known++; }
    });
    return known > 0 ? sum : null;
  }, [result.materials]);

  const allChecked = checked.size === result.materials.length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Hero + resumen */}
      <HeroBanner
        variant="accent"
        eyebrow={t('diy.materials')}
        title={result.projectName ?? 'Lista de materiales'}
        subtitle={`${result.difficulty} · ${result.estimatedTime}`}
      />

      {totalEst !== null && (
        <View style={styles.costBadge}>
          <View>
            <Text style={[typography.caption, { color: colors.textMuted }]}>
              {t('diy.estimatedCost', { defaultValue: 'Coste estimado' })}
            </Text>
            <Text style={styles.costLabel}>~{Math.round(totalEst)} €</Text>
          </View>
          <Icon name="calculator" size={22} color={colors.primary} />
        </View>
      )}

      {/* Progreso materiales */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { flex: checked.size }]} />
        <View style={{ flex: result.materials.length - checked.size }} />
      </View>
      <Text style={[typography.caption, { color: colors.textMuted, marginBottom: spacing.xl }]}>
        {checked.size}/{result.materials.length} materiales comprados
      </Text>

      {/* Lista materiales */}
      <SectionHeader
        first
        action={
          <TouchableOpacity onPress={() => setChecked(allChecked ? new Set() : new Set(result.materials.map((_: Material, i: number) => i)))}>
            <Text style={[typography.caption, { color: colors.primary, fontWeight: '600' }]}>{allChecked ? 'Desmarcar todo' : 'Marcar todo'}</Text>
          </TouchableOpacity>
        }
      >
        Materiales
      </SectionHeader>

      {result.materials.map((mat: Material, i: number) => (
        <MaterialRow
          key={i}
          mat={mat}
          checked={checked.has(i)}
          onToggle={() => toggle(i)}
          onFind={() => navigation.navigate('ToolSearch', { query: mat.name })}
        />
      ))}

      {/* Lista herramientas */}
      <SectionHeader
        action={
          <TouchableOpacity
            onPress={() => navigation.navigate('ToolSearch', {})}
            style={styles.inlineAction}
          >
            <Text style={[typography.caption, { color: colors.primary, fontWeight: '600' }]}>Ver catálogo</Text>
            <Icon name="forward" size={12} color={colors.primary} />
          </TouchableOpacity>
        }
      >
        Herramientas
      </SectionHeader>

      {result.tools.map((tool: Tool, i: number) => (
        <ToolRow
          key={i}
          tool={tool}
          onFind={() => navigation.navigate('ToolSearch', { query: tool.name })}
        />
      ))}

      {/* Acciones primarias */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.btn, styles.btnSecondary]}
          onPress={() => navigation.navigate('WoodCatalog', {})}
          activeOpacity={0.85}
        >
          <Icon name="wood" size={16} color={colors.primary} />
          <Text style={[typography.buttonSmall, { color: colors.primary, marginLeft: 6 }]}>
            {t('nav.wood')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.btnPrimary, shadows.sm]}
          onPress={() => navigation.navigate('Shop', { materials: result.materials, mode: 'diy' })}
          activeOpacity={0.85}
        >
          <Icon name="shop" size={16} color={colors.textOnPrimary} />
          <Text style={[typography.buttonSmall, { color: colors.textOnPrimary, marginLeft: 6 }]}>
            {t('actions.goToShop')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Escape hatch: guardar y volver */}
      <TouchableOpacity
        style={styles.homeLink}
        onPress={() => navigation.popToTop()}
        activeOpacity={0.7}
      >
        <Icon name="check" size={14} color={colors.accent} />
        <Text style={[typography.caption, { color: colors.accent, marginLeft: 6, fontWeight: '600' }]}>
          {t('actions.saveAndClose')}
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: colors.bg },
  content:        { padding: spacing.xl, paddingBottom: spacing.xxxl },
  costBadge:      {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primaryMuted,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.primary + '22',
  },
  costLabel:      { ...typography.h2, color: colors.primary, marginTop: 2 },
  inlineAction:   { flexDirection: 'row', alignItems: 'center', gap: 2 },
  progressBar:    { flexDirection: 'row', height: 4, backgroundColor: colors.border, borderRadius: 2, marginBottom: spacing.sm, overflow: 'hidden' },
  progressFill:   { backgroundColor: colors.success },
  row:            { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  rowChecked:     { opacity: 0.5, borderColor: colors.success + '44' },
  rowName:        { ...typography.body },
  rowNameChecked: { textDecorationLine: 'line-through', color: colors.textMuted },
  checkbox:       { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  checkboxChecked:{ backgroundColor: colors.success, borderColor: colors.success },
  findBtn:        { padding: spacing.xs },
  toolRow:        { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm },
  actions:        { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xxl },
  btn:            { flex: 1, flexDirection: 'row', paddingVertical: 14, borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center' },
  btnPrimary:     { backgroundColor: colors.primary },
  btnSecondary:   { backgroundColor: colors.primaryMuted, borderWidth: 1, borderColor: colors.primary + '44' },
  homeLink:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.lg, marginTop: spacing.md },
});
