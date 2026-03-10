/**
 * Simple reactive state manager for the assessment.
 * No framework dependency - just a plain object with change listeners.
 */

const listeners = [];

export const state = {
  // Flow control
  phase: "CORE",        // CORE | MODULE | CLOSING | SUBMITTING | RESULTS
  slideIndex: 0,        // Current slide index within the active question set
  slides: [],           // The assembled question array for the current path

  // Routing
  selectedModule: null,  // Module key: "A" through "I"
  moduleName: "",        // Display name: "Personal Injury & Mass Tort"

  // Module I special handling
  moduleIPrimary: null,
  moduleISecondary: null,

  // Answers
  answers: {},           // All collected answers keyed by question id

  // Results (returned from Worker)
  scores: null,
  error: null,

  // UI state
  isSubmitting: false,
};

export function updateState(partial) {
  Object.assign(state, partial);
  listeners.forEach((fn) => fn(state));
}

export function onStateChange(fn) {
  listeners.push(fn);
}

export function setAnswer(id, value) {
  state.answers[id] = value;
  listeners.forEach((fn) => fn(state));
}

export function getTotalSlides() {
  return state.slides.length;
}

export function getCurrentSlide() {
  return state.slides[state.slideIndex] || null;
}

export function getProgress() {
  if (state.slides.length === 0) return 0;
  return Math.round(((state.slideIndex + 1) / state.slides.length) * 100);
}
