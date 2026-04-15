import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ListRenderItemInfo,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { setHasSeenOnboarding } from '../storage/settingsStorage';
import { colors, spacing, radius, typography } from '../theme';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'> };

// ── Paleta de madera (roble/nogal) para las ilustraciones ─────
const wood = {
  deep: '#3D2817',
  dark: '#5C3A1E',
  medium: '#7A4E28',
  main: '#9B6835',
  light: '#B8844A',
  highlight: '#D4A574',
  back: '#2A1810',
  cream: '#F5E6D0',
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type SlideKey = 'welcome' | 'diy' | 'pro' | 'ai';

type Slide = {
  key: SlideKey;
  title: string;
  desc: string;
  bullets: { icon: string; text: string }[];
};

const slides: Slide[] = [
  {
    key: 'welcome',
    title: 'Bienvenido a DIY',
    desc: 'Tu asistente inteligente para proyectos de carpinteria y bricolaje.',
    bullets: [
      { icon: '🪵', text: 'Proyectos a tu medida' },
      { icon: '🧰', text: 'Herramientas y materiales' },
      { icon: '📏', text: 'Medidas y cortes exactos' },
    ],
  },
  {
    key: 'diy',
    title: 'Modo DIY',
    desc: 'Describe tu idea y genera automaticamente pasos, materiales y herramientas.',
    bullets: [
      { icon: '💡', text: 'Parte de una idea sencilla' },
      { icon: '📋', text: 'Lista de pasos clara' },
      { icon: '🛒', text: 'Compra lo justo' },
    ],
  },
  {
    key: 'pro',
    title: 'Modo PRO',
    desc: 'Introduce medidas exactas y optimiza cortes de madera para minimizar desperdicio.',
    bullets: [
      { icon: '📐', text: 'Calculadoras de precisión' },
      { icon: '✂️', text: 'Optimiza cada tablero' },
      { icon: '♻️', text: 'Menos desperdicio' },
    ],
  },
  {
    key: 'ai',
    title: 'Con o sin IA',
    desc: 'Usa inteligencia artificial para proyectos mas creativos, o logica local para trabajar sin conexion.',
    bullets: [
      { icon: '🤖', text: 'IA para inspiración' },
      { icon: '📴', text: 'Modo offline siempre' },
      { icon: '⚡', text: 'Rápido y privado' },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════
// Ilustraciones — todas dibujadas con Views, sin librerías
// ═══════════════════════════════════════════════════════════════

/** Escena del taller con herramientas sobre un banco de madera. */
function WorkshopScene() {
  return (
    <View style={illo.scene}>
      {/* Pared trasera */}
      <View style={illo.wall}>
        {/* Rayas verticales de tablones */}
        {[0, 1, 2, 3, 4].map((i) => (
          <View key={i} style={illo.wallPlankLine} />
        ))}
        {/* Colgador de herramientas: tornillos puntitos */}
        <View style={[illo.peg, { left: '18%', top: 18 }]} />
        <View style={[illo.peg, { left: '48%', top: 18 }]} />
        <View style={[illo.peg, { left: '78%', top: 18 }]} />
      </View>

      {/* Banco de trabajo (mesa) */}
      <View style={illo.bench}>
        <View style={illo.benchTopHighlight} />
        <View style={illo.benchTopShadow} />
      </View>

      {/* Herramientas sobre el banco */}
      <View style={illo.toolsRow}>
        {/* Martillo */}
        <View style={illo.hammer}>
          <View style={illo.hammerHead} />
          <View style={illo.hammerHandle} />
        </View>

        {/* Regla amarilla */}
        <View style={illo.ruler}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <View key={i} style={illo.rulerTick} />
          ))}
        </View>

        {/* Lápiz */}
        <View style={illo.pencil}>
          <View style={illo.pencilBody} />
          <View style={illo.pencilTip} />
        </View>

        {/* Sierra (triángulos) */}
        <View style={illo.saw}>
          <View style={illo.sawBlade} />
          <View style={illo.sawTeeth}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <View key={i} style={illo.sawTooth} />
            ))}
          </View>
          <View style={illo.sawHandle} />
        </View>
      </View>

      {/* Virutas de madera */}
      <View style={[illo.chip, { left: '20%', bottom: 10 }]} />
      <View style={[illo.chip, { left: '55%', bottom: 6, width: 16 }]} />
      <View style={[illo.chip, { left: '80%', bottom: 12, width: 10 }]} />
    </View>
  );
}

