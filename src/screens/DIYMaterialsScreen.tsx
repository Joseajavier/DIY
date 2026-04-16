import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Material, Tool } from '../models';
import { colors, spacing, radius, typography, shadows } from '../theme';
import Icon from '../components/Icon';

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
  const { result } = route.params;
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setChecked(prev => { const s = new Set(prev); s.has(i) ? s.delete(i) : s.add(i); return s; });

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

      {/* Cabecera resumen */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={typography.h2}>{result.projectName ?? 'Lista de materiales'}</Text>
          <Text style={[typography.caption, { color: colors.textMuted, marginTop: 2 }]}>
            {result.difficulty} · {result.estimatedTime}
          </Text>
        </View>
        {totalEst !== null && (
          <View style={styles.costBadge}>
            <Text style={styles.costLabel}>~{Math.round(totalEst)} €</Text>
            <Text style={[typography.caption, { color: colors.textMuted }]}>estimado</Text>
          </View>
        )}
      </View>

      {/* Progreso materiales */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { flex: checked.size }]} />
        <View style={{ flex: result.materials.length - checked.size }} />
      </View>
      <Text style={[typography.caption, { color: colors.textMuted, marginBottom: spacing.xl }]}>
        {checked.size}/{result.materials.length} materiales comprados
      </Text>

      {/* Lista materiales */}
      <View style={styles.sectionHeader}>
        <Text style={typography.h3}>🪵 Materiales</Text>
        <TouchableOpacity onPress={() => setChecked(allChecked ? new Set() : new Set(result.materials.map((_: Material, i: number) => i)))}>
          <Text style={[typography.caption, { color: colors.primary }]}>{allChecked ? 'Desmarcar todo' : 'Marcar todo'}</Text>
        </TouchableOpacity>
      </View>

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
      <View style={[styles.sectionHeader, { marginTop: spacing.xxl }]}>
        <Text style={typography.h3}>🔧 Herramientas</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ToolSearch', {})}>
          <Text style={[typography.caption, { color: colors.primary }]}>Ver catálogo →</Text>
        </TouchableOpacity>
      </View>

      {result.tools.map((tool: Tool, i: number) => (
        <ToolRow
          key={i}
          tool={tool}
          onFind={() => navigation.navigate('ToolSearch', { query: tool.name })}
        />
      ))}

      {/* Acciones */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.btn, styles.btnSecondary]}
          onPress={() => navigation.navigate('WoodCatalog', {})}
          activeOpacity={0.85}
        >
          <Text style={[typography.buttonSmall, { color: colors.primary }]}>🪵 Ver maderas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.btnPrimary, shadows.sm]}
          onPress={() => navigation.navigate('Shop', { materials: result.materials, mode: 'diy' })}
          activeOpacity={0.85}
        >
          <Text style={[typography.buttonSmall, { color: colors.textOnPrimary }]}>🛒 ¿Dónde comprar?</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: colors.bg },
  content:        { padding: spacing.xl, paddingBottom: spacing.xxxl },
  header:         { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.md },
  costBadge:      { alignItems: 'flex-end', backgroundColor: colors.primaryMuted, borderRadius: radius.md, padding: spacing.md },
  costLabel:      { ...typography.h2, color: colors.primary },
  progressBar:    { flexDirection: 'row', height: 4, backgroundColor: colors.border, borderRadius: 2, marginBottom: spacing.sm, overflow: 'hidden' },
  progressFill:   { backgroundColor: colors.success },
  sectionHeader:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  row:            { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  rowChecked:     { opacity: 0.5, borderColor: colors.success + '44' },
  rowName:        { ...typography.body },
  rowNameChecked: { textDecorationLine: 'line-through', color: colors.textMuted },
  checkbox:       { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  checkboxChecked:{ backgroundColor: colors.success, borderColor: colors.success },
  findBtn:        { padding: spacing.xs },
  toolRow:        { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm },
  actions:        { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xxl },
  btn:            { flex: 1, paddingVertical: 14, borderRadius: radius.lg, alignItems: 'center' },
  btnPrimary:     { backgroundColor: colors.primary },
  btnSecondary:   { backgroundColor: colors.primaryMuted, borderWidth: 1, borderColor: colors.primary + '44' },
});
