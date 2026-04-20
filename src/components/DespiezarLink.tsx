// ═══════════════════════════════════════════════════════════════
// DESPIEZAR LINK — enlace secundario para abrir DespieceScreen
// prerellenado con las piezas generadas por un generator.
// ───────────────────────────────────────────────────────────────
// Uso:
//   <DespiezarLink pieces={output.pieces} disabled={!canProceed} />
// Opcionalmente pasa tamaño de tablero inicial (cm).
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Piece } from '../models';
import { colors, spacing, typography } from '../theme';

interface Props {
  pieces: Piece[];
  boardWidth?: number;
  boardHeight?: number;
  disabled?: boolean;
}

export default function DespiezarLink({ pieces, boardWidth, boardHeight, disabled }: Props) {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate('Despiece', {
      initialPieces: pieces,
      initialBoardWidth: boardWidth,
      initialBoardHeight: boardHeight,
    });
  };

  return (
    <TouchableOpacity
      style={styles.link}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text
        style={[
          typography.body,
          {
            color: colors.accent,
            textAlign: 'center',
            opacity: disabled ? 0.4 : 1,
          },
        ]}
      >
        {t('despiece.fromGenerator')}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  link: {
    marginTop: spacing.sm,
    paddingVertical: spacing.sm,
  },
});