/** Escena DIY — bombilla con chispa creativa + papel de notas. */
function DiyScene() {
  return (
    <View style={illo.scene}>
      <View style={illo.wall}>
        {[0, 1, 2, 3, 4].map((i) => (
          <View key={i} style={illo.wallPlankLine} />
        ))}
      </View>

      <View style={illo.bench}>
        <View style={illo.benchTopHighlight} />
        <View style={illo.benchTopShadow} />
      </View>

      <View style={illo.diyCenter}>
        {/* Haz de luz detrás de la bombilla */}
        <View style={illo.glowRing} />
        <View style={illo.glowRingInner} />

        {/* Bombilla */}
        <View style={illo.bulb}>
          <View style={illo.bulbGlass} />
          <View style={illo.bulbFilament} />
          <View style={illo.bulbBase} />
          <View style={illo.bulbBaseLine} />
          <View style={illo.bulbBaseLine2} />
        </View>

        {/* Papeles con notas (tarjetas) */}
        <View style={[illo.note, { left: -90, top: 40, transform: [{ rotate: '-8deg' }] }]}>
          <View style={illo.noteLine} />
          <View style={[illo.noteLine, { width: 30 }]} />
          <View style={[illo.noteLine, { width: 22 }]} />
        </View>
        <View style={[illo.note, { right: -90, top: 60, transform: [{ rotate: '6deg' }] }]}>
          <View style={illo.noteLine} />
          <View style={[illo.noteLine, { width: 26 }]} />
        </View>
      </View>
    </View>
  );
}

/** Escena PRO — tablón con marcas de corte + cinta métrica. */
function ProScene() {
  return (
    <View style={illo.scene}>
      <View style={illo.wall}>
        {[0, 1, 2, 3, 4].map((i) => (
          <View key={i} style={illo.wallPlankLine} />
        ))}
      </View>

      <View style={illo.bench}>
        <View style={illo.benchTopHighlight} />
        <View style={illo.benchTopShadow} />
      </View>

      <View style={illo.proCenter}>
        {/* Tablón grande con marcas de corte */}
        <View style={illo.plank}>
          <View style={illo.plankHighlight} />
          {/* Líneas de corte con etiquetas */}
          {[18, 42, 66].map((pct, i) => (
            <View key={i} style={[illo.cutLine, { left: `${pct}%` }]} />
          ))}
          {/* Badges de medida */}
          <View style={[illo.sizeBadge, { left: 6, top: -22 }]}>
            <Text style={illo.sizeBadgeText}>40 cm</Text>
          </View>
          <View style={[illo.sizeBadge, { left: 68, top: -22 }]}>
            <Text style={illo.sizeBadgeText}>55 cm</Text>
          </View>
          <View style={[illo.sizeBadge, { right: 6, top: -22 }]}>
            <Text style={illo.sizeBadgeText}>30 cm</Text>
          </View>
        </View>

        {/* Cinta métrica amarilla */}
        <View style={illo.tape}>
          <View style={illo.tapeBody} />
          <View style={illo.tapeStrip}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <View key={i} style={illo.tapeTick} />
            ))}
          </View>
          <View style={illo.tapeHook} />
        </View>
      </View>
    </View>
  );
}

