/**
 * Field diagrams extracted from U7_Soccer_8Week_Training_Plan.pdf.
 * Each week has three: the warm-up, Drill A, and Drill B.
 */
import { ImageSourcePropType } from 'react-native';
import { BlockType } from './trainingPlan';

const warmup: Record<number, ImageSourcePropType> = {
  1: require('../assets/diagrams/w1_warmup.png'),
  2: require('../assets/diagrams/w2_warmup.png'),
  3: require('../assets/diagrams/w3_warmup.png'),
  4: require('../assets/diagrams/w4_warmup.png'),
  5: require('../assets/diagrams/w5_warmup.png'),
  6: require('../assets/diagrams/w6_warmup.png'),
  7: require('../assets/diagrams/w7_warmup.png'),
  8: require('../assets/diagrams/w8_warmup.png'),
};

const drillA: Record<number, ImageSourcePropType> = {
  1: require('../assets/diagrams/w1_drilla.png'),
  2: require('../assets/diagrams/w2_drilla.png'),
  3: require('../assets/diagrams/w3_drilla.png'),
  4: require('../assets/diagrams/w4_drilla.png'),
  5: require('../assets/diagrams/w5_drilla.png'),
  6: require('../assets/diagrams/w6_drilla.png'),
  7: require('../assets/diagrams/w7_drilla.png'),
  8: require('../assets/diagrams/w8_drilla.png'),
};

const drillB: Record<number, ImageSourcePropType> = {
  1: require('../assets/diagrams/w1_drillb.png'),
  2: require('../assets/diagrams/w2_drillb.png'),
  3: require('../assets/diagrams/w3_drillb.png'),
  4: require('../assets/diagrams/w4_drillb.png'),
  5: require('../assets/diagrams/w5_drillb.png'),
  6: require('../assets/diagrams/w6_drillb.png'),
  7: require('../assets/diagrams/w7_drillb.png'),
  8: require('../assets/diagrams/w8_drillb.png'),
};

const byType: Record<BlockType, Record<number, ImageSourcePropType>> = {
  warmup,
  drillA,
  drillB,
  game: {}, // the 4v4 game block has no separate diagram
};

/** Returns the field diagram for a block, or undefined if none exists. */
export function getDiagram(weekId: number, blockType: BlockType): ImageSourcePropType | undefined {
  return byType[blockType][weekId];
}
