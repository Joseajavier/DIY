import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Switch, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/AppNavigator';
import { generateDIYProject } from '../services/diyGenerator';
import { generateDIYWithAI } from '../services/apiClient';
import { createProject } from '../storage/projectRepository';
import { createMaterials } from '../storage/materialRepository';
import { setLastProjectId } from '../storage/settingsStorage';
import { colors, spacing, radius, typography, shadows } from '../theme';
import { DIYResult } from '../models';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'DIYInput'> };

export default function DIYInputScreen({ navigation }: Props) {
  const { t, i18n } = useTranslation();
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [useAI, setUseAI] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!projectName.trim()) { Alert.alert(t('errors.error'), t('errors.noName')); return; }
    if (!description.trim()) { Alert.alert(t('errors.error'), t('errors.noDescription')); return; }
    setLoading(true);
    let result: DIYResult;
    try {
      if (useAI) {
        const ai = await generateDIYWithAI({ prompt: `${projectName}: ${description}`, language: i18n.language });
        result = { projectName: ai.projectName, summary: ai.summary, steps: ai.steps, materials: ai.materials.map(m => ({ name: m.name, quantity: m.quantity, unit: m.unit })), tools: ai.tools.map(t => ({ name: t.name, optional: t.optional })), difficulty: ai.difficulty, estimatedTime: ai.estimatedTime };
      } else {
        result = generateDIYProject(projectName.trim(), description.trim());
      }
    } catch {
      result = generateDIYProject(projectName.trim(), description.trim());
      if (useAI) Alert.alert('IA no disponible', 'Usando generacion local.');
    }
    const pid = await createProject(projectName.trim(), 'diy', description.trim());
    await createMaterials(pid, result.materials);
    setLastProjectId(pid);
    setLoading(false);
    navigation.navigate('DIYSteps', { result });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={[typography.h1, { color: colors.primary, marginBottom: spacing.xl }]}>{t('diy.title')}</Text>

      <View style={styles.toggle}>
        <Text style={[typography.body, { color: colors.text }]}>🤖 Usar IA</Text>
        <Switch value={useAI} onValueChange={setUseAI} trackColor={{ false: colors.border, true: colors.primary }} thumbColor={useAI ? colors.primaryLight : colors.textMuted} />
      </View>

      <Text style={typography.label}>{t('diy.projectName')}</Text>
      <TextInput style={styles.input} placeholder={t('diy.projectNamePlaceholder')} placeholderTextColor={colors.textMuted} value={projectName} onChangeText={setProjectName} />

      <Text style={typography.label}>{t('diy.whatToBuild')}</Text>
      <TextInput style={[styles.input, { minHeight: 120 }]} placeholder={t('diy.descriptionPlaceholder')} placeholderTextColor={colors.textMuted} value={description} onChangeText={setDescription} multiline numberOfLines={5} textAlignVertical="top" />

      <TouchableOpacity style={[styles.button, loading && { opacity: 0.6 }]} onPress={handleGenerate} disabled={loading}>
        {loading ? <ActivityIndicator color={colors.textOnPrimary} /> : <Text style={[typography.button, { color: colors.textOnPrimary }]}>{useAI ? '🤖 ' : ''}{t('diy.generate')}</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl },
  toggle: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.lg, marginBottom: spacing.xl, borderWidth: 1, borderColor: colors.border },
  input: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.lg, fontSize: 16, color: colors.text, borderWidth: 1, borderColor: colors.border, marginTop: spacing.sm, marginBottom: spacing.xl },
  button: { backgroundColor: colors.primary, paddingVertical: 18, borderRadius: radius.lg, alignItems: 'center', marginTop: spacing.sm, ...shadows.md },
});
