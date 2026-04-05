// src/data/company/index.ts
import type { QAItem, CompanyQAList } from "./types";

import { Google_QA } from "./google";
import { Amazon_QA } from "./amazon";
import { Microsoft_QA } from "./microsoft";
import { Meta_QA } from "./meta";
import { Apple_QA } from "./apple";
import { Netflix_QA } from "./netflix";
import { Uber_QA } from "./uber";
import { airbnb_QA } from "./airbnb";
import { Oracle_QA } from "./oracle";
import { Tesla_QA } from "./tesla";
import { IBM_QA } from "./ibm";
import { Adobe_QA } from "./adobe"; // optional if Adobe exists

export const COMPANIES = [
  "Google",
  "Amazon",
  "Microsoft",
  "Meta",
  "Apple",
  "Adobe",
  "Netflix",
  "Uber",
  "Airbnb",
  "Oracle",
  "Tesla",
  "IBM",
] as const;

export type CompanyName = typeof COMPANIES[number];

export const DEFAULT_QA: CompanyQAList = {
  Google: Google_QA,
  Amazon: Amazon_QA,
  Microsoft: Microsoft_QA,
  Meta: Meta_QA,
  Apple: Apple_QA,
  Adobe: Adobe_QA,
  Netflix: Netflix_QA,
  Uber: Uber_QA,
  Airbnb: airbnb_QA,
  Oracle: Oracle_QA,
  Tesla: Tesla_QA,
  IBM: IBM_QA,
};

export type { QAItem };