/** Escena AI — circuito con chip central + nube offline. */
function AiScene() {
  return (
    <View style={illo.scene}>
      <View style={illo.wall}>
        {[0, 1, 2, 3, 4].map((i) => (
          <View key={i} style={illo.wallPlankLine} />
        ))}
      </View>

      <View style={illo.bench}>
        <View style={illo.benchTopHighlight} />
        <View style={illo.benchTopShadow} />
      </View>

      <View style={illo.aiCenter}>
        {/* Trazas de circuito */}
        <View style={[illo.trace, { top: 30, left: 0, width: 90, height: 3 }]} />
        <View style={[illo.trace, { top: 30, left: 87, width: 3, height: 40 }]} />
        <View style={[illo.trace, { top: 70, left: 87, width: 50, height: 3 }]} />
        <View style={[illo.trace, { top: 110, right: 0, width: 90, height: 3 }]} />
        <View style={[illo.trace, { top: 90, right: 87, width: 3, height: 22 }]} />
        {/* Puntos de conexión */}
        <View style={[illo.node, { top: 26, left: 0 }]} />
        <View style={[illo.node, { top: 106, right: 0 }]} />

        {/* Chip central */}
        <View style={illo.chipBox}>
          <View style={illo.chipInner}>
            <Text style={illo.chipLabel}>AI</Text>
          </View>
          {/* Patitas del chip */}
          {[0, 1, 2, 3].map((i) => (
            <View
              key={`t${i}`}
              style={[illo.chipPin, { top: -6, left: 10 + i * 16 }]}
            />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <View
              key={`b${i}`}
              style={[illo.chipPin, { bottom: -6, left: 10 + i * 16 }]}
            />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <View
              key={`l${i}`}
              style={[illo.chipPinH, { left: -6, top: 10 + i * 16 }]}
            />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <View
              key={`r${i}`}
              style={[illo.chipPinH, { right: -6, top: 10 + i * 16 }]}
            />
          ))}
        </View>

        {/* Badge offline */}
        <View style={illo.offlineBadge}>
          <Text style={illo.offlineBadgeText}>OFFLINE</Text>
        </View>
      </View>
    </View>
  );
}

function renderScene(key: SlideKey) {
  switch (key) {
    case 'welcome':
      return <WorkshopScene />;
    case 'diy':
      return <DiyScene />;
    case 'pro':
      return <ProScene />;
    case 'ai':
      return <AiScene />;
  }
}

// ═══════════════════════════════════════════════════════════════
// Pantalla principal
// ═══════════════════════════════════════════════════════════════

