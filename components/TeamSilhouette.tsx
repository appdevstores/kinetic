import { Image, ImageSourcePropType, StyleSheet, View, ViewStyle } from 'react-native';

const silhouette = require('../assets/team_silhouette.png');

/**
 * Subtle background watermark: 14 kids and 2 coaches (the team) drawn as a
 * faint line-art strip. Rendered behind the page content.
 */
export function TeamSilhouette({
  opacity = 0.07,
  style,
}: {
  /** How faint the watermark is. Defaults to a very subtle 0.07. */
  opacity?: number;
  style?: ViewStyle;
}) {
  return (
    <View style={[styles.container, style]} pointerEvents="none" accessibilityElementsHidden>
      <Image source={silhouette as ImageSourcePropType} style={[styles.image, { opacity }]} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 110,
  },
});
