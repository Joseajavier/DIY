import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/AppNavigator';
import { generateDIYProject } from '../services/diyGenerator';
import { createProject } from '../storage/projectRepository';
import { createMaterials } from '../storage/materialRepository';
import { setLastProjectId } from '../storage/settingsStorage';
import { colors } from '../utils/theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DIYInput'>;
};

export default function DIYInputScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');

  const handleGenerate = async () => {
    if (!projectName.trim()) { Alert.alert(t('errors.error'), t('errors.noName')); return; }
    if (!description.trim()) { Alert.alert(t('errors.error'), t('errors.noDescription')); return; }

    const result = generateDIYProject(projectName.trim(), description.trim());
    const projectId = await createProject(projectName.trim(), 'diy', description.trim());
    await createMaterials(projectId, result.materials);
    setLastProjectId(projectId);
    navigation.navigate('DIYSteps', { result });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t('diy.title')}</Text>
      <Text style={styles.label}>{t('diy.projectName')}</Text>
      <TextInput style={styles.input} placeholder={t('diy.projectNamePlaceholder')} placeholderTextColor={colors.textMuted} value={projectName} onChangeText={setProjectName} />
      <Text style={styles.label}>{t('diy.whatToBuild')}</Text>
      <TextInput style={[styles.input, styles.textArea]} placeholder={t('diy.descriptionPlaceholder')} placeholderTextColor={colors.textMuted} value={description} onChangeText={setDescription} multiline numberOfLines={5} textAlignVertical="top" />
      <TouchableOpacity style={styles.button} onPress={handleGenerate}>
        <Text style={styles.buttonText}>{t('diy.generate')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.accent, marginBottom: 24 },
  label: { fontSize: 14, color: colors.textSecondary, marginBottom: 8 },
  input: { backgroundColor: colors.card, borderRadius: 10, padding: 14, fontSize: 16, color: colors.text, borderWidth: 1, borderColor: colors.border, marginBottom: 20 },
  textArea: { minHeight: 120 },
  button: { backgroundColor: colors.accent, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  buttonText: { fontSize: 18, fontWeight: '600', color: colors.textDark },
});
