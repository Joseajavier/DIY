import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Project, Piece, Material } from '../models';
import { getProjectById } from '../storage/projectRepository';
import { getPiecesByProject } from '../storage/pieceRepository';
import { getMaterialsByProject } from '../storage/materialRepository';
import { getOptimizationByProject } from '../storage/optimizationRepository';
import { getShopOptionsByProject } from '../storage/shopRepository';
import { colors } from '../utils/theme';
import { Card } from '../components';
import { StoreOption, OptimizationRow } from '../models';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProjectDetail'>;
  route: RouteProp<RootStackParamList, 'ProjectDetail'>;
};

export default function ProjectDetailScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { projectId } = route.params;
  const [project, setProject] = useState<Project | null>(null);
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [optimization, setOptimization] = useState<OptimizationRow | null>(null);
  const [shops, setShops] = useState<StoreOption[]>([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const p = await getProjectById(projectId);
        setProject(p);
        setPieces(await getPiecesByProject(projectId));
        setMaterials(await getMaterialsByProject(projectId));
        setOptimization(await getOptimizationByProject(projectId));
        setShops(await getShopOptionsByProject(projectId));
      })();
    }, [projectId])
  );

  if (!project) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{project.name}</Text>
      <View style={styles.tagRow}>
        <View style={[styles.tag, { backgroundColor: project.mode === 'diy' ? colors.accent + '33' : colors.accentPro + '33' }]}>
          <Text style={[styles.tagText, { color: project.mode === 'diy' ? colors.accent : colors.accentPro }]}>
            {project.mode.toUpperCase()}
          </Text>
        </View>
        {project.createdAt && (
          <Text style={styles.date}>
            {new Date(project.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
          </Text>
        )}
      </View>
      {project.description ? <Text style={styles.desc}>{project.description}</Text> : null}

      {pieces.length > 0 && (
        <>
          <Text style={styles.section}>Piezas ({pieces.length})</Text>
          {pieces.map((p, i) => (
            <Card key={i}>
              <Text style={styles.pieceText}>
                {p.width} × {p.height} cm — {p.quantity} ud {p.thickness ? `(${p.thickness}mm)` : ''}
              </Text>
            </Card>
          ))}
        </>
      )}

      {optimization && (
        <>
          <Text style={styles.section}>Optimización</Text>
          <Card>
            <Text style={styles.infoLine}>Tableros: <Text style={styles.bold}>{optimization.total_boards}</Text></Text>
            <Text style={styles.infoLine}>Eficiencia: <Text style={styles.bold}>{optimization.efficiency.toFixed(1)}%</Text></Text>
            <Text style={styles.infoLine}>Desperdicio: <Text style={styles.bold}>{optimization.waste_percentage.toFixed(1)}%</Text></Text>
          </Card>
        </>
      )}

      {materials.length > 0 && (
        <>
          <Text style={styles.section}>{t('materials.title')} ({materials.length})</Text>
          {materials.map((m, i) => (
            <View key={i} style={styles.matRow}>
              <Text style={styles.matName}>{m.name}</Text>
              <Text style={styles.matQty}>{m.quantity} {m.unit || 'ud'}</Text>
            </View>
          ))}
        </>
      )}

      {shops.length > 0 && (
        <>
          <Text style={styles.section}>{t('shop.title')} ({shops.length})</Text>
          {shops.map((s, i) => (
            <View key={i} style={styles.matRow}>
              <Text style={styles.matName}>{s.name}</Text>
              <Text style={styles.matQty}>{s.price.toFixed(2)} €</Text>
            </View>
          ))}
        </>
      )}

      {project.mode === 'diy' && (
        <TouchableOpacity style={styles.buttonAccent} onPress={() => navigation.navigate('DIYInput')}>
          <Text style={styles.buttonText}>Regenerar proyecto</Text>
        </TouchableOpacity>
      )}
      {project.mode === 'pro' && (
        <TouchableOpacity style={styles.buttonPro} onPress={() => navigation.navigate('ProInput')}>
          <Text style={styles.buttonTextWhite}>Recalcular</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.shareBtn} onPress={async () => {
        let text = `🪵 ${project.name} (${project.mode.toUpperCase()})\n`;
        if (project.description) text += `${project.description}\n`;
        text += '\n';
        if (pieces.length) {
          text += '📐 Piezas:\n';
          pieces.forEach((p) => { text += `  • ${p.width}×${p.height}cm × ${p.quantity}ud\n`; });
          text += '\n';
        }
        if (optimization) {
          text += `📊 Optimización: ${optimization.total_boards} tableros, ${optimization.efficiency.toFixed(1)}% eficiencia\n\n`;
        }
        if (materials.length) {
          text += '📦 Materiales:\n';
          materials.forEach((m) => { text += `  • ${m.name}: ${m.quantity} ${m.unit || 'ud'}\n`; });
          text += '\n';
        }
        if (shops.length) {
          text += '🛒 Tiendas:\n';
          shops.forEach((s) => { text += `  • ${s.name}: ${s.price.toFixed(2)}€ (${s.time})\n`; });
        }
        text += '\n— Generado con DIY App';
        await Share.share({ message: text });
      }}>
        <Text style={styles.shareText}>📤 Compartir proyecto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, paddingBottom: 40 },
  empty: { color: colors.textMuted, fontSize: 16, textAlign: 'center', marginTop: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.text, marginBottom: 8 },
  tagRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  tag: { borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { fontSize: 12, fontWeight: '700' },
  date: { fontSize: 13, color: colors.textMuted },
  desc: { fontSize: 14, color: colors.textSecondary, lineHeight: 20, marginBottom: 16 },
  section: { fontSize: 17, fontWeight: '600', color: colors.accent, marginTop: 24, marginBottom: 12 },
  pieceText: { fontSize: 14, color: colors.text },
  infoLine: { fontSize: 14, color: colors.textSecondary, marginBottom: 4 },
  bold: { fontWeight: 'bold', color: colors.accentPro },
  matRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.card, borderRadius: 10, padding: 12, marginBottom: 6 },
  matName: { fontSize: 14, color: colors.text },
  matQty: { fontSize: 14, color: colors.accent, fontWeight: '600' },
  buttonAccent: { backgroundColor: colors.accent, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 24 },
  buttonPro: { backgroundColor: colors.accentPro, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 24 },
  buttonText: { fontSize: 16, fontWeight: '600', color: colors.textDark },
  buttonTextWhite: { fontSize: 16, fontWeight: '600', color: colors.white },
  shareBtn: { backgroundColor: colors.bgAlt, paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 12, borderWidth: 1, borderColor: colors.border },
  shareText: { fontSize: 15, color: colors.text },
});
