import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, Alert, Switch, ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/AppNavigator';
import { generateDIYProject } from '../services/diyGenerator';
import { generateDIYWithAI } from '../services/apiClient';
import { createProject } from '../storage/projectRepository';
import { createMaterials } from '../storage/materialRepository';
import { createSteps } from '../storage/stepRepository';
import { setLastProjectId } from '../storage/settingsStorage';
import { colors, spacing, radius, typography, shadows } from '../theme';
import { DIYResult } from '../models';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'DIYInput'> };

// ── Opciones del wizard ───────────────────────────────────────────
const PROJECT_TYPES = [
  { id: 'furniture', label: '🪑 Mueble', hint: 'mesa, silla, estantería…' },
  { id: 'deco',      label: '🖼️ Decoración', hint: 'cuadros, marcos, adornos…' },
  { id: 'storage',   label: '📦 Almacenaje', hint: 'cajones, organizadores…' },
  { id: 'reform',    label: '🔨 Reforma', hint: 'suelos, paredes, techos…' },
  { id: 'garden',    label: '🌿 Jardín', hint: 'pérgola, bancal, terraza…' },
  { id: 'other',     label: '✨ Otro', hint: 'cualquier proyecto…' },
];

const LEVELS = [
  { id: 'beginner',     label: '🟢 Principiante', hint: 'pocas herramientas, pasos simples' },
  { id: 'intermediate', label: '🟡 Intermedio',   hint: 'algo de experiencia' },
  { id: 'advanced',     label: '🔴 Avanzado',     hint: 'taller equipado' },
];

const BUDGETS = [
  { id: 'micro',  label: '< 50 €' },
  { id: 'low',    label: '50 – 150 €' },
  { id: 'mid',    label: '150 – 400 €' },
  { id: 'high',   label: '400 €+' },
];

const MATERIALS = [
  { id: 'pine',     label: '🌲 Pino' },
  { id: 'mdf',      label: '🟫 DM / MDF' },
  { id: 'plywood',  label: '📋 Contrachapado' },
  { id: 'oak',      label: '🪵 Roble / Haya' },
  { id: 'pallet',   label: '🧱 Palets' },
  { id: 'mixed',    label: '🔀 Varios' },
];

