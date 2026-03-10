/**
 * Router: maps Q5 practice area selection to the correct module.
 * Also handles Module I's special hybrid logic.
 */
import { QUESTIONS as MODULE_A, MODULE_KEY as KEY_A, MODULE_NAME as NAME_A } from "./questions/moduleA.js";
import { QUESTIONS as MODULE_B, MODULE_KEY as KEY_B, MODULE_NAME as NAME_B } from "./questions/moduleB.js";
import { QUESTIONS as MODULE_C, MODULE_KEY as KEY_C, MODULE_NAME as NAME_C } from "./questions/moduleC.js";
import { QUESTIONS as MODULE_D, MODULE_KEY as KEY_D, MODULE_NAME as NAME_D } from "./questions/moduleD.js";
import { QUESTIONS as MODULE_E, MODULE_KEY as KEY_E, MODULE_NAME as NAME_E } from "./questions/moduleE.js";
import { QUESTIONS as MODULE_F, MODULE_KEY as KEY_F, MODULE_NAME as NAME_F } from "./questions/moduleF.js";
import { QUESTIONS as MODULE_G, MODULE_KEY as KEY_G, MODULE_NAME as NAME_G } from "./questions/moduleG.js";
import { QUESTIONS as MODULE_H, MODULE_KEY as KEY_H, MODULE_NAME as NAME_H } from "./questions/moduleH.js";
import { QUESTIONS as MODULE_I, MODULE_KEY as KEY_I, MODULE_NAME as NAME_I } from "./questions/moduleI.js";

const MODULES = {
  A: { key: KEY_A, name: NAME_A, questions: MODULE_A },
  B: { key: KEY_B, name: NAME_B, questions: MODULE_B },
  C: { key: KEY_C, name: NAME_C, questions: MODULE_C },
  D: { key: KEY_D, name: NAME_D, questions: MODULE_D },
  E: { key: KEY_E, name: NAME_E, questions: MODULE_E },
  F: { key: KEY_F, name: NAME_F, questions: MODULE_F },
  G: { key: KEY_G, name: NAME_G, questions: MODULE_G },
  H: { key: KEY_H, name: NAME_H, questions: MODULE_H },
  I: { key: KEY_I, name: NAME_I, questions: MODULE_I },
};

/**
 * Get the module for a given route key.
 * @param {string} routeKey - "A" through "I"
 * @returns {{ key: string, name: string, questions: Array }}
 */
export function getModule(routeKey) {
  return MODULES[routeKey] || MODULES["I"];
}

/**
 * Get all module keys and names (for Module I secondary selection).
 * Excludes Module I itself from the secondary picker.
 */
export function getModuleOptions() {
  return Object.entries(MODULES)
    .filter(([key]) => key !== "I")
    .map(([key, mod]) => ({ key, name: mod.name }));
}

/**
 * Build a hybrid question set for Module I (multi-practice).
 * Takes 4 questions from each of two selected modules.
 * @param {string} primaryKey - First selected module key
 * @param {string} secondaryKey - Second selected module key
 * @returns {Array} Combined 8 questions (4 from each)
 */
export function buildHybridModule(primaryKey, secondaryKey) {
  const primary = MODULES[primaryKey];
  const secondary = MODULES[secondaryKey];
  if (!primary || !secondary) return MODULES["I"].questions;

  // Take first 4 from primary, first 4 from secondary
  return [
    ...primary.questions.slice(0, 4),
    ...secondary.questions.slice(0, 4),
  ];
}
