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
import { colors } from '../utils/theme';
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
        const aiResult = await generateDIYWithAI({ prompt: `${projectName}: ${description}`, language: i18n.language });
        result = {
          projectName: aiResult.projectName,
          summary: aiResult.summary,
          steps: aiResult.steps,
          materials: aiResult.materials.map((m) => ({ name: m.name, quantity: m.quantity, unit: m.unit })),
          tools: aiResult.tools.map((t) => ({ name: t.name, optional: t.optional })),
          difficulty: aiResult.difficulty,
          estimatedTime: aiResult.estimatedTime,
        };
      } else {
        result = generateDIYProject(projectName.trim(), description.trim());
      }
    } catch (err: any) {
      // Fallback to local logic
      result = generateDIYProject(projectName.trim(), description.trim());
      if (useAI) {
        Alert.alert('IA no disponible', 'Usando generación local. Comprueba que el backend está arrancado.');
      }
    }

    const projectId = await createProject(projectName.trim(), 'diy', description.trim());
    await createMaterials(projectId, result.materials);
    setLastProjectId(projectId);
    setLoading(false);
    navigation.navigate('DIYSteps', { result });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t('diy.title')}</Text>

      <View style={styles.aiToggle}>
        <Text style={styles.aiLabel}>🤖 Usar IA</Text>
        <Switch
          value={useAI}
          onValueChange={setUseAI}
          trackColor={{ false: colors.border, true: colors.accent }}
          thumbColor={useAI ? colors.accentLight : colors.textMuted}
        />
      </View>

      <Text style={styles.label}>{t('diy.projectName')}</Text>
      <TextInput style={styles.input} placeholder={t('diy.projectNamePlaceholder')} placeholderTextColor={colors.textMuted} value={projectName} onChangeText={setProjectName} />
      <Text style={styles.label}>{t('diy.whatToBuild')}</Text>
      <TextInput style={[styles.input, styles.textArea]} placeholder={t('diy.descriptionPlaceholder')} placeholderTextColor={colors.textMuted} value={description} onChangeText={setDescription} multiline numberOfLines={5} textAlignVertical="top" />

      <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handleGenerate} disabled={loading}>
        {loading ? (
          <ActivityIndicator color={colors.textDark} />
        ) : (
          <Text style={styles.buttonText}>{useAI ? '🤖 ' : ''}{t('diy.generate')}</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.accent, marginBottom: 20 },
  aiToggle: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.card, borderRadius: 10, padding: 14, marginBottom: 20, borderWidth: 1, borderColor: colors.border },
  aiLabel: { fontSize: 15, color: colors.text, fontWeight: '500' },
  label: { fontSize: 14, color: colors.textSecondary, marginBottom: 8 },
  input: { backgroundColor: colors.card, borderRadius: 10, padding: 14, fontSize: 16, color: colors.text, borderWidth: 1, borderColor: colors.border, marginBottom: 20 },
  textArea: { minHeight: 120 },
  button: { backgroundColor: colors.accent, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { fontSize: 18, fontWeight: '600', color: colors.textDark },
});
