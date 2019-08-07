import { StringField } from "../../../../lib/forms";

export interface AnalysisResult {
  t: number;
  message: string | React.ReactFragment;
  warning: boolean;
}

export interface AnalysisOpts {
  min: number;
  max: number;
  toString: (value: number) => string;
}

export const analyzeField = (
  field: StringField,
  opts: AnalysisOpts
): AnalysisResult => {
  const value = Number(field.value);
  const { min, max } = opts;
  let toString = opts.toString;

  // Lerp between min and max based on
  let t: number;

  if (Math.fround(min - max) === 0) {
    if (value > max) {
      t = 1.1;
    } else if (value < min) {
      t = -0.1;
    } else {
      t = 1;
    }
  } else {
    t = (value - min) / (max - min);
  }

  const warning: boolean = t < 0 || t > 1;
  let message: string = ``;

  if (t < 0) {
    message += `[${
      field.displayName
    }] is LOWER than recommended min of ${toString(min)}`;
    t = 0;
  } else if (t > 1) {
    message += `[${
      field.displayName
    }] is LARGER than recommended max of ${toString(max)}`;
    t = 1;
  } else {
    message += `${field.displayName}: ${toString(value)}`;
  }

  return {
    t,
    message,
    warning
  };
};