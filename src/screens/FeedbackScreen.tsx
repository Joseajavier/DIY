import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { sendFeedback } from '../services/feedback/feedbackService';
import { trackEvent } from '../services/analytics/events';
import { colors } from '../utils/theme';

const TYPES = [
  { key: 'bug' as const, label: '🐛 Bug', labelEn: '🐛 Bug' },
  { key: 'suggestion' as const, label: '💡 Sugerencia', labelEn: '💡 Suggestion' },
  { key: 'other' as const, label: '💬 Otro', labelEn: '💬 Other' },
];

export default function FeedbackScreen() {
  const { i18n } = useTranslation();
  const [type, setType] = useState<'bug' | 'suggestion' | 'other'>('suggestion');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) {
      Alert.alert('Error', i18n.language === 'en' ? 'Write a message' : 'Escribe un mensaje');
      return;
    }

    setSending(true);
    const ok = await sendFeedback({
      message: message.trim(),
      type,
      contactEmail: email.trim() || undefined,
      appVersion: '1.0.0',
      platform: Platform.OS,
    });
    setSending(false);

    if (ok) {
      trackEvent('feedback_sent', { type });
      setSent(true);
    } else {
      Alert.alert('Error', i18n.language === 'en' ? 'Could not send. Try again.' : 'No se pudo enviar. Inténtalo de nuevo.');
    }
  };

  if (sent) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.sentIcon}>✅</Text>
        <Text style={styles.sentTitle}>
          {i18n.language === 'en' ? 'Thanks for your feedback!' : '¡Gracias por tu feedback!'}
        </Text>
        <Text style={styles.sentDesc}>
          {i18n.language === 'en' ? 'We\'ll review it soon.' : 'Lo revisaremos pronto.'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {i18n.language === 'en' ? 'Send feedback' : 'Enviar feedback'}
      </Text>

      <View style={styles.typesRow}>
        {TYPES.map((t) => (
          <TouchableOpacity
            key={t.key}
            style={[styles.typeBtn, type === t.key && styles.typeBtnActive]}
            onPress={() => setType(t.key)}
          >
            <Text style={[styles.typeText, type === t.key && styles.typeTextActive]}>
              {i18n.language === 'en' ? t.labelEn : t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder={i18n.language === 'en' ? 'Describe the issue or suggestion...' : 'Describe el problema o sugerencia...'}
        placeholderTextColor={colors.textMuted}
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
      />

      <TextInput
        style={styles.input}
        placeholder={i18n.language === 'en' ? 'Email (optional)' : 'Email (opcional)'}
        placeholderTextColor={colors.textMuted}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={[styles.button, sending && styles.buttonDisabled]}
        onPress={handleSend}
        disabled={sending}
      >
        <Text style={styles.buttonText}>
          {sending
            ? (i18n.language === 'en' ? 'Sending...' : 'Enviando...')
            : (i18n.language === 'en' ? 'Send' : 'Enviar')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 24 },
  centeredContainer: { flex: 1, backgroundColor: colors.bg, justifyContent: 'center', alignItems: 'center', padding: 40 },
  title: { fontSize: 22, fontWeight: 'bold', color: colors.accent, marginBottom: 20 },
  typesRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  typeBtn: { flex: 1, backgroundColor: colors.card, borderRadius: 10, paddingVertical: 10, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  typeBtnActive: { borderColor: colors.accent, backgroundColor: colors.accent + '22' },
  typeText: { fontSize: 13, color: colors.textSecondary },
  typeTextActive: { color: colors.accent, fontWeight: '600' },
  input: { backgroundColor: colors.card, borderRadius: 10, padding: 14, fontSize: 15, color: colors.text, borderWidth: 1, borderColor: colors.border, marginBottom: 16 },
  textArea: { minHeight: 120 },
  button: { backgroundColor: colors.accent, paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { fontSize: 16, fontWeight: '600', color: colors.textDark },
  sentIcon: { fontSize: 56, marginBottom: 16 },
  sentTitle: { fontSize: 22, fontWeight: 'bold', color: colors.text, marginBottom: 8 },
  sentDesc: { fontSize: 15, color: colors.textSecondary },
});
