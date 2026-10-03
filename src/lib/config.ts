/**
 * Spectrum axes definition.
 * `nsfw: true` axes are encoded as 0 in legacy `?sfw=1` share links.
 */
export interface AxisDef {
  readonly id: string;
  readonly nsfw: boolean;
}

export const axes: AxisDef[] = [
  { id: 'genderIdentity', nsfw: false },
  { id: 'genderExpression', nsfw: false },
  { id: 'sexualOrientation', nsfw: true },
  { id: 'romanticOrientation', nsfw: false },
  { id: 'sexualAttraction', nsfw: true },
  { id: 'sexualDrive', nsfw: true },
  { id: 'romanticDesire', nsfw: false },
  { id: 'relationshipAttitude', nsfw: false },
  { id: 'genderComfort', nsfw: false },
  { id: 'kinkRole', nsfw: true },
  { id: 'sexualExploration', nsfw: true }
];

export const axisIds: string[] = axes.map((a) => a.id);

export const nsfwAxisIds: Set<string> = new Set(axes.filter((a) => a.nsfw).map((a) => a.id));

export const DEFAULT_VALUE = 5;
export const MIN_VALUE = 1;
export const MAX_VALUE = 9;
/** 0 = unset / prefer not to say */
export const UNSET_VALUE = 0;

/** Axis id → slider value 0-9. */
export type AxisValues = Record<string, number>;
