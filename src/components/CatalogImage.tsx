import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../theme';
import Icon, { IconName } from './Icon';

type Props = {
  uri: string;
  accentColor: string;
  icon: IconName;
  badgeText?: string;
  size?: number;
};

export default function CatalogImage({
  uri,
  accentColor,
  icon,
  badgeText,
  size = 84,
}: Props) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [uri]);

  if (failed) {
    return (
      <View
        style={[
          styles.fallback,
          {
            width: size,
            height: size,
            borderColor: `${accentColor}33`,
            backgroundColor: `${accentColor}14`,
          },
        ]}
      >
        <View style={[styles.stripe, { backgroundColor: accentColor }]} />
        <Icon name={icon} size={Math.round(size * 0.42)} color={accentColor} />
        {!!badgeText && (
          <View style={[styles.badge, { backgroundColor: accentColor }]}>
            <Text style={styles.badgeText}>{badgeText.slice(0, 1).toUpperCase()}</Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <View
      style={[
        styles.frame,
        {
          width: size,
          height: size,
          borderColor: `${accentColor}22`,
        },
      ]}
    >
      <Image
        source={{ uri }}
        style={styles.image}
        resizeMode="cover"
        onError={() => setFailed(true)}
      />
      <View style={[styles.stripe, { backgroundColor: accentColor }]} />
      {!!badgeText && (
        <View style={[styles.badge, { backgroundColor: accentColor }]}>
          <Text style={styles.badgeText}>{badgeText.slice(0, 1).toUpperCase()}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    backgroundColor: colors.bgAlt,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallback: {
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgAlt,
  },
  stripe: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  badge: {
    position: 'absolute',
    right: 6,
    bottom: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
  },
});
