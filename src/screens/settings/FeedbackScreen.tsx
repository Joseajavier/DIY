import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { sendFeedback } from '../../services/feedback/feedbackService';
import { trackEvent } from '../../services/analytics/events';
import { colors, spacing, radius, typography, shadows } from '../../theme';
import { Icon } from '../../components';
import type { IconName } from '../../components/Icon';
import HeroBanner from '../../components/HeroBanner';

const TYPES: Array<{ key: 'bug' | 'suggestion' | 'other'; label: string; icon: IconName }> = [
  { key: 'bug', label: 'Bug', icon: 'warning' },
  { key: 'suggestion', label: 'Sugerencia', icon: 'info' },
  { key: 'other', label: 'Otro', icon: 'chat' },
];

export default function FeedbackScreen() {
  const { i18n } = useTranslation();
  const [type, setType] = useState<'bug' | 'suggestion' | 'other'>('suggestion');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) { Alert.alert('Error', 'Escribe un mensaje'); return; }
    setSending(true);
    const ok = await sendFeedback({ message: message.trim(), type, contactEmail: email.trim() || undefined, appVersion: '1.0.0', platform: Platform.OS });
    setSending(false);
    if (ok) { trackEvent('feedback_sent', { type }); setSent(true); }
    else Alert.alert('Error', 'No se pudo enviar. Intentalo de nuevo.');
  };

  if (sent) {
    return (
      <View style={styles.centered}>
        <View style={{ marginBottom: spacing.xl }}>
          <Icon name="check" size={72} color={colors.success} />
        </View>
        <Text style={[typography.h2, { textAlign: 'center' }]}>Gracias por tu feedback!</Text>
        <Text style={[typography.bodySmall, { textAlign: 'center', marginTop: spacing.sm }]}>Lo revisaremos pronto.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: spacing.xl }}>
        <HeroBanner
          eyebrow="Contacto"
          title="Enviar feedback"
          subtitle="Cuéntanos qué falla o qué te gustaría ver. Leemos todo."
        />
      </View>
      <View style={styles.typesRow}>
        {TYPES.map(t => (
          <TouchableOpacity key={t.key} style={[styles.typeBtn, type === t.key && styles.typeBtnActive]} onPress={() => setType(t.key)}>
            <Icon name={t.icon} size={16} color={type === t.key ? colors.primary : colors.textSecondary} />
            <Text style={[typography.buttonSmall, { color: type === t.key ? colors.primary : colors.textSecondary, marginLeft: 6 }]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput style={[styles.input, { minHeight: 120 }]} placeholder="Describe el problema o sugerencia..." placeholderTextColor={colors.textMuted} value={message} onChangeText={setMessage} multiline numberOfLines={6} textAlignVertical="top" />
      <TextInput style={styles.input} placeholder="Email (opcional)" placeholderTextColor={colors.textMuted} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TouchableOpacity style={[styles.button, sending && { opacity: 0.6 }, shadows.md]} onPress={handleSend} disabled={sending}>
        <Text style={[typography.button, { color: colors.textOnPrimary }]}>{sending ? 'Enviando...' : 'Enviar'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: spacing.xl },
  centered: { flex: 1, backgroundColor: colors.bg, justifyContent: 'center', alignItems: 'center', padding: spacing.xxxl },
  typesRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl },
  typeBtn: { flex: 1, flexDirection: 'row', backgroundColor: colors.surface, borderRadius: radius.md, paddingVertical: spacing.md, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  typeBtnActive: { borderColor: colors.primary, backgroundColor: colors.primaryMuted },
  input: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.lg, fontSize: 15, color: colors.text, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.lg },
  button: { backgroundColor: colors.primary, paddingVertical: 18, borderRadius: radius.lg, alignItems: 'center' },
});