// ── Componente chip genérico ──────────────────────────────────────
function Chip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity
      style={[styles.chip, active && styles.chipActive]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

// ── Título de sección ──────────────────────────────────────────────
function SectionTitle({ children }: { children: string }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

// ── Helper: construir prompt rico ──────────────────────────────────
function buildRichPrompt(
  name: string,
  description: string,
  projectType: string,
  level: string,
  budget: string,
  material: string,
  dimensions: string,
  language: string,
): string {
  const typeLabel = PROJECT_TYPES.find(t => t.id === projectType)?.hint ?? projectType;
  const levelLabel = LEVELS.find(l => l.id === level)?.hint ?? level;
  const budgetLabel = BUDGETS.find(b => b.id === budget)?.label ?? budget;
  const materialLabel = MATERIALS.find(m => m.id === material)?.label ?? material;

  return [
    `Proyecto de carpintería DIY: "${name}"`,
    `Tipo: ${typeLabel}`,
    description ? `Descripción: ${description}` : '',
    `Nivel del usuario: ${levelLabel}`,
    `Presupuesto: ${budgetLabel}`,
    `Material principal: ${materialLabel}`,
    dimensions ? `Dimensiones aproximadas: ${dimensions}` : '',
    `Idioma de respuesta: ${language === 'es' ? 'español' : language}`,
  ].filter(Boolean).join('\n');
}

// ── Pantalla principal ────────────────────────────────────────────
export default function DIYInputScreen({ navigation }: Props) {
  const { i18n } = useTranslation();

  const [projectName, setProjectName]     = useState('');
  const [description, setDescription]     = useState('');
  const [projectType, setProjectType]     = useState('furniture');
  const [level, setLevel]                 = useState('intermediate');
  const [budget, setBudget]               = useState('low');
  const [material, setMaterial]           = useState('pine');
  const [dimensions, setDimensions]       = useState('');
  const [useAI, setUseAI]                 = useState(false);
  const [loading, setLoading]             = useState(false);

  const handleGenerate = async () => {
    if (!projectName.trim()) {
      Alert.alert('Campo obligatorio', 'Pon un nombre al proyecto.'); return;
    }
    setLoading(true);
    let result: DIYResult;
    const richPrompt = buildRichPrompt(
      projectName.trim(), description.trim(),
      projectType, level, budget, material, dimensions.trim(),
      i18n.language,
    );
    try {
      if (useAI) {
        const ai = await generateDIYWithAI({ prompt: richPrompt, language: i18n.language });
        result = {
          projectName: ai.projectName,
          summary:     ai.summary,
          steps:       ai.steps,
          materials:   ai.materials.map(m => ({ name: m.name, quantity: m.quantity, unit: m.unit })),
          tools:       ai.tools.map(t => ({ name: t.name, optional: t.optional })),
          difficulty:  ai.difficulty,
          estimatedTime: ai.estimatedTime,
        };
      } else {
        result = generateDIYProject(projectName.trim(), description.trim() || richPrompt);
      }
    } catch {
      result = generateDIYProject(projectName.trim(), description.trim() || richPrompt);
      if (useAI) Alert.alert('IA no disponible', 'Usando generación local.');
    }

    const pid = await createProject(projectName.trim(), 'diy', description.trim(), {
      difficulty:    result.difficulty,
      estimatedTime: result.estimatedTime,
      summary:       result.summary,
    });
    await createMaterials(pid, result.materials);
    await createSteps(pid, result.steps);
    setLastProjectId(pid);
    setLoading(false);
    navigation.navigate('DIYSteps', { result, projectId: pid });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      {/* Cabecera */}
      <Text style={styles.title}>🔨 Nuevo proyecto</Text>
      <Text style={[typography.bodySmall, { color: colors.textMuted, marginBottom: spacing.xl }]}>
        Cuéntanos qué quieres hacer y te generamos los pasos.
      </Text>

      {/* Tipo de proyecto */}
      <SectionTitle>¿Qué quieres hacer?</SectionTitle>
      <View style={styles.chipGrid}>
        {PROJECT_TYPES.map(t => (
          <Chip key={t.id} label={t.label} active={projectType === t.id} onPress={() => setProjectType(t.id)} />
        ))}
      </View>

      {/* Nombre */}
      <SectionTitle>Nombre del proyecto *</SectionTitle>
      <TextInput
        style={styles.input}
        placeholder={`Ej: ${PROJECT_TYPES.find(t => t.id === projectType)?.hint ?? 'Mi proyecto'}`}
        placeholderTextColor={colors.textMuted}
        value={projectName}
        onChangeText={setProjectName}
      />

      {/* Descripción */}
      <SectionTitle>Descripción (opcional)</SectionTitle>
      <TextInput
        style={[styles.input, styles.inputMultiline]}
        placeholder="Detalles extra: medidas, estilo, uso previsto…"
        placeholderTextColor={colors.textMuted}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        textAlignVertical="top"
      />

      {/* Nivel */}
      <SectionTitle>Tu nivel</SectionTitle>
      <View style={styles.chipRow}>
        {LEVELS.map(l => (
          <Chip key={l.id} label={l.label} active={level === l.id} onPress={() => setLevel(l.id)} />
        ))}
      </View>

      {/* Presupuesto */}
      <SectionTitle>Presupuesto</SectionTitle>
      <View style={styles.chipRow}>
        {BUDGETS.map(b => (
          <Chip key={b.id} label={b.label} active={budget === b.id} onPress={() => setBudget(b.id)} />
        ))}
      </View>

      {/* Material */}
      <SectionTitle>Material principal</SectionTitle>
      <View style={styles.chipGrid}>
        {MATERIALS.map(m => (
          <Chip key={m.id} label={m.label} active={material === m.id} onPress={() => setMaterial(m.id)} />
        ))}
      </View>

      {/* Dimensiones */}
      <SectionTitle>Dimensiones aproximadas (opcional)</SectionTitle>
      <TextInput
        style={styles.input}
        placeholder="Ej: 120 × 60 × 75 cm"
        placeholderTextColor={colors.textMuted}
        value={dimensions}
        onChangeText={setDimensions}
      />

      {/* Toggle IA */}
      <View style={styles.aiRow}>
        <View style={{ flex: 1 }}>
          <Text style={[typography.body, { color: colors.text }]}>🤖 Usar IA (backend)</Text>
          <Text style={[typography.caption, { color: colors.textMuted }]}>
            Genera pasos personalizados con inteligencia artificial
          </Text>
        </View>
        <Switch
          value={useAI}
          onValueChange={setUseAI}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={useAI ? colors.primaryLight : colors.textMuted}
        />
      </View>

      {/* Botón */}
      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleGenerate}
        disabled={loading}
        activeOpacity={0.85}
      >
        {loading
          ? <ActivityIndicator color={colors.textOnPrimary} />
          : <Text style={[typography.button, { color: colors.textOnPrimary }]}>
              {useAI ? '🤖 Generar con IA' : '🔨 Generar proyecto'}
            </Text>
        }
      </TouchableOpacity>

      <View style={{ height: spacing.xl * 2 }} />
    </ScrollView>
  );
}

// ── Estilos ───────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: colors.bg },
  content:     { padding: spacing.xl },
  title:       { ...typography.h1, color: colors.primary, marginBottom: spacing.sm },
  sectionTitle: {
    ...typography.label,
    color: colors.text,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primaryMuted,
    borderColor: colors.primary,
  },
  chipText:       { ...typography.caption, color: colors.textMuted },
  chipTextActive: { color: colors.primary, fontWeight: '600' },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    fontSize: 15,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputMultiline: { minHeight: 90, textAlignVertical: 'top' },
  aiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginTop: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: radius.lg,
    alignItems: 'center',
    marginTop: spacing.xl,
    ...shadows.md,
  },
});