export default function OnboardingScreen({ navigation }: Props) {
  const [page, setPage] = useState(0);
  const listRef = useRef<FlatList<Slide>>(null);

  const handleFinish = () => {
    setHasSeenOnboarding(true);
    navigation.replace('Home');
  };

  const handleNext = () => {
    if (page < slides.length - 1) {
      listRef.current?.scrollToIndex({ index: page + 1, animated: true });
    } else {
      handleFinish();
    }
  };

  const onMomentumEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
      if (idx !== page) setPage(idx);
    },
    [page],
  );

  const renderItem = ({ item }: ListRenderItemInfo<Slide>) => (
    <View style={[styles.slide, { width: SCREEN_WIDTH }]}>
      {/* Ilustración */}
      <View style={styles.illoWrap}>{renderScene(item.key)}</View>

      {/* Texto */}
      <View style={styles.textBlock}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.desc}</Text>

        <View style={styles.bullets}>
          {item.bullets.map((b, i) => (
            <View key={i} style={styles.bullet}>
              <View style={styles.bulletIconWrap}>
                <Text style={styles.bulletIcon}>{b.icon}</Text>
              </View>
              <Text style={styles.bulletText}>{b.text}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const isLast = page === slides.length - 1;

  return (
    <SafeAreaView style={styles.container}>
      {/* Skip arriba a la derecha */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.skipBtn}
          onPress={handleFinish}
          activeOpacity={0.7}
        >
          <Text style={styles.skipText}>Saltar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={listRef}
        data={slides}
        keyExtractor={(s) => s.key}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumEnd}
        bounces={false}
      />

      {/* Dots */}
      <View style={styles.dots}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === page && styles.dotActive]}
          />
        ))}
      </View>

      {/* Botón principal */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleNext}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>
          {isLast ? 'Empezar' : 'Siguiente'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ═══════════════════════════════════════════════════════════════
// Estilos de la pantalla
// ═══════════════════════════════════════════════════════════════

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  skipBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.border,
  },
  skipText: {
    ...typography.buttonSmall,
    color: colors.textSecondary,
  },
  slide: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  illoWrap: {
    width: '100%',
    aspectRatio: 1.15,
    marginBottom: spacing.xl,
    borderRadius: radius.xl,
    overflow: 'hidden',
    backgroundColor: wood.back,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
  textBlock: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    ...typography.hero,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  bullets: {
    width: '100%',
    gap: spacing.sm,
  },
  bullet: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  bulletIconWrap: {
    width: 34,
    height: 34,
    borderRadius: radius.full,
    backgroundColor: colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  bulletIcon: {
    fontSize: 18,
  },
  bulletText: {
    ...typography.bodySmall,
    color: colors.text,
    fontWeight: '600',
    flex: 1,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
    marginTop: spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  dotActive: {
    backgroundColor: colors.primary,
    width: 28,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: radius.lg,
    alignItems: 'center',
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    ...typography.button,
    color: colors.textOnPrimary,
    letterSpacing: 0.5,
  },
});

// ═══════════════════════════════════════════════════════════════
// Estilos de las ilustraciones (dibujadas con Views)
// ═══════════════════════════════════════════════════════════════

const illo = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: wood.back,
    position: 'relative',
    overflow: 'hidden',
  },
  // Pared del taller
  wall: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '70%',
    backgroundColor: wood.dark,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  wallPlankLine: {
    width: 1,
    height: '100%',
    backgroundColor: wood.deep,
  },
  peg: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: wood.highlight,
  },

  // Banco de trabajo
  bench: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '38%',
    backgroundColor: wood.main,
    borderTopWidth: 3,
    borderTopColor: wood.highlight,
  },
  benchTopHighlight: {
    position: 'absolute',
    top: 3,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: wood.light,
  },
  benchTopShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: wood.dark,
  },

  // ── Escena WELCOME: herramientas sobre el banco ──────────────
  toolsRow: {
    position: 'absolute',
    bottom: '28%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.lg,
  },
  // Martillo
  hammer: {
    width: 50,
    height: 60,
    alignItems: 'center',
  },
  hammerHead: {
    width: 44,
    height: 18,
    backgroundColor: wood.deep,
    borderRadius: 3,
    borderTopWidth: 2,
    borderTopColor: '#555',
    borderBottomWidth: 1,
    borderBottomColor: '#111',
  },
  hammerHandle: {
    width: 8,
    height: 42,
    backgroundColor: wood.medium,
    borderRadius: 2,
    borderLeftWidth: 1,
    borderLeftColor: wood.highlight,
    borderRightWidth: 1,
    borderRightColor: wood.deep,
  },
  // Regla
  ruler: {
    width: 70,
    height: 14,
    backgroundColor: '#E8B23E',
    borderRadius: 2,
    borderTopWidth: 1,
    borderTopColor: '#F5D06A',
    borderBottomWidth: 1,
    borderBottomColor: '#B88520',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingBottom: 2,
  },
  rulerTick: {
    width: 1,
    height: 5,
    backgroundColor: wood.deep,
  },
  // Lápiz
  pencil: {
    width: 60,
    height: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pencilBody: {
    width: 48,
    height: 10,
    backgroundColor: '#E88A3C',
    borderTopWidth: 1,
    borderTopColor: '#F5A55A',
    borderBottomWidth: 1,
    borderBottomColor: '#B05E1F',
  },
  pencilTip: {
    width: 0,
    height: 0,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderLeftWidth: 12,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: wood.cream,
  },
  // Sierra
  saw: {
    width: 64,
    height: 22,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sawBlade: {
    width: 44,
    height: 8,
    backgroundColor: '#BFC4CA',
    borderTopWidth: 1,
    borderTopColor: '#E0E4E8',
    borderBottomWidth: 1,
    borderBottomColor: '#7C8188',
  },
  sawTeeth: {
    position: 'absolute',
    left: 0,
    top: 14,
    width: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sawTooth: {
    width: 0,
    height: 0,
    borderLeftWidth: 3.5,
    borderRightWidth: 3.5,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#BFC4CA',
  },
  sawHandle: {
    width: 18,
    height: 20,
    backgroundColor: wood.medium,
    borderRadius: 4,
    borderLeftWidth: 2,
    borderLeftColor: wood.highlight,
    borderRightWidth: 1,
    borderRightColor: wood.deep,
    marginLeft: 2,
  },
  chip: {
    position: 'absolute',
    width: 14,
    height: 4,
    borderRadius: 2,
    backgroundColor: wood.highlight,
    opacity: 0.8,
  },

  // ── Escena DIY: bombilla + notas ─────────────────────────────
  diyCenter: {
    position: 'absolute',
    top: '18%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  glowRing: {
    position: 'absolute',
    top: 6,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#E8B23E',
    opacity: 0.12,
  },
  glowRingInner: {
    position: 'absolute',
    top: 22,
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#F5D06A',
    opacity: 0.18,
  },
  bulb: {
    alignItems: 'center',
  },
  bulbGlass: {
    width: 70,
    height: 80,
    borderRadius: 35,
    backgroundColor: '#F5D06A',
    borderWidth: 2,
    borderColor: '#D4A040',
    shadowColor: '#F5D06A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
  },
  bulbFilament: {
    position: 'absolute',
    top: 30,
    width: 22,
    height: 14,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#C27D1B',
    borderBottomWidth: 0,
  },
  bulbBase: {
    width: 34,
    height: 14,
    backgroundColor: '#8A8A8A',
    borderLeftWidth: 1,
    borderLeftColor: '#AAA',
    borderRightWidth: 1,
    borderRightColor: '#555',
  },
  bulbBaseLine: {
    width: 34,
    height: 2,
    backgroundColor: '#555',
    marginTop: 1,
  },
  bulbBaseLine2: {
    width: 24,
    height: 6,
    backgroundColor: '#5A5A5A',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginTop: 1,
  },
  note: {
    position: 'absolute',
    width: 70,
    height: 58,
    backgroundColor: wood.cream,
    borderRadius: 4,
    padding: 6,
    borderWidth: 1,
    borderColor: wood.highlight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  noteLine: {
    height: 3,
    width: 42,
    backgroundColor: wood.medium,
    marginBottom: 5,
    borderRadius: 1,
  },

  // ── Escena PRO: tablón con cortes + cinta ────────────────────
  proCenter: {
    position: 'absolute',
    top: '22%',
    left: '8%',
    right: '8%',
    alignItems: 'center',
  },
  plank: {
    width: '100%',
    height: 58,
    backgroundColor: wood.light,
    borderRadius: 4,
    borderTopWidth: 2,
    borderTopColor: wood.highlight,
    borderBottomWidth: 3,
    borderBottomColor: wood.deep,
    marginTop: 30,
    marginBottom: 24,
    overflow: 'visible',
  },
  plankHighlight: {
    position: 'absolute',
    top: 6,
    left: 8,
    right: 8,
    height: 2,
    backgroundColor: wood.cream,
    opacity: 0.4,
  },
  cutLine: {
    position: 'absolute',
    top: -4,
    bottom: -4,
    width: 2,
    backgroundColor: colors.danger,
    opacity: 0.85,
  },
  sizeBadge: {
    position: 'absolute',
    backgroundColor: colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: wood.highlight,
  },
  sizeBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  tape: {
    width: 90,
    alignItems: 'center',
  },
  tapeBody: {
    width: 80,
    height: 42,
    backgroundColor: '#C25D4A',
    borderRadius: 10,
    borderTopWidth: 2,
    borderTopColor: '#E08070',
    borderBottomWidth: 2,
    borderBottomColor: '#8A3A2A',
  },
  tapeStrip: {
    position: 'absolute',
    bottom: -8,
    left: -14,
    width: 60,
    height: 8,
    backgroundColor: '#E8B23E',
    borderTopWidth: 1,
    borderTopColor: '#F5D06A',
    borderBottomWidth: 1,
    borderBottomColor: '#B88520',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  tapeTick: {
    width: 1,
    height: 3,
    backgroundColor: wood.deep,
  },
  tapeHook: {
    position: 'absolute',
    bottom: -12,
    left: -18,
    width: 5,
    height: 6,
    backgroundColor: '#BFC4CA',
  },

  // ── Escena AI: chip + circuito ───────────────────────────────
  aiCenter: {
    position: 'absolute',
    top: '16%',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trace: {
    position: 'absolute',
    backgroundColor: wood.highlight,
    opacity: 0.7,
    borderRadius: 1,
  },
  node: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: wood.highlight,
  },
  chipBox: {
    width: 88,
    height: 88,
    backgroundColor: wood.medium,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: wood.highlight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  chipInner: {
    flex: 1,
    margin: 6,
    backgroundColor: wood.dark,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: wood.medium,
  },
  chipLabel: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: 1,
  },
  chipPin: {
    position: 'absolute',
    width: 6,
    height: 8,
    backgroundColor: '#BFC4CA',
    borderRadius: 1,
  },
  chipPinH: {
    position: 'absolute',
    width: 8,
    height: 6,
    backgroundColor: '#BFC4CA',
    borderRadius: 1,
  },
  offlineBadge: {
    position: 'absolute',
    bottom: 10,
    right: 18,
    backgroundColor: colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: wood.highlight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  offlineBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.8,
  },
});
