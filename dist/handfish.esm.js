/**
 * Handfish Design System
 * Copyright (c) 2025-2026 Noise Factor LLC. https://noisefactor.io/
 * SPDX-License-Identifier: MIT
 * Build: 08ce491a (dirty)
 * Date: 2026-03-05T17:55:47.189Z
 */
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/utils/colorConversions.js
function sRGBToLinear(c) {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function linearToSRGB(c) {
  return c <= 31308e-7 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}
function sRGBToLinearRGB(rgb) {
  return {
    r: sRGBToLinear(rgb.r / 255),
    g: sRGBToLinear(rgb.g / 255),
    b: sRGBToLinear(rgb.b / 255)
  };
}
function linearRGBToSRGB(linear) {
  return {
    r: Math.round(linearToSRGB(linear.r) * 255),
    g: Math.round(linearToSRGB(linear.g) * 255),
    b: Math.round(linearToSRGB(linear.b) * 255)
  };
}
function rgbToHsv(rgb) {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let h = 0;
  if (delta !== 0) {
    if (max === r) {
      h = (g - b) / delta % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  const s = max === 0 ? 0 : delta / max * 100;
  const v = max * 100;
  return { h, s, v };
}
function hsvToRgb(hsv) {
  const h = (hsv.h % 360 + 360) % 360;
  const s = hsv.s / 100;
  const v = hsv.v / 100;
  const c = v * s;
  const x = c * (1 - Math.abs(h / 60 % 2 - 1));
  const m = v - c;
  let r, g, b;
  if (h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (h < 180) {
    [r, g, b] = [0, c, x];
  } else if (h < 240) {
    [r, g, b] = [0, x, c];
  } else if (h < 300) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
}
function linearRGBToOKLab(linear) {
  const l_ = 0.4122214708 * linear.r + 0.5363325363 * linear.g + 0.0514459929 * linear.b;
  const m_ = 0.2119034982 * linear.r + 0.6806995451 * linear.g + 0.1073969566 * linear.b;
  const s_ = 0.0883024619 * linear.r + 0.2817188376 * linear.g + 0.6299787005 * linear.b;
  const l = Math.cbrt(l_);
  const m = Math.cbrt(m_);
  const s = Math.cbrt(s_);
  return {
    l: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  };
}
function okLabToLinearRGB(lab) {
  const l_ = lab.l + 0.3963377774 * lab.a + 0.2158037573 * lab.b;
  const m_ = lab.l - 0.1055613458 * lab.a - 0.0638541728 * lab.b;
  const s_ = lab.l - 0.0894841775 * lab.a - 1.291485548 * lab.b;
  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;
  return {
    r: 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    b: -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
  };
}
function okLabToOKLCH(lab) {
  const c = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
  let h = Math.atan2(lab.b, lab.a) * (180 / Math.PI);
  if (h < 0) h += 360;
  return { l: lab.l, c, h };
}
function oklchToOKLab(lch) {
  const hRad = lch.h * (Math.PI / 180);
  return {
    l: lch.l,
    a: lch.c * Math.cos(hRad),
    b: lch.c * Math.sin(hRad)
  };
}
function rgbToOklab(rgb) {
  const linear = sRGBToLinearRGB(rgb);
  return linearRGBToOKLab(linear);
}
function oklabToRgb(lab) {
  const linear = okLabToLinearRGB(lab);
  return {
    r: Math.round(clamp(linearToSRGB(clamp(linear.r, 0, 1)), 0, 1) * 255),
    g: Math.round(clamp(linearToSRGB(clamp(linear.g, 0, 1)), 0, 1) * 255),
    b: Math.round(clamp(linearToSRGB(clamp(linear.b, 0, 1)), 0, 1) * 255)
  };
}
function rgbToOklch(rgb) {
  const linear = sRGBToLinearRGB(rgb);
  const lab = linearRGBToOKLab(linear);
  return okLabToOKLCH(lab);
}
function oklchToRgb(lch) {
  const lab = oklchToOKLab(lch);
  const linear = okLabToLinearRGB(lab);
  const clamped = gamutMapLinearRGB(linear, lch);
  return linearRGBToSRGB(clamped);
}
function oklchToRgbRaw(lch) {
  const lab = oklchToOKLab(lch);
  const linear = okLabToLinearRGB(lab);
  return {
    r: Math.round(linearToSRGB(linear.r) * 255),
    g: Math.round(linearToSRGB(linear.g) * 255),
    b: Math.round(linearToSRGB(linear.b) * 255)
  };
}
function isInGamut(linear) {
  const eps = 1e-4;
  return linear.r >= -eps && linear.r <= 1 + eps && linear.g >= -eps && linear.g <= 1 + eps && linear.b >= -eps && linear.b <= 1 + eps;
}
function gamutMapLinearRGB(linear, originalLch) {
  if (isInGamut(linear)) {
    return {
      r: Math.max(0, Math.min(1, linear.r)),
      g: Math.max(0, Math.min(1, linear.g)),
      b: Math.max(0, Math.min(1, linear.b))
    };
  }
  let lowC = 0;
  let highC = originalLch.c;
  const epsilon = 1e-4;
  const maxIterations = 20;
  for (let i = 0; i < maxIterations && highC - lowC > epsilon; i++) {
    const midC = (lowC + highC) / 2;
    const testLch = { l: originalLch.l, c: midC, h: originalLch.h };
    const testLab = oklchToOKLab(testLch);
    const testLinear = okLabToLinearRGB(testLab);
    if (isInGamut(testLinear)) {
      lowC = midC;
    } else {
      highC = midC;
    }
  }
  const mappedLch = { l: originalLch.l, c: lowC, h: originalLch.h };
  const mappedLab = oklchToOKLab(mappedLch);
  const mappedLinear = okLabToLinearRGB(mappedLab);
  return {
    r: Math.max(0, Math.min(1, mappedLinear.r)),
    g: Math.max(0, Math.min(1, mappedLinear.g)),
    b: Math.max(0, Math.min(1, mappedLinear.b))
  };
}
function getMaxChroma(l, h) {
  let lowC = 0;
  let highC = 0.5;
  const epsilon = 1e-3;
  const maxIterations = 20;
  for (let i = 0; i < maxIterations && highC - lowC > epsilon; i++) {
    const midC = (lowC + highC) / 2;
    const lab = oklchToOKLab({ l, c: midC, h });
    const linear = okLabToLinearRGB(lab);
    if (isInGamut(linear)) {
      lowC = midC;
    } else {
      highC = midC;
    }
  }
  return lowC;
}
function getMaxAB(l) {
  return 0.4 * Math.sin(Math.PI * l);
}
function parseHex(hex) {
  if (!hex || typeof hex !== "string") return null;
  let h = hex.trim();
  if (h.startsWith("#")) h = h.slice(1);
  if (h.length === 3) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  }
  if (h.length !== 6) return null;
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16)
  };
}
function rgbToHex(rgb) {
  const r = Math.max(0, Math.min(255, Math.round(rgb.r)));
  const g = Math.max(0, Math.min(255, Math.round(rgb.g)));
  const b = Math.max(0, Math.min(255, Math.round(rgb.b)));
  return "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");
}
function rgbToHexWithAlpha(rgb, alpha) {
  const hex = rgbToHex(rgb);
  const a = Math.max(0, Math.min(255, Math.round(alpha * 255)));
  return hex + a.toString(16).padStart(2, "0");
}
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
function normalizeHue(h) {
  return (h % 360 + 360) % 360;
}
function roundTo(value, decimals) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

// src/utils/tooltips.js
var TOOLTIP_MARGIN = 12;
var TOOLTIP_STYLES_ID = "hf-tooltip-styles";
if (typeof document !== "undefined" && !document.getElementById(TOOLTIP_STYLES_ID)) {
  const style = document.createElement("style");
  style.id = TOOLTIP_STYLES_ID;
  style.textContent = `
        #hf-tooltip-layer {
            position: fixed;
            z-index: 100000;
            padding: 0.375rem 0.625rem;
            font-family: var(--hf-font-family, Nunito, system-ui, sans-serif);
            font-size: var(--hf-size-xs, 0.625rem);
            color: var(--hf-text-bright, #eef1f8);
            background: var(--hf-bg-surface, #1a1e2e);
            border: 1px solid var(--hf-border, rgba(255, 255, 255, 0.08));
            border-radius: var(--hf-radius-sm, 0.25rem);
            pointer-events: none;
            white-space: nowrap;
            transform: translateX(-50%);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        #hf-tooltip-layer[data-position="above"] {
            transform: translateX(-50%) translateY(-100%);
        }
    `;
  document.head.appendChild(style);
}
var tooltipElement = null;
var activeTarget = null;
var initialized = false;
function ensureTooltipElement() {
  if (tooltipElement || typeof document === "undefined") {
    return tooltipElement;
  }
  const element = document.createElement("div");
  element.id = "hf-tooltip-layer";
  element.setAttribute("role", "tooltip");
  element.setAttribute("hidden", "");
  element.setAttribute("aria-hidden", "true");
  document.body.appendChild(element);
  tooltipElement = element;
  return tooltipElement;
}
function getTooltipMessage(target) {
  if (!target) {
    return "";
  }
  const dataTitle = target.getAttribute("data-title");
  if (typeof dataTitle === "string" && dataTitle.trim().length > 0) {
    return dataTitle.trim();
  }
  const ariaLabel = target.getAttribute("aria-label");
  if (typeof ariaLabel === "string" && ariaLabel.trim().length > 0) {
    return ariaLabel.trim();
  }
  return "";
}
function updateTooltipPosition() {
  if (!tooltipElement || !activeTarget) {
    return;
  }
  if (!document.body.contains(activeTarget)) {
    hideTooltip();
    return;
  }
  const rect = activeTarget.getBoundingClientRect();
  const tooltipWidth = tooltipElement.offsetWidth;
  const tooltipHeight = tooltipElement.offsetHeight;
  const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
  const viewportHeight = window.innerHeight;
  const halfWidth = tooltipWidth / 2;
  let centerX = rect.left + rect.width / 2;
  centerX = Math.min(Math.max(centerX, TOOLTIP_MARGIN + halfWidth), viewportWidth - TOOLTIP_MARGIN - halfWidth);
  let top = rect.bottom + TOOLTIP_MARGIN;
  let position = "below";
  const fitsAbove = rect.top - TOOLTIP_MARGIN - tooltipHeight >= TOOLTIP_MARGIN;
  if (top + tooltipHeight > viewportHeight && fitsAbove) {
    position = "above";
    top = rect.top - TOOLTIP_MARGIN;
  }
  if (position === "below") {
    const maxTop = viewportHeight - TOOLTIP_MARGIN - tooltipHeight;
    top = Math.min(top, maxTop);
    top = Math.max(top, TOOLTIP_MARGIN);
  } else {
    const minTop = TOOLTIP_MARGIN + tooltipHeight;
    top = Math.max(top, minTop);
    top = Math.min(top, viewportHeight - TOOLTIP_MARGIN);
  }
  tooltipElement.style.left = `${centerX}px`;
  tooltipElement.style.top = `${top}px`;
  tooltipElement.dataset.position = position;
}
function showTooltip(target) {
  const message = getTooltipMessage(target);
  if (!message) {
    hideTooltip();
    return;
  }
  const element = ensureTooltipElement();
  if (!element) {
    return;
  }
  activeTarget = target;
  element.textContent = message;
  element.dataset.position = "below";
  element.dataset.visible = "true";
  element.setAttribute("aria-hidden", "false");
  element.style.visibility = "hidden";
  element.removeAttribute("hidden");
  updateTooltipPosition();
  element.style.visibility = "visible";
}
function hideTooltip(target) {
  if (target && target !== activeTarget) {
    return;
  }
  if (!tooltipElement) {
    return;
  }
  tooltipElement.setAttribute("aria-hidden", "true");
  tooltipElement.removeAttribute("data-visible");
  tooltipElement.removeAttribute("data-position");
  tooltipElement.textContent = "";
  tooltipElement.style.visibility = "hidden";
  tooltipElement.setAttribute("hidden", "");
  activeTarget = null;
}
function handlePointerOver(event) {
  const target = event.target instanceof Element ? event.target.closest(".tooltip") : null;
  if (!target) {
    return;
  }
  if (target === activeTarget) {
    updateTooltipPosition();
    return;
  }
  showTooltip(target);
}
function handlePointerOut(event) {
  if (!activeTarget) {
    return;
  }
  const current = event.target instanceof Element ? event.target.closest(".tooltip") : null;
  if (current !== activeTarget) {
    return;
  }
  const related = event.relatedTarget;
  if (related && activeTarget.contains(related)) {
    return;
  }
  hideTooltip(activeTarget);
}
function handlePointerDown(event) {
  if (!activeTarget) {
    return;
  }
  if (event.target instanceof Element && activeTarget.contains(event.target)) {
    return;
  }
  hideTooltip();
}
function handleFocusIn(event) {
  const target = event.target instanceof Element ? event.target.closest(".tooltip") : null;
  if (!target) {
    return;
  }
  showTooltip(target);
}
function handleFocusOut(event) {
  if (!activeTarget) {
    return;
  }
  const target = event.target instanceof Element ? event.target.closest(".tooltip") : null;
  if (target !== activeTarget) {
    return;
  }
  hideTooltip(activeTarget);
}
function handleViewportChange() {
  if (!activeTarget || !tooltipElement || tooltipElement.hasAttribute("hidden")) {
    return;
  }
  updateTooltipPosition();
}
function initializeTooltips() {
  if (initialized || typeof document === "undefined") {
    return;
  }
  initialized = true;
  ensureTooltipElement();
  document.addEventListener("pointerover", handlePointerOver, true);
  document.addEventListener("pointerout", handlePointerOut, true);
  document.addEventListener("pointerdown", handlePointerDown, true);
  document.addEventListener("focusin", handleFocusIn, true);
  document.addEventListener("focusout", handleFocusOut, true);
  window.addEventListener("scroll", handleViewportChange, true);
  window.addEventListener("resize", handleViewportChange, true);
}

// src/utils/escapeHandler.js
var escapeStack = [];
function registerEscapeable(element, closeFunction) {
  unregisterEscapeable(element);
  escapeStack.push({ element, close: closeFunction });
}
function unregisterEscapeable(element) {
  const index = escapeStack.findIndex((entry) => entry.element === element);
  if (index !== -1) {
    escapeStack.splice(index, 1);
  }
}
function closeTopmost() {
  if (escapeStack.length === 0) return false;
  const entry = escapeStack.pop();
  entry.close();
  return true;
}
function hasOpenEscapeables() {
  return escapeStack.length > 0;
}
function initEscapeHandler() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (closeTopmost()) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  });
}

// src/components/toggle-switch/ToggleSwitch.js
var stylesInjected = false;
function injectStyles() {
  if (stylesInjected) return;
  stylesInjected = true;
  const style = document.createElement("style");
  style.id = "hf-toggle-switch-styles";
  style.textContent = `
        toggle-switch {
            display: inline-block;
            vertical-align: middle;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
        }

        toggle-switch[disabled] {
            cursor: not-allowed;
            opacity: 0.5;
            pointer-events: none;
        }

        toggle-switch .ts-track {
            position: relative;
            width: 2rem;
            height: 1rem;
            background: color-mix(in srgb, var(--hf-bg-muted, #26314f) 60%, var(--hf-bg-elevated, #1b2538) 40%);
            border-radius: var(--hf-radius-pill, 999px);
            transition: background 0.15s ease;
            box-sizing: border-box;
        }

        toggle-switch:hover .ts-track {
            background: color-mix(in srgb, var(--hf-bg-muted, #26314f) 75%, var(--hf-bg-elevated, #1b2538) 25%);
        }

        toggle-switch:focus-visible {
            outline: none;
        }

        toggle-switch:focus-visible .ts-track {
            box-shadow: 0 0 0 2px color-mix(in srgb, var(--hf-accent, #a5b8ff) 25%, transparent 75%);
        }

        toggle-switch .ts-track.ts-checked {
            background: color-mix(in srgb, var(--hf-accent, #a5b8ff) 35%, var(--hf-bg-elevated, #1b2538) 65%);
        }

        toggle-switch:hover .ts-track.ts-checked {
            background: color-mix(in srgb, var(--hf-accent, #a5b8ff) 45%, var(--hf-bg-elevated, #1b2538) 55%);
        }

        toggle-switch .ts-thumb {
            position: absolute;
            top: 50%;
            left: 0.125rem;
            transform: translateY(-50%);
            width: 0.75rem;
            height: 0.75rem;
            background: var(--hf-text-dim, #98a7c8);
            border-radius: 50%;
            transition: left 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
            box-shadow: var(--hf-shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.1));
        }

        toggle-switch .ts-track.ts-checked .ts-thumb {
            left: calc(100% - 0.875rem);
            background: var(--hf-accent, #a5b8ff);
            box-shadow: var(--hf-shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.1));
        }

        toggle-switch:active .ts-thumb {
            width: 0.875rem;
        }

        toggle-switch:active .ts-track.ts-checked .ts-thumb {
            left: calc(100% - 1rem);
        }
    `;
  document.head.appendChild(style);
}
var ToggleSwitch = class extends HTMLElement {
  constructor() {
    super();
    this._checked = false;
    this._disabled = false;
    this._track = null;
    this._rendered = false;
    this._listenersAttached = false;
  }
  static get observedAttributes() {
    return ["checked", "disabled"];
  }
  connectedCallback() {
    injectStyles();
    if (!this._rendered) {
      this._render();
      this._rendered = true;
    }
    if (!this._listenersAttached) {
      this._setupEventListeners();
      this._listenersAttached = true;
    }
  }
  disconnectedCallback() {
  }
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "checked") {
      this._checked = newVal !== null;
      this._updateVisualState();
    } else if (name === "disabled") {
      this._disabled = newVal !== null;
      this._updateVisualState();
    }
  }
  /** @returns {boolean} Current checked state */
  get checked() {
    return this._checked;
  }
  /** @param {boolean} val - New checked state */
  set checked(val) {
    const newVal = Boolean(val);
    if (this._checked !== newVal) {
      this._checked = newVal;
      if (newVal) {
        this.setAttribute("checked", "");
      } else {
        this.removeAttribute("checked");
      }
      this._updateVisualState();
    }
  }
  /** @returns {boolean} Current disabled state */
  get disabled() {
    return this._disabled;
  }
  /** @param {boolean} val - New disabled state */
  set disabled(val) {
    const newVal = Boolean(val);
    if (this._disabled !== newVal) {
      this._disabled = newVal;
      if (newVal) {
        this.setAttribute("disabled", "");
      } else {
        this.removeAttribute("disabled");
      }
      this._updateVisualState();
    }
  }
  /**
   * Render the component's DOM
   * @private
   */
  _render() {
    this.innerHTML = `
            <div class="ts-track" role="switch" aria-checked="false" tabindex="0">
                <div class="ts-thumb"></div>
            </div>
        `;
    this._track = this.querySelector(".ts-track");
    this._checked = this.hasAttribute("checked");
    this._disabled = this.hasAttribute("disabled");
    this._updateVisualState();
  }
  /**
   * Set up event listeners
   * @private
   */
  _setupEventListeners() {
    if (!this._track) return;
    this._track.addEventListener("click", (e) => {
      if (this._disabled) return;
      e.preventDefault();
      e.stopPropagation();
      this._toggle();
    });
    this.addEventListener("click", (e) => {
      if (this._disabled) return;
      if (e.target === this._track || this._track?.contains(e.target)) return;
      e.preventDefault();
      this._toggle();
    });
    this._track.addEventListener("keydown", (e) => {
      if (this._disabled) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        this._toggle();
      }
    });
  }
  /**
   * Toggle the checked state
   * @private
   */
  _toggle() {
    this.checked = !this._checked;
    this.dispatchEvent(new Event("change", { bubbles: true }));
  }
  /**
   * Update the visual state to match the checked property
   * @private
   */
  _updateVisualState() {
    if (!this._track) return;
    if (this._checked) {
      this._track.classList.add("ts-checked");
      this._track.setAttribute("aria-checked", "true");
    } else {
      this._track.classList.remove("ts-checked");
      this._track.setAttribute("aria-checked", "false");
    }
  }
};
if (!customElements.get("toggle-switch")) {
  customElements.define("toggle-switch", ToggleSwitch);
}

// src/components/slider-value/SliderValue.js
var SLIDER_VALUE_STYLES_ID = "hf-slider-value-styles";
if (!document.getElementById(SLIDER_VALUE_STYLES_ID)) {
  const styleEl = document.createElement("style");
  styleEl.id = SLIDER_VALUE_STYLES_ID;
  styleEl.textContent = `
        slider-value {
            display: contents;
        }

        slider-value[disabled] {
            opacity: 0.5;
            pointer-events: none;
        }

        slider-value .slider {
            -webkit-appearance: none;
            appearance: none;
            width: 100%;
            height: 0.5rem;
            background: color-mix(in srgb, var(--hf-accent, #5a7fdd) 15%, transparent 85%);
            border-radius: var(--hf-radius-sm, 0.25rem);
            outline: none;
            cursor: pointer;
            transition: background 0.15s ease;
        }

        slider-value .slider:hover {
            background: color-mix(in srgb, var(--hf-accent, #5a7fdd) 22%, transparent 78%);
        }

        slider-value .slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 0.875rem;
            height: 0.875rem;
            border-radius: 50%;
            background: var(--hf-accent, #5a7fdd);
            cursor: pointer;
            border: 2px solid color-mix(in srgb, var(--hf-accent, #5a7fdd) 100%, var(--hf-text-bright, #fff) 0%);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
            transition: all 0.15s ease;
        }

        slider-value .slider:hover::-webkit-slider-thumb {
            background: color-mix(in srgb, var(--hf-accent, #5a7fdd) 85%, var(--hf-text-bright, #fff) 15%);
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
        }

        slider-value .slider::-moz-range-thumb {
            width: 0.875rem;
            height: 0.875rem;
            border-radius: 50%;
            background: var(--hf-accent, #5a7fdd);
            cursor: pointer;
            border: 2px solid color-mix(in srgb, var(--hf-accent, #5a7fdd) 100%, var(--hf-text-bright, #fff) 0%);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
            transition: all 0.15s ease;
        }

        slider-value .slider:hover::-moz-range-thumb {
            background: color-mix(in srgb, var(--hf-accent, #5a7fdd) 85%, var(--hf-text-bright, #fff) 15%);
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
        }

        slider-value .value-display {
            font-size: var(--hf-size-sm, 0.75rem);
            font-family: var(--hf-font-family-mono, monospace);
            color: var(--hf-text-dim, #8fa8ff);
            text-align: right;
            min-width: 2.5em;
            user-select: none;
            cursor: text;
            outline: none;
            padding: 0.125rem 0.25rem;
            border-radius: var(--hf-radius-sm, 0.25rem);
            transition: background-color 0.15s ease;
            white-space: nowrap;
            overflow: hidden;
            line-height: 1;
        }

        slider-value .value-display:hover {
            background-color: color-mix(in srgb, var(--hf-accent, #5a7fdd) 10%, transparent 90%);
        }

        slider-value .value-display:focus {
            background-color: color-mix(in srgb, var(--hf-accent, #5a7fdd) 20%, transparent 80%);
        }
    `;
  document.head.appendChild(styleEl);
}
var SliderValue = class extends HTMLElement {
  static get observedAttributes() {
    return ["value", "min", "max", "step", "disabled", "name", "type", "format"];
  }
  constructor() {
    super();
    if (this.constructor.formAssociated) {
      this._internals = this.attachInternals?.();
    }
    this._value = 0;
    this._min = 0;
    this._max = 100;
    this._step = 0.01;
    this._type = "float";
    this._format = null;
    this._rendered = false;
    this._listenersAttached = false;
  }
  connectedCallback() {
    if (!this._rendered) {
      this._render();
      this._rendered = true;
    }
    if (!this._listenersAttached) {
      this._setupEventListeners();
      this._listenersAttached = true;
    }
    this._updateSlider();
    this._updateValueDisplay();
    this._updateFormValue();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    switch (name) {
      case "value":
        this._value = parseFloat(newValue) || 0;
        this._updateSlider();
        this._updateValueDisplay();
        this._updateFormValue();
        break;
      case "min":
        this._min = parseFloat(newValue) || 0;
        this._updateSlider();
        break;
      case "max":
        this._max = parseFloat(newValue) || 100;
        this._updateSlider();
        break;
      case "step":
        this._step = parseFloat(newValue) || 0.01;
        this._updateSlider();
        break;
      case "type":
        this._type = newValue === "int" ? "int" : "float";
        this._updateValueDisplay();
        break;
      case "format":
        this._format = newValue || null;
        this._updateValueDisplay();
        break;
      case "disabled":
        this._updateDisabledState();
        break;
    }
  }
  // ========================================================================
  // Public API
  // ========================================================================
  /** @returns {number} Current value */
  get value() {
    return this._value;
  }
  /** @param {number} val - New value */
  set value(val) {
    const numVal = parseFloat(val) || 0;
    if (this._value === numVal) return;
    this._value = numVal;
    this._updateSlider();
    this._updateValueDisplay();
    this._updateFormValue();
  }
  /** @returns {number} Minimum value */
  get min() {
    return this._min;
  }
  /** @param {number} val */
  set min(val) {
    this._min = parseFloat(val) || 0;
    this._updateSlider();
  }
  /** @returns {number} Maximum value */
  get max() {
    return this._max;
  }
  /** @param {number} val */
  set max(val) {
    this._max = parseFloat(val) || 100;
    this._updateSlider();
  }
  /** @returns {number} Step value */
  get step() {
    return this._step;
  }
  /** @param {number} val */
  set step(val) {
    this._step = parseFloat(val) || 0.01;
    this._updateSlider();
  }
  /** @returns {'int'|'float'} Value type */
  get type() {
    return this._type;
  }
  /** @param {'int'|'float'} val */
  set type(val) {
    this._type = val === "int" ? "int" : "float";
    this._updateValueDisplay();
  }
  /** @returns {string|null} Display format */
  get format() {
    return this._format;
  }
  /** @param {string|null} val - Display format ('percent' or null) */
  set format(val) {
    this._format = val || null;
    this._updateValueDisplay();
  }
  get disabled() {
    return this.hasAttribute("disabled");
  }
  set disabled(val) {
    if (val) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }
  get name() {
    return this.getAttribute("name");
  }
  set name(val) {
    if (val) {
      this.setAttribute("name", val);
    } else {
      this.removeAttribute("name");
    }
  }
  // ========================================================================
  // Private Methods
  // ========================================================================
  _render() {
    this.innerHTML = `
            <input type="range" class="slider">
            <span class="value-display" contenteditable="true" spellcheck="false"></span>
        `;
  }
  _setupEventListeners() {
    const slider = this.querySelector(".slider");
    const valueDisplay = this.querySelector(".value-display");
    slider.addEventListener("input", () => {
      const rawValue = parseFloat(slider.value);
      this._value = this._type === "int" ? Math.round(rawValue) : rawValue;
      this._updateValueDisplay();
      this._updateFormValue();
      this._dispatchChange();
    });
    valueDisplay.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        valueDisplay.blur();
      }
    });
    valueDisplay.addEventListener("blur", () => {
      this._processValueDisplayInput();
    });
    valueDisplay.addEventListener("focus", () => {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(valueDisplay);
      selection.removeAllRanges();
      selection.addRange(range);
    });
  }
  _updateSlider() {
    const slider = this.querySelector(".slider");
    if (!slider) return;
    slider.min = this._min;
    slider.max = this._max;
    slider.step = this._step;
    slider.value = this._value;
  }
  _updateValueDisplay() {
    const valueDisplay = this.querySelector(".value-display");
    if (!valueDisplay) return;
    if (this._format === "percent") {
      valueDisplay.textContent = Math.round(this._value * 100) + "%";
      return;
    }
    if (this._type === "int" || this._value === Math.round(this._value)) {
      valueDisplay.textContent = String(Math.round(this._value));
    } else {
      let text = this._value.toFixed(2);
      if (text.length > 5) text = this._value.toFixed(1);
      if (text.length > 5) text = this._value.toFixed(0);
      valueDisplay.textContent = text;
    }
  }
  _processValueDisplayInput() {
    const valueDisplay = this.querySelector(".value-display");
    if (!valueDisplay) return;
    let inputText = valueDisplay.textContent.trim();
    let inputValue;
    if (this._format === "percent") {
      inputText = inputText.replace(/%$/, "");
      inputValue = parseFloat(inputText) / 100;
    } else {
      inputValue = parseFloat(inputText);
    }
    if (isNaN(inputValue)) {
      this._updateValueDisplay();
      return;
    }
    let clampedValue = Math.max(this._min, Math.min(this._max, inputValue));
    const steppedValue = Math.round(clampedValue / this._step) * this._step;
    const finalValue = this._type === "int" ? Math.round(steppedValue) : steppedValue;
    if (this._value !== finalValue) {
      this._value = finalValue;
      this._updateSlider();
      this._updateValueDisplay();
      this._updateFormValue();
      this._dispatchChange();
    } else {
      this._updateValueDisplay();
    }
  }
  _updateDisabledState() {
    const slider = this.querySelector(".slider");
    if (slider) {
      slider.disabled = this.disabled;
    }
  }
  _updateFormValue() {
    if (this._internals) {
      this._internals.setFormValue(String(this._value));
    }
  }
  _dispatchChange() {
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  }
};
__publicField(SliderValue, "formAssociated", true);
customElements.define("slider-value", SliderValue);

// src/components/select-dropdown/SelectDropdown.js
var currentOpenDialog = null;
var SELECT_DROPDOWN_STYLES_ID = "hf-select-dropdown-styles";
if (!document.getElementById(SELECT_DROPDOWN_STYLES_ID)) {
  const style = document.createElement("style");
  style.id = SELECT_DROPDOWN_STYLES_ID;
  style.textContent = `
        select-dropdown {
            display: inline-block;
            position: relative;
            font-family: var(--hf-font-family, Nunito, system-ui, sans-serif);
            min-width: 5em;
        }

        select-dropdown[disabled] {
            opacity: 0.5;
            pointer-events: none;
        }

        /* When dropdown is open, create stacking context above siblings */
        select-dropdown.dropdown-open {
            z-index: 10000;
        }

        /* Trigger button */
        select-dropdown .select-trigger {
            all: unset;
            display: flex;
            align-items: center;
            gap: 6px;
            padding: var(--hf-control-padding, 0.25rem 0.5rem);
            cursor: pointer;
            width: 100%;
            height: var(--hf-control-height, 1.875rem);
            box-sizing: border-box;
            font-size: var(--hf-size-sm, 0.75rem);
            font-family: var(--hf-font-family, Nunito, system-ui, sans-serif);
            color: var(--hf-text-normal, #d9deeb);
            background: var(--hf-bg-elevated, #1b2538);
            border: 1px solid var(--hf-border-subtle);
            border-radius: var(--hf-radius-sm, 0.25rem);
        }

        select-dropdown .trigger-text {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        select-dropdown .trigger-arrow {
            font-size: 0.5rem;
            color: var(--hf-text-dim, #98a7c8);
            flex-shrink: 0;
            margin-left: auto;
            transition: transform 0.15s ease;
        }

        select-dropdown.dropdown-open .trigger-arrow {
            transform: rotate(180deg);
        }

        /* Inline dropdown (< 6 options) */
        select-dropdown .inline-dropdown {
            display: none;
            position: absolute;
            left: 0;
            right: 0;
            z-index: 10000;
            min-width: 100px;
            background: color-mix(
                in srgb,
                var(--hf-bg-surface, #1a1f2e) 95%,
                transparent 5%
            );
            backdrop-filter: var(--hf-glass-blur, blur(12px));
            border: 1px solid color-mix(in srgb, var(--hf-accent, #4a5568) 30%, transparent 70%);
            border-radius: var(--hf-radius-sm, 0.25rem);
            box-shadow: var(--hf-shadow-md, 0 4px 8px rgba(0, 0, 0, 0.2));
            overflow: hidden;
            max-height: 200px;
            overflow-y: auto;
        }

        select-dropdown .inline-dropdown.open {
            display: block;
        }

        select-dropdown .inline-dropdown.position-below {
            top: 100%;
            margin-top: 2px;
        }

        select-dropdown .inline-dropdown.position-above {
            bottom: 100%;
            margin-bottom: 2px;
        }

        select-dropdown .inline-dropdown .group-header {
            padding: 0.375rem 0.5rem 0.2rem;
            font-size: var(--hf-size-sm, 0.75rem);
            font-weight: 700;
            opacity: 0.5;
            letter-spacing: 0.05em;
        }

        select-dropdown .inline-dropdown .option {
            padding: 0.375rem 0.5rem;
            cursor: pointer;
            transition: background 0.1s ease;
            font-size: var(--hf-size-sm, 0.75rem);
            color: var(--hf-text-normal, #d9deeb);
        }

        select-dropdown .inline-dropdown .option:hover,
        select-dropdown .inline-dropdown .option.focused {
            background: color-mix(in srgb, var(--hf-accent, #a5b8ff) 25%, transparent 75%);
        }

        select-dropdown .inline-dropdown .option.selected {
            background: color-mix(in srgb, var(--hf-accent, #a5b8ff) 35%, transparent 65%);
        }

        /* Dialog mode (>= 6 options) */
        select-dropdown .select-dialog {
            background: color-mix(
                in srgb,
                var(--hf-bg-surface, #101522) 92%,
                transparent 8%
            );
            backdrop-filter: var(--hf-glass-blur, blur(20px));
            border: none;
            border-radius: var(--hf-radius, 0.5rem);
            padding: 0;
            color: var(--hf-text-normal, #d9deeb);
            box-shadow: var(--hf-shadow-xl, 0 16px 32px rgba(0, 0, 0, 0.3));
            min-width: 200px;
            max-width: 400px;
            overflow: hidden;
        }

        select-dropdown .select-dialog::backdrop {
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: var(--hf-glass-blur-sm, blur(4px));
        }

        select-dropdown .dialog-titlebar {
            background-color: var(--hf-titlebar-bg, var(--hf-bg-elevated, #262e3f));
            border-bottom: none;
            padding: 0 0.5em;
            min-height: 2.25em;
            height: 2.25em;
            font-size: 0.95rem;
            font-weight: 600;
            color: var(--hf-text-normal, #d9deeb);
            text-transform: lowercase;
            letter-spacing: 0.05em;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 0.5em;
            border-radius: var(--hf-radius, 0.5rem) var(--hf-radius, 0.5rem) 0 0;
        }

        select-dropdown .dialog-title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        select-dropdown .dialog-close {
            background: transparent;
            border: none;
            color: var(--hf-text-dim, #98a7c8);
            cursor: pointer;
            font-size: 0.875rem;
            padding: 0.25em 0.5em;
            line-height: 1;
            opacity: 0.7;
            transition: opacity 0.15s ease;
            margin-left: auto;
        }

        select-dropdown .dialog-close:hover {
            opacity: 1;
            color: var(--hf-text-normal, #d9deeb);
        }

        select-dropdown .dialog-body {
            max-height: 300px;
            overflow: hidden;
            overflow-x: hidden;
            display: flex;
            flex-direction: column;
        }

        select-dropdown .dialog-options {
            outline: none;
            overflow-x: hidden;
            overflow-y: auto;
            flex: 1;
        }

        select-dropdown .dialog-options .option {
            padding: 0.375rem 0.5rem;
            cursor: pointer;
            transition: background 0.1s ease;
            border-bottom: 1px solid color-mix(in srgb, var(--hf-accent, #a5b8ff) 8%, transparent 92%);
            font-size: var(--hf-size-base, 0.875rem);
        }

        select-dropdown .dialog-options .option:last-child {
            border-bottom: none;
        }

        select-dropdown .dialog-options .group-header {
            padding: 0.375rem 0.5rem 0.2rem;
            font-size: var(--hf-size-sm, 0.75rem);
            font-weight: 700;
            opacity: 0.5;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        select-dropdown .dialog-options .option:hover,
        select-dropdown .dialog-options .option.focused {
            background: color-mix(in srgb, var(--hf-accent, #a5b8ff) 20%, transparent 80%);
        }

        select-dropdown .dialog-options .option.selected {
            background: color-mix(in srgb, var(--hf-accent, #a5b8ff) 30%, transparent 70%);
        }

        select-dropdown .empty-message {
            padding: 0.5rem;
            font-size: var(--hf-size-xs, 0.625rem);
            font-style: italic;
            color: var(--hf-text-dim, #98a7c8);
            text-align: center;
        }

        /* Scrollbar styling */
        select-dropdown .inline-dropdown::-webkit-scrollbar,
        select-dropdown .dialog-options::-webkit-scrollbar {
            width: 0.3rem;
        }

        select-dropdown .inline-dropdown::-webkit-scrollbar-track,
        select-dropdown .dialog-options::-webkit-scrollbar-track {
            background: transparent;
        }

        select-dropdown .inline-dropdown::-webkit-scrollbar-thumb,
        select-dropdown .dialog-options::-webkit-scrollbar-thumb {
            background: color-mix(in srgb, var(--hf-accent, #a5b8ff) 30%, transparent 70%);
            border-radius: 0.2rem;
        }

        select-dropdown .inline-dropdown::-webkit-scrollbar-thumb:hover,
        select-dropdown .dialog-options::-webkit-scrollbar-thumb:hover {
            background: color-mix(in srgb, var(--hf-accent, #a5b8ff) 50%, transparent 50%);
        }

        select-dropdown .inline-dropdown,
        select-dropdown .dialog-options {
            scrollbar-width: thin;
            scrollbar-color: color-mix(in srgb, var(--hf-accent, #a5b8ff) 30%, transparent 70%) transparent;
        }
    `;
  document.head.appendChild(style);
}
var SelectDropdown = class extends HTMLElement {
  static get observedAttributes() {
    return ["value", "disabled", "name"];
  }
  constructor() {
    super();
    if (this.constructor.formAssociated) {
      this._internals = this.attachInternals?.();
    }
    this._options = [];
    this._value = "";
    this._isOpen = false;
    this._focusedIndex = -1;
    this._searchString = "";
    this._searchTimeout = null;
    this._lastSearchTime = 0;
    this._rendered = false;
    this._listenersAttached = false;
  }
  connectedCallback() {
    if (this._options.length === 0) {
      this._parseOptionChildren();
    }
    if (!this._rendered) {
      this._render();
      this._rendered = true;
    }
    if (!this._listenersAttached) {
      this._setupEventListeners();
      this._listenersAttached = true;
    }
    if (this._options.length > 0) {
      this._renderDropdown();
    }
    this._updateDisplay();
    this._updateFormValue();
  }
  disconnectedCallback() {
    if (this._searchTimeout) {
      clearTimeout(this._searchTimeout);
    }
    if (this._documentClickHandler) {
      document.removeEventListener("click", this._documentClickHandler);
    }
    this._close();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    switch (name) {
      case "value":
        this._value = newValue || "";
        this._updateDisplay();
        this._updateFormValue();
        break;
      case "disabled":
        this._updateDisabledState();
        break;
    }
  }
  // ========================================================================
  // Public API
  // ========================================================================
  /** @returns {string} Current selected value */
  get value() {
    return this._value;
  }
  /** @param {string} val - Value to select */
  set value(val) {
    const strVal = String(val ?? "");
    if (this._value === strVal) return;
    this._value = strVal;
    this.setAttribute("value", this._value);
    this._updateDisplay();
    this._updateFormValue();
  }
  get disabled() {
    return this.hasAttribute("disabled");
  }
  set disabled(val) {
    if (val) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }
  get name() {
    return this.getAttribute("name");
  }
  set name(val) {
    if (val) {
      this.setAttribute("name", val);
    } else {
      this.removeAttribute("name");
    }
  }
  /** @returns {number} Selected index */
  get selectedIndex() {
    return this._options.findIndex((o) => o.value === this._value);
  }
  /** @param {number} idx - Index to select */
  set selectedIndex(idx) {
    if (idx >= 0 && idx < this._options.length) {
      this.value = this._options[idx].value;
    }
  }
  /**
   * Set the dropdown options
   * @param {Array<{value: string, text: string}>} options
   */
  setOptions(options) {
    this._options = options || [];
    if (this._rendered) {
      this._renderDropdown();
      this._updateDisplay();
    }
  }
  /**
   * Get the dropdown options
   * @returns {Array<{value: string, text: string}>}
   */
  getOptions() {
    return this._options.slice();
  }
  // ========================================================================
  // Private Methods
  // ========================================================================
  /**
   * Parse <option> child elements to populate options array
   * This allows declarative usage: <select-dropdown><option value="a">A</option></select-dropdown>
   * @private
   */
  _parseOptionChildren() {
    const optionElements = this.querySelectorAll("option");
    if (optionElements.length > 0) {
      this._options = Array.from(optionElements).map((opt) => ({
        value: opt.value || opt.textContent.trim(),
        text: opt.textContent.trim()
      }));
      if (!this._value && this._options.length > 0) {
        const valueAttr = this.getAttribute("value");
        if (valueAttr) {
          this._value = valueAttr;
        }
      }
    }
  }
  _render() {
    this.innerHTML = `
            <button class="select-trigger" type="button" aria-haspopup="listbox" aria-expanded="false">
                <span class="trigger-text">Select...</span>
                <span class="trigger-arrow">\u25BC</span>
            </button>
            <div class="inline-dropdown" role="listbox" tabindex="-1"></div>
            <dialog class="select-dialog" aria-label="select option">
                <div class="dialog-titlebar">
                    <span class="dialog-title">select</span>
                    <button class="dialog-close" type="button" aria-label="close">\u2715</button>
                </div>
                <div class="dialog-body">
                    <div class="dialog-options" role="listbox" tabindex="-1"></div>
                </div>
            </dialog>
        `;
  }
  _setupEventListeners() {
    const trigger = this.querySelector(".select-trigger");
    const dialog = this.querySelector(".select-dialog");
    const inlineDropdown = this.querySelector(".inline-dropdown");
    const dialogOptions = this.querySelector(".dialog-options");
    const closeBtn = this.querySelector(".dialog-close");
    if (!trigger || !dialog || !inlineDropdown || !dialogOptions) return;
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      if (this.disabled) return;
      this._toggle();
    });
    inlineDropdown.addEventListener("click", (e) => {
      const option = e.target.closest(".option");
      if (option) {
        this._selectOption(option.dataset.value);
      }
    });
    dialogOptions.addEventListener("click", (e) => {
      const option = e.target.closest(".option");
      if (option) {
        this._selectOption(option.dataset.value);
      }
    });
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this._close());
    }
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) {
        this._close();
      }
    });
    dialog.addEventListener("cancel", (e) => {
      e.preventDefault();
      this._close();
    });
    dialog.addEventListener("close", () => {
      this._onClosed();
    });
    this._documentClickHandler = (e) => {
      if (this._isOpen && this._useInlineMode() && !this.contains(e.target)) {
        this._close();
      }
    };
    document.addEventListener("click", this._documentClickHandler);
    trigger.addEventListener("keydown", (e) => this._handleKeydown(e));
    inlineDropdown.addEventListener("keydown", (e) => this._handleKeydown(e));
    dialog.addEventListener("keydown", (e) => this._handleKeydown(e));
  }
  _useInlineMode() {
    return this._options.length < 60;
  }
  _getOptionsContainer() {
    if (this._useInlineMode()) {
      return this.querySelector(".inline-dropdown");
    } else {
      return this.querySelector(".dialog-options");
    }
  }
  _renderDropdown() {
    const inlineDropdown = this.querySelector(".inline-dropdown");
    const dialogOptions = this.querySelector(".dialog-options");
    [inlineDropdown, dialogOptions].forEach((container) => {
      if (!container) return;
      container.innerHTML = "";
      if (this._options.length === 0) {
        const emptyMsg = document.createElement("div");
        emptyMsg.className = "empty-message";
        emptyMsg.textContent = "no options available";
        container.appendChild(emptyMsg);
        return;
      }
      let lastCategory = null;
      this._options.forEach((opt) => {
        if (opt.category && opt.category !== lastCategory) {
          lastCategory = opt.category;
          const header = document.createElement("div");
          header.className = "group-header";
          header.textContent = opt.category;
          container.appendChild(header);
        }
        const option = document.createElement("div");
        option.className = "option";
        option.dataset.value = opt.value;
        option.setAttribute("role", "option");
        option.textContent = opt.text;
        container.appendChild(option);
      });
    });
    this._updateSelectedOption();
  }
  _updateDisplay() {
    const triggerText = this.querySelector(".trigger-text");
    if (!triggerText) return;
    const selected = this._options.find((o) => o.value === this._value);
    triggerText.textContent = selected ? selected.text : this._value || "Select...";
    this._updateSelectedOption();
  }
  _updateSelectedOption() {
    const containers = [
      this.querySelector(".inline-dropdown"),
      this.querySelector(".dialog-options")
    ];
    containers.forEach((container) => {
      if (!container) return;
      container.querySelectorAll(".option").forEach((option) => {
        option.classList.toggle("selected", option.dataset.value === this._value);
      });
    });
  }
  _handleKeydown(e) {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        if (this._isOpen) {
          if (this._focusedIndex >= 0 && this._focusedIndex < this._options.length) {
            this._selectOption(this._options[this._focusedIndex].value);
          } else {
            this._close();
          }
        } else {
          this._open();
        }
        break;
      case " ":
        e.preventDefault();
        if (!this._isOpen) {
          this._open();
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (this._isOpen) {
          this._moveFocus(1);
        } else {
          this._moveSelection(1);
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (this._isOpen) {
          this._moveFocus(-1);
        } else {
          this._moveSelection(-1);
        }
        break;
      case "Escape":
        this._close();
        break;
      case "Home":
        e.preventDefault();
        if (this._options.length > 0) {
          if (this._isOpen) {
            this._focusedIndex = 0;
            this._updateFocusedOption();
          } else {
            this._selectOption(this._options[0].value);
          }
        }
        break;
      case "End":
        e.preventDefault();
        if (this._options.length > 0) {
          if (this._isOpen) {
            this._focusedIndex = this._options.length - 1;
            this._updateFocusedOption();
          } else {
            this._selectOption(this._options[this._options.length - 1].value);
          }
        }
        break;
      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          this._handleTypeAhead(e.key);
        }
    }
  }
  _toggle() {
    if (this._isOpen) {
      this._close();
    } else {
      this._open();
    }
  }
  _open() {
    const trigger = this.querySelector(".select-trigger");
    if (currentOpenDialog && currentOpenDialog !== this) {
      currentOpenDialog._close();
    }
    currentOpenDialog = this;
    this._isOpen = true;
    this.classList.add("dropdown-open");
    trigger?.setAttribute("aria-expanded", "true");
    const selectedIdx = this._options.findIndex((o) => o.value === this._value);
    this._focusedIndex = selectedIdx >= 0 ? selectedIdx : 0;
    if (this._useInlineMode()) {
      this._openInlineDropdown();
    } else {
      this._openDialog();
    }
  }
  _openInlineDropdown() {
    const inlineDropdown = this.querySelector(".inline-dropdown");
    const trigger = this.querySelector(".select-trigger");
    if (!inlineDropdown || !trigger) return;
    const triggerRect = trigger.getBoundingClientRect();
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    const estimatedHeight = Math.min(this._options.length * 28 + 8, 200);
    inlineDropdown.classList.remove("position-above", "position-below");
    if (spaceBelow < estimatedHeight && spaceAbove > spaceBelow) {
      inlineDropdown.classList.add("position-above");
    } else {
      inlineDropdown.classList.add("position-below");
    }
    inlineDropdown.classList.add("open");
    this._updateFocusedOption();
    inlineDropdown.focus();
    const selected = inlineDropdown.querySelector(".option.selected");
    if (selected) {
      selected.scrollIntoView({ block: "nearest" });
    }
  }
  _openDialog() {
    const dialog = this.querySelector(".select-dialog");
    if (!dialog) return;
    this._updateDialogTitle();
    if (!dialog.open) {
      const openAncestorDialog = this.closest("dialog[open]");
      if (openAncestorDialog) {
        dialog.show();
      } else {
        dialog.showModal();
      }
    }
    this._updateFocusedOption();
    const dialogOptions = this.querySelector(".dialog-options");
    const selected = dialogOptions?.querySelector(".option.selected");
    if (selected) {
      selected.scrollIntoView({ block: "center" });
    }
    dialogOptions?.focus();
  }
  _close() {
    if (this._useInlineMode()) {
      this._closeInlineDropdown();
    } else {
      this._closeDialog();
    }
  }
  _closeInlineDropdown() {
    const inlineDropdown = this.querySelector(".inline-dropdown");
    inlineDropdown?.classList.remove("open");
    this._onClosed();
  }
  _closeDialog() {
    const dialog = this.querySelector(".select-dialog");
    if (dialog?.open) {
      dialog.close();
    } else {
      this._onClosed();
    }
  }
  _onClosed() {
    const trigger = this.querySelector(".select-trigger");
    this._isOpen = false;
    this._focusedIndex = -1;
    this.classList.remove("dropdown-open");
    this._clearFocus();
    if (trigger) {
      trigger.setAttribute("aria-expanded", "false");
      trigger.focus();
    }
    if (currentOpenDialog === this) {
      currentOpenDialog = null;
    }
  }
  _updateDialogTitle() {
    const titleEl = this.querySelector(".dialog-title");
    if (!titleEl) return;
    const controlGroup = this.closest(".control-group");
    const labelEl = controlGroup?.querySelector(".control-label");
    const paramName = labelEl?.textContent?.trim() || "";
    const shaderEffect = this.closest(".shader-effect");
    const effectName = shaderEffect?.dataset?.effectName || "";
    let title = "select";
    if (effectName && paramName) {
      title = `${effectName}: ${paramName}`;
    } else if (effectName) {
      title = effectName;
    } else if (paramName) {
      title = paramName;
    }
    titleEl.textContent = title;
  }
  _selectOption(value) {
    const oldVal = this._value;
    this._value = value;
    this.setAttribute("value", value);
    this._updateDisplay();
    this._updateFormValue();
    this._close();
    if (oldVal !== value) {
      this.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }
  _moveFocus(offset) {
    if (this._options.length === 0) return;
    this._focusedIndex += offset;
    if (this._focusedIndex < 0) {
      this._focusedIndex = this._options.length - 1;
    }
    if (this._focusedIndex >= this._options.length) {
      this._focusedIndex = 0;
    }
    this._updateFocusedOption();
  }
  _moveSelection(offset) {
    if (this._options.length === 0) return;
    let currentIdx = this._options.findIndex((o) => o.value === this._value);
    if (currentIdx === -1) currentIdx = offset > 0 ? -1 : this._options.length;
    let newIdx = currentIdx + offset;
    if (newIdx < 0) newIdx = this._options.length - 1;
    if (newIdx >= this._options.length) newIdx = 0;
    const oldVal = this._value;
    this._value = this._options[newIdx].value;
    this.setAttribute("value", this._value);
    this._updateDisplay();
    this._updateFormValue();
    if (this._isOpen) {
      this._focusedIndex = newIdx;
      this._updateFocusedOption();
    }
    if (oldVal !== this._value) {
      this.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }
  _updateFocusedOption() {
    this._clearFocus();
    if (this._focusedIndex >= 0 && this._focusedIndex < this._options.length) {
      const value = this._options[this._focusedIndex].value;
      const container = this._getOptionsContainer();
      const option = container?.querySelector(`.option[data-value="${CSS.escape(value)}"]`);
      if (option) {
        option.classList.add("focused");
        option.scrollIntoView({ block: "nearest" });
      }
    }
  }
  _clearFocus() {
    const containers = [
      this.querySelector(".inline-dropdown"),
      this.querySelector(".dialog-options")
    ];
    containers.forEach((container) => {
      container?.querySelectorAll(".option.focused").forEach((o) => o.classList.remove("focused"));
    });
  }
  _handleTypeAhead(char) {
    const now = Date.now();
    const timeSinceLastKey = now - this._lastSearchTime;
    this._lastSearchTime = now;
    if (this._searchTimeout) {
      clearTimeout(this._searchTimeout);
    }
    if (timeSinceLastKey > 500) {
      this._searchString = "";
    }
    this._searchString += char.toLowerCase();
    this._searchTimeout = setTimeout(() => {
      this._searchString = "";
    }, 1e3);
    const matches = this._options.map((o, idx) => ({ ...o, idx, lowerText: (o.text || "").toLowerCase() })).filter((o) => o.lowerText.startsWith(this._searchString));
    if (matches.length > 0) {
      const matchIdx = matches[0].idx;
      if (this._isOpen) {
        this._focusedIndex = matchIdx;
        this._updateFocusedOption();
      } else {
        this._selectOption(this._options[matchIdx].value);
      }
    }
  }
  _updateDisabledState() {
    const trigger = this.querySelector(".select-trigger");
    if (trigger) {
      trigger.disabled = this.disabled;
    }
    if (this.disabled) {
      this._close();
    }
  }
  _updateFormValue() {
    if (this._internals) {
      this._internals.setFormValue(this._value);
    }
  }
};
__publicField(SelectDropdown, "formAssociated", true);
customElements.define("select-dropdown", SelectDropdown);

// src/components/color-wheel/ColorWheel.js
var WHEEL_SIZE = 180;
var SLIDER_WIDTH = 24;
var SLIDER_HEIGHT = WHEEL_SIZE;
var THUMB_RADIUS = 8;
var WHEEL_INNER_RADIUS_RATIO = 0.15;
var STEPS = {
  normal: { hue: 1, sat: 1, value: 1, lightness: 1, chroma: 5e-3, ab: 0.01 },
  shift: { hue: 10, sat: 10, value: 10, lightness: 10, chroma: 0.02, ab: 0.04 },
  alt: { hue: 0.1, sat: 0.1, value: 0.1, lightness: 0.1, chroma: 1e-3, ab: 2e-3 }
};
var COLOR_WHEEL_STYLES_ID = "hf-color-wheel-styles";
if (!document.getElementById(COLOR_WHEEL_STYLES_ID)) {
  const styleEl = document.createElement("style");
  styleEl.id = COLOR_WHEEL_STYLES_ID;
  styleEl.textContent = `
        color-wheel {
            display: inline-block;
            font-family: var(--hf-font-family, Nunito, system-ui, sans-serif);
            font-size: var(--hf-size-sm, 0.75rem);
            --cw-bg: var(--hf-bg-surface, #101522);
            --cw-border: color-mix(in srgb, var(--hf-accent, #a5b8ff) 25%, transparent 75%);
            --cw-text: var(--hf-text-normal, #d9deeb);
            --cw-text-dim: var(--hf-text-dim, #98a7c8);
            --cw-accent: var(--hf-accent, #a5b8ff);
            --cw-input-bg: var(--hf-bg-base, #07090d);
            --cw-radius: var(--hf-radius-sm, 4px);
        }

        color-wheel[disabled] {
            opacity: 0.5;
            pointer-events: none;
        }

        color-wheel .color-wheel-container {
            background: var(--cw-bg);
            border: none;
            border-radius: var(--hf-radius, 8px);
            padding: 12px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            width: fit-content;
        }

        color-wheel .wheel-area {
            display: flex;
            gap: 12px;
            align-items: stretch;
        }

        color-wheel .wheel-canvas-container {
            position: relative;
            width: ${WHEEL_SIZE}px;
            height: ${WHEEL_SIZE}px;
        }

        color-wheel .wheel-canvas {
            border-radius: 50%;
            cursor: crosshair;
        }

        color-wheel .wheel-thumb {
            position: absolute;
            width: ${THUMB_RADIUS * 2}px;
            height: ${THUMB_RADIUS * 2}px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 0 0 1px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.3);
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 1;
        }

        color-wheel .slider-container {
            position: relative;
            width: ${SLIDER_WIDTH}px;
            height: ${SLIDER_HEIGHT}px;
        }

        color-wheel .slider-canvas {
            border-radius: var(--cw-radius);
            cursor: ns-resize;
        }

        color-wheel .slider-thumb {
            position: absolute;
            left: -2px;
            width: ${SLIDER_WIDTH + 4}px;
            height: 4px;
            background: white;
            border-radius: var(--hf-radius-sm, 0.25rem);
            box-shadow: 0 0 0 1px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.3);
            pointer-events: none;
            transform: translateY(-50%);
        }

        color-wheel .preview-row {
            display: flex;
            gap: 8px;
            align-items: center;
        }

        color-wheel .preview-swatches {
            display: flex;
            gap: 4px;
        }

        color-wheel .preview-swatch {
            width: 28px;
            height: 28px;
            border-radius: var(--cw-radius);
            border: 1px solid var(--cw-border);
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        color-wheel .preview-swatch::before {
            content: '';
            position: absolute;
            inset: 0;
            background:
                linear-gradient(45deg, #888 25%, transparent 25%),
                linear-gradient(-45deg, #888 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #888 75%),
                linear-gradient(-45deg, transparent 75%, #888 75%);
            background-size: 8px 8px;
            background-position: 0 0, 0 4px, 4px -4px, -4px 0;
            opacity: 0.3;
        }

        color-wheel .preview-swatch-color {
            position: absolute;
            inset: 0;
        }

        color-wheel .preview-current {
            border-width: 2px;
        }

        color-wheel .hex-input-container {
            flex: 1;
        }

        color-wheel .hex-input {
            width: 100%;
            font-family: var(--hf-font-family-mono, monospace);
            font-size: var(--hf-size-sm, 0.75rem);
            font-weight: var(--hf-weight-medium, 500);
            color: var(--cw-text);
            background: var(--cw-input-bg);
            border: 1px solid var(--cw-border);
            border-radius: var(--cw-radius);
            padding: 6px 8px;
            box-sizing: border-box;
            text-transform: lowercase;
        }

        color-wheel .hex-input:focus {
            outline: none;
            border-color: var(--cw-accent);
        }

        color-wheel .alpha-container {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        color-wheel .alpha-slider-container {
            position: relative;
            flex: 1;
            height: 12px;
        }

        color-wheel .alpha-slider-bg {
            position: absolute;
            inset: 0;
            border-radius: var(--cw-radius);
            overflow: hidden;
        }

        color-wheel .alpha-slider-bg::before {
            content: '';
            position: absolute;
            inset: 0;
            background:
                linear-gradient(45deg, #888 25%, transparent 25%),
                linear-gradient(-45deg, #888 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #888 75%),
                linear-gradient(-45deg, transparent 75%, #888 75%);
            background-size: 8px 8px;
            background-position: 0 0, 0 4px, 4px -4px, -4px 0;
            opacity: 0.3;
        }

        color-wheel .alpha-slider-gradient {
            position: absolute;
            inset: 0;
            border-radius: var(--cw-radius);
        }

        color-wheel .alpha-slider-track {
            position: absolute;
            inset: 0;
            cursor: ew-resize;
        }

        color-wheel .alpha-slider-thumb {
            position: absolute;
            top: 50%;
            width: 4px;
            height: 16px;
            background: white;
            border-radius: var(--hf-radius-sm, 0.25rem);
            box-shadow: 0 0 0 1px rgba(0,0,0,0.3);
            pointer-events: none;
            transform: translate(-50%, -50%);
        }

        color-wheel .alpha-value {
            font-family: var(--hf-font-family-mono, monospace);
            font-size: var(--hf-size-xs, 0.625rem);
            color: var(--cw-text-dim);
            width: 32px;
            text-align: right;
        }

        color-wheel .mode-tabs {
            display: flex;
            gap: 0;
            background: var(--cw-input-bg);
            border-radius: var(--cw-radius);
            padding: 2px;
        }

        color-wheel .mode-tab {
            flex: 1;
            padding: 4px 8px;
            font-size: var(--hf-size-xs, 0.625rem);
            font-weight: var(--hf-weight-semibold, 600);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--cw-text-dim);
            background: transparent;
            border: none;
            border-radius: calc(var(--cw-radius) - 1px);
            cursor: pointer;
            transition: color 0.15s, background 0.15s;
        }

        color-wheel .mode-tab:hover {
            color: var(--cw-text);
        }

        color-wheel .mode-tab.active {
            color: var(--cw-text);
            background: var(--cw-bg);
        }

        color-wheel .inputs-panel {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
        }

        color-wheel .inputs-panel[hidden] {
            display: none;
        }

        color-wheel .input-group {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        color-wheel .input-label {
            font-size: 9px;
            font-weight: var(--hf-weight-semibold, 600);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--cw-text-dim);
        }

        color-wheel .input-field {
            font-family: var(--hf-font-family-mono, monospace);
            font-size: var(--hf-size-xs, 0.625rem);
            color: var(--cw-text);
            background: var(--cw-input-bg);
            border: 1px solid var(--cw-border);
            border-radius: var(--cw-radius);
            padding: 4px 6px;
            width: 100%;
            box-sizing: border-box;
            text-align: center;
        }

        color-wheel .input-field:focus {
            outline: none;
            border-color: var(--cw-accent);
        }

        /* Hide number input spinners */
        color-wheel .input-field::-webkit-outer-spin-button,
        color-wheel .input-field::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        color-wheel .input-field[type=number] {
            -moz-appearance: textfield;
        }

        /* Focus ring for accessibility */
        color-wheel .wheel-canvas:focus,
        color-wheel .slider-canvas:focus,
        color-wheel .alpha-slider-track:focus {
            outline: 2px solid var(--cw-accent);
            outline-offset: 2px;
        }

        color-wheel .wheel-canvas:focus {
            border-radius: 50%;
        }
    `;
  document.head.appendChild(styleEl);
}
var ColorWheel = class extends HTMLElement {
  static get observedAttributes() {
    return ["value", "alpha", "mode", "disabled", "required", "name"];
  }
  constructor() {
    super();
    if (this.constructor.formAssociated) {
      this._internals = this.attachInternals?.();
    }
    this._rgb = { r: 0, g: 0, b: 0 };
    this._alpha = 1;
    this._mode = "hsv";
    this._preservedHue = 0;
    this._hsv = { h: 0, s: 0, v: 0 };
    this._oklch = { l: 0, c: 0, h: 0 };
    this._oklab = { l: 0, a: 0, b: 0 };
    this._wheelImageData = null;
    this._wheelCacheKey = "";
    this._sliderImageData = null;
    this._sliderCacheKey = "";
    this._isDraggingWheel = false;
    this._isDraggingSlider = false;
    this._isDraggingAlpha = false;
    this._previousValue = "#000000";
    this._rendered = false;
    this._listenersAttached = false;
  }
  connectedCallback() {
    if (!this._rendered) {
      this._render();
      this._updateFromRGB();
      this._rendered = true;
    }
    if (!this._listenersAttached) {
      this._setupEventListeners();
      this._listenersAttached = true;
    }
    this._updateModeUI();
    this._drawWheel();
    this._drawSlider();
    this._drawAlphaSlider();
    this._updateThumbs();
    this._updateInputs();
    this._updatePreview();
    this._updateFormValue();
  }
  disconnectedCallback() {
  }
  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    switch (name) {
      case "value":
        this._setValueFromAttribute(newVal);
        break;
      case "alpha":
        this._alpha = clamp(parseFloat(newVal) || 1, 0, 1);
        this._updateAlphaUI();
        break;
      case "mode":
        if (["hsv", "oklab", "oklch"].includes(newVal)) {
          this._mode = newVal;
          this._updateModeUI();
        }
        break;
      case "disabled":
        this._updateDisabledState();
        break;
    }
  }
  // ========================================================================
  // Public API
  // ========================================================================
  get value() {
    return rgbToHex(this._rgb);
  }
  set value(val) {
    const rgb = parseHex(val);
    if (rgb) {
      this._rgb = rgb;
      this._updateFromRGB();
      this._redrawAll();
      this._updateFormValue();
    }
  }
  get alpha() {
    return this._alpha;
  }
  set alpha(val) {
    this._alpha = clamp(val, 0, 1);
    this._updateAlphaUI();
  }
  get mode() {
    return this._mode;
  }
  set mode(val) {
    if (["hsv", "oklab", "oklch"].includes(val)) {
      this._mode = val;
      this._updateModeUI();
    }
  }
  get disabled() {
    return this.hasAttribute("disabled");
  }
  set disabled(val) {
    if (val) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }
  get required() {
    return this.hasAttribute("required");
  }
  set required(val) {
    if (val) {
      this.setAttribute("required", "");
    } else {
      this.removeAttribute("required");
    }
  }
  get name() {
    return this.getAttribute("name") || "";
  }
  set name(val) {
    this.setAttribute("name", val);
  }
  get valueWithAlpha() {
    return rgbToHexWithAlpha(this._rgb, this._alpha);
  }
  setColor(opts) {
    if (opts.value) {
      const rgb = parseHex(opts.value);
      if (rgb) {
        this._rgb = rgb;
        this._updateFromRGB();
      }
    }
    if (typeof opts.alpha === "number") {
      this._alpha = clamp(opts.alpha, 0, 1);
    }
    if (opts.mode && ["hsv", "oklab", "oklch"].includes(opts.mode)) {
      this._mode = opts.mode;
    }
    this._redrawAll();
  }
  getColor() {
    return {
      value: this.value,
      alpha: this._alpha,
      rgb: { ...this._rgb },
      hsv: { ...this._hsv },
      oklab: { ...this._oklab },
      oklch: { ...this._oklch }
    };
  }
  // Form associated callbacks
  get form() {
    return this._internals?.form;
  }
  get validity() {
    return this._internals?.validity;
  }
  get validationMessage() {
    return this._internals?.validationMessage;
  }
  get willValidate() {
    return this._internals?.willValidate;
  }
  checkValidity() {
    return this._internals?.checkValidity() ?? true;
  }
  reportValidity() {
    return this._internals?.reportValidity() ?? true;
  }
  // ========================================================================
  // Internal: Value Management
  // ========================================================================
  _setValueFromAttribute(hex) {
    const rgb = parseHex(hex);
    if (rgb) {
      this._rgb = rgb;
      this._updateFromRGB();
      this._redrawAll();
    }
  }
  _updateFromRGB() {
    this._hsv = rgbToHsv(this._rgb);
    if (this._hsv.s > 0 && this._hsv.v > 0) {
      this._preservedHue = this._hsv.h;
    } else {
      this._hsv.h = this._preservedHue;
    }
    this._oklch = rgbToOklch(this._rgb);
    if (this._oklch.c > 1e-3) {
      this._preservedHue = this._oklch.h;
    } else {
      this._oklch.h = this._preservedHue;
    }
    this._oklab = rgbToOklab(this._rgb);
  }
  _updateFromHSV() {
    if (this._hsv.s > 0 && this._hsv.v > 0) {
      this._preservedHue = this._hsv.h;
    }
    this._rgb = hsvToRgb(this._hsv);
    this._oklch = rgbToOklch(this._rgb);
    this._oklab = rgbToOklab(this._rgb);
    if (this._oklch.c < 1e-3) {
      this._oklch.h = this._preservedHue;
    }
  }
  _updateFromOKLCH() {
    if (this._oklch.c > 1e-3) {
      this._preservedHue = this._oklch.h;
    }
    this._rgb = oklchToRgb(this._oklch);
    this._hsv = rgbToHsv(this._rgb);
    this._oklab = rgbToOklab(this._rgb);
    if (this._hsv.s < 1 || this._hsv.v < 1) {
      this._hsv.h = this._preservedHue;
    }
  }
  _updateFromOkLab() {
    this._rgb = oklabToRgb(this._oklab);
    this._hsv = rgbToHsv(this._rgb);
    this._oklch = rgbToOklch(this._rgb);
    if (this._hsv.s < 1 || this._hsv.v < 1) {
      this._hsv.h = this._preservedHue;
    }
    if (this._oklch.c < 1e-3) {
      this._oklch.h = this._preservedHue;
    }
  }
  _updateFormValue() {
    if (this._internals) {
      this._internals.setFormValue(this.value);
    }
  }
  // ========================================================================
  // Internal: Rendering
  // ========================================================================
  _render() {
    this.innerHTML = `
            <div class="color-wheel-container">
                <div class="wheel-area">
                    <div class="wheel-canvas-container">
                        <canvas class="wheel-canvas" width="${WHEEL_SIZE}" height="${WHEEL_SIZE}" tabindex="0" role="slider" aria-label="Color wheel"></canvas>
                        <div class="wheel-thumb"></div>
                    </div>
                    <div class="slider-container">
                        <canvas class="slider-canvas" width="${SLIDER_WIDTH}" height="${SLIDER_HEIGHT}" tabindex="0" role="slider" aria-label="Value slider"></canvas>
                        <div class="slider-thumb"></div>
                    </div>
                </div>

                <div class="preview-row">
                    <div class="preview-swatches">
                        <div class="preview-swatch preview-current" title="Current color">
                            <div class="preview-swatch-color" data-preview="current"></div>
                        </div>
                        <div class="preview-swatch preview-previous" title="Previous color (click to revert)">
                            <div class="preview-swatch-color" data-preview="previous"></div>
                        </div>
                    </div>
                    <div class="hex-input-container">
                        <input type="text" class="hex-input" name="hex-input" placeholder="#000000" maxlength="7" spellcheck="false" autocomplete="off" aria-label="Hex color value">
                    </div>
                </div>

                <div class="alpha-container">
                    <span class="input-label">\u03B1</span>
                    <div class="alpha-slider-container">
                        <div class="alpha-slider-bg"></div>
                        <div class="alpha-slider-gradient"></div>
                        <div class="alpha-slider-track" tabindex="0" role="slider" aria-label="Alpha" aria-valuemin="0" aria-valuemax="100"></div>
                        <div class="alpha-slider-thumb"></div>
                    </div>
                    <span class="alpha-value">100%</span>
                </div>

                <div class="mode-tabs">
                    <button class="mode-tab active" data-mode="hsv">HSV</button>
                    <button class="mode-tab" data-mode="oklab">OkLab</button>
                    <button class="mode-tab" data-mode="oklch">OKLCH</button>
                </div>

                <div class="inputs-panel rgb-panel">
                    <div class="input-group">
                        <span class="input-label">R</span>
                        <input type="number" class="input-field" name="r-input" data-channel="r" min="0" max="255" step="1">
                    </div>
                    <div class="input-group">
                        <span class="input-label">G</span>
                        <input type="number" class="input-field" name="g-input" data-channel="g" min="0" max="255" step="1">
                    </div>
                    <div class="input-group">
                        <span class="input-label">B</span>
                        <input type="number" class="input-field" name="b-input" data-channel="b" min="0" max="255" step="1">
                    </div>
                </div>

                <div class="inputs-panel" data-mode="hsv">
                    <div class="input-group">
                        <span class="input-label">H\xB0</span>
                        <input type="number" class="input-field" name="h-input" data-channel="h" min="0" max="360" step="1">
                    </div>
                    <div class="input-group">
                        <span class="input-label">S%</span>
                        <input type="number" class="input-field" name="s-input" data-channel="s" min="0" max="100" step="1">
                    </div>
                    <div class="input-group">
                        <span class="input-label">V%</span>
                        <input type="number" class="input-field" name="v-input" data-channel="v" min="0" max="100" step="1">
                    </div>
                </div>

                <div class="inputs-panel" data-mode="oklab" hidden>
                    <div class="input-group">
                        <span class="input-label">L%</span>
                        <input type="number" class="input-field" name="lab-l-input" data-channel="lab-l" min="0" max="100" step="0.1">
                    </div>
                    <div class="input-group">
                        <span class="input-label">a</span>
                        <input type="number" class="input-field" name="lab-a-input" data-channel="lab-a" min="-0.4" max="0.4" step="0.005">
                    </div>
                    <div class="input-group">
                        <span class="input-label">b</span>
                        <input type="number" class="input-field" name="lab-b-input" data-channel="lab-b" min="-0.4" max="0.4" step="0.005">
                    </div>
                </div>

                <div class="inputs-panel" data-mode="oklch" hidden>
                    <div class="input-group">
                        <span class="input-label">L%</span>
                        <input type="number" class="input-field" name="lch-l-input" data-channel="lch-l" min="0" max="100" step="0.1">
                    </div>
                    <div class="input-group">
                        <span class="input-label">C</span>
                        <input type="number" class="input-field" name="lch-c-input" data-channel="lch-c" min="0" max="0.4" step="0.005">
                    </div>
                    <div class="input-group">
                        <span class="input-label">H\xB0</span>
                        <input type="number" class="input-field" name="lch-h-input" data-channel="lch-h" min="0" max="360" step="0.1">
                    </div>
                </div>
            </div>
        `;
  }
  _drawWheel() {
    const canvas = this.querySelector(".wheel-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const size = WHEEL_SIZE;
    const center = size / 2;
    const outerRadius = center - 2;
    const innerRadius = outerRadius * WHEEL_INNER_RADIUS_RATIO;
    let cacheKey;
    if (this._mode === "oklch") {
      cacheKey = `oklch-${roundTo(this._oklch.l, 2)}`;
    } else if (this._mode === "oklab") {
      cacheKey = `oklab-${roundTo(this._oklab.l, 2)}`;
    } else {
      cacheKey = `hsv-${roundTo(this._hsv.v, 0)}`;
    }
    if (this._wheelCacheKey === cacheKey && this._wheelImageData) {
      ctx.putImageData(this._wheelImageData, 0, 0);
      return;
    }
    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;
    const aaWidth = 1.5;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dx = x - center;
        const dy = y - center;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const idx = (y * size + x) * 4;
        let alpha = 1;
        if (dist > outerRadius) {
          alpha = clamp(1 - (dist - outerRadius) / aaWidth, 0, 1);
        } else if (dist < innerRadius) {
          alpha = clamp(1 - (innerRadius - dist) / aaWidth, 0, 1);
        }
        if (alpha > 0) {
          let angle = Math.atan2(dy, dx) * (180 / Math.PI);
          if (angle < 0) angle += 360;
          const satRadius = clamp((dist - innerRadius) / (outerRadius - innerRadius), 0, 1);
          let rgb;
          if (this._mode === "oklch") {
            const maxC = getMaxChroma(this._oklch.l, angle);
            const c = satRadius * maxC;
            rgb = oklchToRgb({ l: this._oklch.l, c, h: angle });
          } else if (this._mode === "oklab") {
            const maxAB = getMaxAB(this._oklab.l);
            const a = satRadius * maxAB * Math.cos(angle * Math.PI / 180);
            const b = satRadius * maxAB * Math.sin(angle * Math.PI / 180);
            rgb = oklabToRgb({ l: this._oklab.l, a, b });
          } else {
            rgb = hsvToRgb({ h: angle, s: satRadius * 100, v: this._hsv.v });
          }
          data[idx] = clamp(rgb.r, 0, 255);
          data[idx + 1] = clamp(rgb.g, 0, 255);
          data[idx + 2] = clamp(rgb.b, 0, 255);
          data[idx + 3] = Math.round(alpha * 255);
        } else {
          data[idx + 3] = 0;
        }
      }
    }
    ctx.putImageData(imageData, 0, 0);
    this._wheelImageData = imageData;
    this._wheelCacheKey = cacheKey;
  }
  _drawSlider() {
    const canvas = this.querySelector(".slider-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = SLIDER_WIDTH;
    const height = SLIDER_HEIGHT;
    let cacheKey;
    if (this._mode === "oklch") {
      cacheKey = `oklch-${roundTo(this._oklch.c, 3)}-${roundTo(this._oklch.h, 1)}`;
    } else if (this._mode === "oklab") {
      cacheKey = `oklab-${roundTo(this._oklab.a, 3)}-${roundTo(this._oklab.b, 3)}`;
    } else {
      cacheKey = `hsv-${roundTo(this._hsv.h, 1)}-${roundTo(this._hsv.s, 0)}`;
    }
    if (this._sliderCacheKey === cacheKey && this._sliderImageData) {
      ctx.putImageData(this._sliderImageData, 0, 0);
      return;
    }
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    for (let y = 0; y < height; y++) {
      const t = 1 - y / (height - 1);
      let rgb;
      if (this._mode === "oklch") {
        rgb = oklchToRgb({ l: t, c: this._oklch.c, h: this._oklch.h });
      } else if (this._mode === "oklab") {
        rgb = oklabToRgb({ l: t, a: this._oklab.a, b: this._oklab.b });
      } else {
        rgb = hsvToRgb({ h: this._hsv.h, s: this._hsv.s, v: t * 100 });
      }
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        data[idx] = clamp(rgb.r, 0, 255);
        data[idx + 1] = clamp(rgb.g, 0, 255);
        data[idx + 2] = clamp(rgb.b, 0, 255);
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);
    this._sliderImageData = imageData;
    this._sliderCacheKey = cacheKey;
  }
  _drawAlphaSlider() {
    const gradient = this.querySelector(".alpha-slider-gradient");
    if (!gradient) return;
    const hex = rgbToHex(this._rgb);
    gradient.style.background = `linear-gradient(to right, transparent, ${hex})`;
  }
  _updateThumbs() {
    const wheelThumb = this.querySelector(".wheel-thumb");
    if (wheelThumb) {
      const center = WHEEL_SIZE / 2;
      const outerRadius = center - 2;
      const innerRadius = outerRadius * WHEEL_INNER_RADIUS_RATIO;
      let hue, satNorm;
      if (this._mode === "oklch") {
        hue = this._oklch.h;
        const maxC = getMaxChroma(this._oklch.l, this._oklch.h);
        satNorm = maxC > 0 ? this._oklch.c / maxC : 0;
      } else if (this._mode === "oklab") {
        const maxAB = getMaxAB(this._oklab.l);
        const dist = Math.sqrt(this._oklab.a * this._oklab.a + this._oklab.b * this._oklab.b);
        satNorm = maxAB > 0 ? dist / maxAB : 0;
        hue = Math.atan2(this._oklab.b, this._oklab.a) * (180 / Math.PI);
        if (hue < 0) hue += 360;
      } else {
        hue = this._hsv.h;
        satNorm = this._hsv.s / 100;
      }
      const angleRad = hue * (Math.PI / 180);
      const radius = innerRadius + satNorm * (outerRadius - innerRadius);
      const x = center + radius * Math.cos(angleRad);
      const y = center + radius * Math.sin(angleRad);
      wheelThumb.style.left = `${x}px`;
      wheelThumb.style.top = `${y}px`;
      wheelThumb.style.backgroundColor = rgbToHex(this._rgb);
    }
    const sliderThumb = this.querySelector(".slider-thumb");
    if (sliderThumb) {
      let valueNorm;
      if (this._mode === "oklch") {
        valueNorm = this._oklch.l;
      } else if (this._mode === "oklab") {
        valueNorm = this._oklab.l;
      } else {
        valueNorm = this._hsv.v / 100;
      }
      const y = (1 - valueNorm) * SLIDER_HEIGHT;
      sliderThumb.style.top = `${y}px`;
    }
    const alphaThumb = this.querySelector(".alpha-slider-thumb");
    if (alphaThumb) {
      const container = this.querySelector(".alpha-slider-container");
      const width = container?.offsetWidth || 100;
      alphaThumb.style.left = `${this._alpha * width}px`;
    }
    const alphaTrack = this.querySelector(".alpha-slider-track");
    if (alphaTrack) {
      alphaTrack.setAttribute("aria-valuenow", Math.round(this._alpha * 100));
      alphaTrack.setAttribute("aria-valuetext", `${Math.round(this._alpha * 100)}%`);
    }
  }
  _updateInputs() {
    const rInput = this.querySelector('[data-channel="r"]');
    const gInput = this.querySelector('[data-channel="g"]');
    const bInput = this.querySelector('[data-channel="b"]');
    if (rInput) rInput.value = Math.round(this._rgb.r);
    if (gInput) gInput.value = Math.round(this._rgb.g);
    if (bInput) bInput.value = Math.round(this._rgb.b);
    const hInput = this.querySelector('[data-channel="h"]');
    const sInput = this.querySelector('[data-channel="s"]');
    const vInput = this.querySelector('[data-channel="v"]');
    if (hInput) hInput.value = Math.round(this._hsv.h);
    if (sInput) sInput.value = Math.round(this._hsv.s);
    if (vInput) vInput.value = Math.round(this._hsv.v);
    const labLInput = this.querySelector('[data-channel="lab-l"]');
    const labAInput = this.querySelector('[data-channel="lab-a"]');
    const labBInput = this.querySelector('[data-channel="lab-b"]');
    if (labLInput) labLInput.value = roundTo(this._oklab.l * 100, 1);
    if (labAInput) labAInput.value = roundTo(this._oklab.a, 3);
    if (labBInput) labBInput.value = roundTo(this._oklab.b, 3);
    const lchLInput = this.querySelector('[data-channel="lch-l"]');
    const lchCInput = this.querySelector('[data-channel="lch-c"]');
    const lchHInput = this.querySelector('[data-channel="lch-h"]');
    if (lchLInput) lchLInput.value = roundTo(this._oklch.l * 100, 1);
    if (lchCInput) lchCInput.value = roundTo(this._oklch.c, 3);
    if (lchHInput) lchHInput.value = roundTo(this._oklch.h, 1);
    const hexInput = this.querySelector(".hex-input");
    if (hexInput && document.activeElement !== hexInput) {
      hexInput.value = this.value;
    }
    const alphaValue = this.querySelector(".alpha-value");
    if (alphaValue) {
      alphaValue.textContent = `${Math.round(this._alpha * 100)}%`;
    }
  }
  _updatePreview() {
    const current = this.querySelector('[data-preview="current"]');
    const previous = this.querySelector('[data-preview="previous"]');
    if (current) {
      const hex = this.value;
      current.style.backgroundColor = hex;
      current.style.opacity = this._alpha;
    }
    if (previous) {
      previous.style.backgroundColor = this._previousValue;
    }
  }
  _updateModeUI() {
    const tabs = this.querySelectorAll(".mode-tab");
    tabs.forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.mode === this._mode);
    });
    const panels = this.querySelectorAll(".inputs-panel[data-mode]");
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.mode !== this._mode;
    });
    this._wheelCacheKey = "";
    this._sliderCacheKey = "";
    this._drawWheel();
    this._drawSlider();
    this._updateThumbs();
  }
  _updateAlphaUI() {
    this._drawAlphaSlider();
    this._updateThumbs();
    this._updateInputs();
    this._updatePreview();
  }
  _updateDisabledState() {
    const container = this.querySelector(".color-wheel-container");
    if (container) {
      container.inert = this.disabled;
    }
  }
  _redrawAll() {
    this._drawWheel();
    this._drawSlider();
    this._drawAlphaSlider();
    this._updateThumbs();
    this._updateInputs();
    this._updatePreview();
  }
  // ========================================================================
  // Event Handling
  // ========================================================================
  _setupEventListeners() {
    const wheelCanvas = this.querySelector(".wheel-canvas");
    const sliderCanvas = this.querySelector(".slider-canvas");
    const alphaTrack = this.querySelector(".alpha-slider-track");
    const hexInput = this.querySelector(".hex-input");
    const modeTabs = this.querySelectorAll(".mode-tab");
    const channelInputs = this.querySelectorAll(".input-field");
    const previousSwatch = this.querySelector(".preview-previous");
    if (wheelCanvas) {
      wheelCanvas.addEventListener("pointerdown", (e) => this._onWheelPointerDown(e));
      wheelCanvas.addEventListener("keydown", (e) => this._onWheelKeyDown(e));
    }
    if (sliderCanvas) {
      sliderCanvas.addEventListener("pointerdown", (e) => this._onSliderPointerDown(e));
      sliderCanvas.addEventListener("keydown", (e) => this._onSliderKeyDown(e));
    }
    if (alphaTrack) {
      alphaTrack.addEventListener("pointerdown", (e) => this._onAlphaPointerDown(e));
      alphaTrack.addEventListener("keydown", (e) => this._onAlphaKeyDown(e));
    }
    if (hexInput) {
      hexInput.addEventListener("input", () => this._onHexInput());
      hexInput.addEventListener("change", () => this._onHexChange());
      hexInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          this._onHexChange();
          hexInput.blur();
        }
      });
    }
    modeTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        this._mode = tab.dataset.mode;
        this._updateModeUI();
      });
    });
    channelInputs.forEach((input) => {
      input.addEventListener("input", () => this._onChannelInput(input));
      input.addEventListener("change", () => this._onChannelChange(input));
    });
    if (previousSwatch) {
      previousSwatch.addEventListener("click", () => this._revertToPrevious());
    }
  }
  _onWheelPointerDown(e) {
    if (this.disabled) return;
    this._isDraggingWheel = true;
    this._previousValue = this.value;
    const canvas = e.currentTarget;
    canvas.setPointerCapture(e.pointerId);
    this._updateFromWheelPosition(e);
    this._emitInput();
    const onMove = (e2) => {
      if (!this._isDraggingWheel) return;
      this._updateFromWheelPosition(e2);
      this._emitInput();
    };
    const onUp = () => {
      this._isDraggingWheel = false;
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      this._emitChange();
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
  }
  _updateFromWheelPosition(e) {
    const canvas = this.querySelector(".wheel-canvas");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const center = WHEEL_SIZE / 2;
    const outerRadius = center - 2;
    const innerRadius = outerRadius * WHEEL_INNER_RADIUS_RATIO;
    const dx = x - center;
    const dy = y - center;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    if (angle < 0) angle += 360;
    let dist = Math.sqrt(dx * dx + dy * dy);
    dist = clamp(dist, innerRadius, outerRadius);
    const satNorm = (dist - innerRadius) / (outerRadius - innerRadius);
    if (this._mode === "oklch") {
      this._oklch.h = angle;
      const maxC = getMaxChroma(this._oklch.l, angle);
      this._oklch.c = satNorm * maxC;
      this._updateFromOKLCH();
    } else if (this._mode === "oklab") {
      const maxAB = getMaxAB(this._oklab.l);
      this._oklab.a = satNorm * maxAB * Math.cos(angle * Math.PI / 180);
      this._oklab.b = satNorm * maxAB * Math.sin(angle * Math.PI / 180);
      this._updateFromOkLab();
    } else {
      this._hsv.h = angle;
      this._hsv.s = satNorm * 100;
      this._updateFromHSV();
    }
    this._drawSlider();
    this._updateThumbs();
    this._updateInputs();
    this._updatePreview();
    this._drawAlphaSlider();
    this._updateFormValue();
  }
  _onSliderPointerDown(e) {
    if (this.disabled) return;
    this._isDraggingSlider = true;
    this._previousValue = this.value;
    const canvas = e.currentTarget;
    canvas.setPointerCapture(e.pointerId);
    this._updateFromSliderPosition(e);
    this._emitInput();
    const onMove = (e2) => {
      if (!this._isDraggingSlider) return;
      this._updateFromSliderPosition(e2);
      this._emitInput();
    };
    const onUp = () => {
      this._isDraggingSlider = false;
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      this._emitChange();
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
  }
  _updateFromSliderPosition(e) {
    const canvas = this.querySelector(".slider-canvas");
    const rect = canvas.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const valueNorm = clamp(1 - y / SLIDER_HEIGHT, 0, 1);
    if (this._mode === "oklch") {
      this._oklch.l = valueNorm;
      this._updateFromOKLCH();
    } else if (this._mode === "oklab") {
      this._oklab.l = valueNorm;
      this._updateFromOkLab();
    } else {
      this._hsv.v = valueNorm * 100;
      this._updateFromHSV();
    }
    this._drawWheel();
    this._updateThumbs();
    this._updateInputs();
    this._updatePreview();
    this._drawAlphaSlider();
    this._updateFormValue();
  }
  _onAlphaPointerDown(e) {
    if (this.disabled) return;
    this._isDraggingAlpha = true;
    const track = e.currentTarget;
    track.setPointerCapture(e.pointerId);
    this._updateFromAlphaPosition(e);
    this._emitInput();
    const onMove = (e2) => {
      if (!this._isDraggingAlpha) return;
      this._updateFromAlphaPosition(e2);
      this._emitInput();
    };
    const onUp = () => {
      this._isDraggingAlpha = false;
      track.removeEventListener("pointermove", onMove);
      track.removeEventListener("pointerup", onUp);
      this._emitChange();
    };
    track.addEventListener("pointermove", onMove);
    track.addEventListener("pointerup", onUp);
  }
  _updateFromAlphaPosition(e) {
    const container = this.querySelector(".alpha-slider-container");
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    this._alpha = clamp(x / rect.width, 0, 1);
    this._updateAlphaUI();
  }
  _onHexInput() {
    if (this.disabled) return;
    const input = this.querySelector(".hex-input");
    const rgb = parseHex(input.value);
    if (rgb) {
      this._rgb = rgb;
      this._updateFromRGB();
      this._redrawAll();
      this._emitInput();
    }
  }
  _onHexChange() {
    if (this.disabled) return;
    const input = this.querySelector(".hex-input");
    const rgb = parseHex(input.value);
    if (rgb) {
      this._rgb = rgb;
      this._updateFromRGB();
      this._redrawAll();
      this._updateFormValue();
      this._emitChange();
    } else {
      input.value = this.value;
    }
  }
  _onChannelInput(input) {
    const channel = input.dataset.channel;
    const value = parseFloat(input.value) || 0;
    switch (channel) {
      case "r":
        this._rgb.r = clamp(value, 0, 255);
        this._updateFromRGB();
        break;
      case "g":
        this._rgb.g = clamp(value, 0, 255);
        this._updateFromRGB();
        break;
      case "b":
        this._rgb.b = clamp(value, 0, 255);
        this._updateFromRGB();
        break;
      case "h":
        this._hsv.h = normalizeHue(value);
        this._updateFromHSV();
        break;
      case "s":
        this._hsv.s = clamp(value, 0, 100);
        this._updateFromHSV();
        break;
      case "v":
        this._hsv.v = clamp(value, 0, 100);
        this._updateFromHSV();
        break;
      case "lab-l":
        this._oklab.l = clamp(value / 100, 0, 1);
        this._updateFromOkLab();
        break;
      case "lab-a":
        this._oklab.a = clamp(value, -0.5, 0.5);
        this._updateFromOkLab();
        break;
      case "lab-b":
        this._oklab.b = clamp(value, -0.5, 0.5);
        this._updateFromOkLab();
        break;
      case "lch-l":
        this._oklch.l = clamp(value / 100, 0, 1);
        this._updateFromOKLCH();
        break;
      case "lch-c":
        this._oklch.c = clamp(value, 0, 0.5);
        this._updateFromOKLCH();
        break;
      case "lch-h":
        this._oklch.h = normalizeHue(value);
        this._updateFromOKLCH();
        break;
    }
    this._redrawAll();
    this._emitInput();
  }
  _onChannelChange(input) {
    this._onChannelInput(input);
    this._updateFormValue();
    this._emitChange();
  }
  _revertToPrevious() {
    const rgb = parseHex(this._previousValue);
    if (rgb) {
      this._rgb = rgb;
      this._updateFromRGB();
      this._redrawAll();
      this._updateFormValue();
      this._emitChange();
    }
  }
  // Keyboard handlers
  _onWheelKeyDown(e) {
    const steps = e.shiftKey ? STEPS.shift : e.altKey ? STEPS.alt : STEPS.normal;
    let handled = false;
    switch (e.key) {
      case "ArrowLeft":
        if (this._mode === "oklch") {
          this._oklch.h = normalizeHue(this._oklch.h - steps.hue);
          this._updateFromOKLCH();
        } else if (this._mode === "oklab") {
          const dist = Math.sqrt(this._oklab.a ** 2 + this._oklab.b ** 2);
          const angle = Math.atan2(this._oklab.b, this._oklab.a) - steps.hue * Math.PI / 180;
          this._oklab.a = dist * Math.cos(angle);
          this._oklab.b = dist * Math.sin(angle);
          this._updateFromOkLab();
        } else {
          this._hsv.h = normalizeHue(this._hsv.h - steps.hue);
          this._updateFromHSV();
        }
        handled = true;
        break;
      case "ArrowRight":
        if (this._mode === "oklch") {
          this._oklch.h = normalizeHue(this._oklch.h + steps.hue);
          this._updateFromOKLCH();
        } else if (this._mode === "oklab") {
          const dist = Math.sqrt(this._oklab.a ** 2 + this._oklab.b ** 2);
          const angle = Math.atan2(this._oklab.b, this._oklab.a) + steps.hue * Math.PI / 180;
          this._oklab.a = dist * Math.cos(angle);
          this._oklab.b = dist * Math.sin(angle);
          this._updateFromOkLab();
        } else {
          this._hsv.h = normalizeHue(this._hsv.h + steps.hue);
          this._updateFromHSV();
        }
        handled = true;
        break;
      case "ArrowUp":
        if (this._mode === "oklch") {
          this._oklch.c = clamp(this._oklch.c + steps.chroma, 0, 0.5);
          this._updateFromOKLCH();
        } else if (this._mode === "oklab") {
          const dist = Math.sqrt(this._oklab.a ** 2 + this._oklab.b ** 2);
          const angle = Math.atan2(this._oklab.b, this._oklab.a);
          const newDist = clamp(dist + steps.ab, 0, 0.5);
          this._oklab.a = newDist * Math.cos(angle);
          this._oklab.b = newDist * Math.sin(angle);
          this._updateFromOkLab();
        } else {
          this._hsv.s = clamp(this._hsv.s + steps.sat, 0, 100);
          this._updateFromHSV();
        }
        handled = true;
        break;
      case "ArrowDown":
        if (this._mode === "oklch") {
          this._oklch.c = clamp(this._oklch.c - steps.chroma, 0, 0.5);
          this._updateFromOKLCH();
        } else if (this._mode === "oklab") {
          const dist = Math.sqrt(this._oklab.a ** 2 + this._oklab.b ** 2);
          const angle = Math.atan2(this._oklab.b, this._oklab.a);
          const newDist = clamp(dist - steps.ab, 0, 0.5);
          this._oklab.a = newDist * Math.cos(angle);
          this._oklab.b = newDist * Math.sin(angle);
          this._updateFromOkLab();
        } else {
          this._hsv.s = clamp(this._hsv.s - steps.sat, 0, 100);
          this._updateFromHSV();
        }
        handled = true;
        break;
    }
    if (handled) {
      e.preventDefault();
      this._redrawAll();
      this._updateFormValue();
      this._emitInput();
    }
  }
  _onSliderKeyDown(e) {
    const steps = e.shiftKey ? STEPS.shift : e.altKey ? STEPS.alt : STEPS.normal;
    let handled = false;
    switch (e.key) {
      case "ArrowUp":
        if (this._mode === "oklch") {
          this._oklch.l = clamp(this._oklch.l + steps.lightness / 100, 0, 1);
          this._updateFromOKLCH();
        } else if (this._mode === "oklab") {
          this._oklab.l = clamp(this._oklab.l + steps.lightness / 100, 0, 1);
          this._updateFromOkLab();
        } else {
          this._hsv.v = clamp(this._hsv.v + steps.value, 0, 100);
          this._updateFromHSV();
        }
        handled = true;
        break;
      case "ArrowDown":
        if (this._mode === "oklch") {
          this._oklch.l = clamp(this._oklch.l - steps.lightness / 100, 0, 1);
          this._updateFromOKLCH();
        } else if (this._mode === "oklab") {
          this._oklab.l = clamp(this._oklab.l - steps.lightness / 100, 0, 1);
          this._updateFromOkLab();
        } else {
          this._hsv.v = clamp(this._hsv.v - steps.value, 0, 100);
          this._updateFromHSV();
        }
        handled = true;
        break;
    }
    if (handled) {
      e.preventDefault();
      this._redrawAll();
      this._updateFormValue();
      this._emitInput();
    }
  }
  _onAlphaKeyDown(e) {
    const step = e.shiftKey ? 0.1 : e.altKey ? 0.01 : 0.05;
    let handled = false;
    switch (e.key) {
      case "ArrowLeft":
        this._alpha = clamp(this._alpha - step, 0, 1);
        handled = true;
        break;
      case "ArrowRight":
        this._alpha = clamp(this._alpha + step, 0, 1);
        handled = true;
        break;
    }
    if (handled) {
      e.preventDefault();
      this._updateAlphaUI();
      this._emitInput();
    }
  }
  _emitInput() {
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent("colorinput", {
      bubbles: true,
      composed: true,
      detail: this.getColor()
    }));
  }
  _emitChange() {
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  }
};
__publicField(ColorWheel, "formAssociated", true);
customElements.define("color-wheel", ColorWheel);

// src/components/color-picker/ColorPicker.js
var COLOR_PICKER_STYLES_ID = "hf-color-picker-styles";
if (!document.getElementById(COLOR_PICKER_STYLES_ID)) {
  const styleEl = document.createElement("style");
  styleEl.id = COLOR_PICKER_STYLES_ID;
  styleEl.textContent = `
        color-picker {
            all: unset;
            display: block;
            font-family: inherit;
        }

        color-picker[disabled] {
            opacity: 0.5;
            pointer-events: none;
        }

        color-picker .swatch-button {
            all: unset;
            display: flex;
            align-items: center;
            gap: 6px;
            padding: var(--hf-control-padding, 0.25rem 0.5rem);
            cursor: pointer;
            width: 100%;
            height: var(--hf-control-height, 1.875rem);
            box-sizing: border-box;
            font-size: var(--hf-size-sm, 0.75rem);
            color: var(--hf-text-normal, #d9deeb);
            background: var(--hf-bg-elevated, #1b2538);
            border-radius: var(--hf-radius-sm, 0.25rem);
            border: 1px solid var(--hf-border-subtle);
        }

        color-picker .swatch {
            width: 18px;
            height: 18px;
            flex-shrink: 0;
        }

        color-picker .hex-display {
            font-size: 0.62rem;
            color: var(--hf-text-normal, #d9deeb);
            font-family: var(--hf-font-family-mono, monospace);
        }

        color-picker .dropdown-arrow {
            font-size: 0.6rem;
            color: var(--hf-text-dim, #98a7c8);
            flex-shrink: 0;
            margin-left: auto;
            transition: transform 0.15s ease;
        }

        color-picker.dialog-open .dropdown-arrow {
            transform: rotate(180deg);
        }

        /* Dialog styles */
        color-picker .color-dialog {
            background: color-mix(
                in srgb,
                var(--hf-bg-surface, #1a1e2e) var(--hf-surface-opacity, 85%),
                transparent var(--hf-surface-transparency, 15%)
            );
            backdrop-filter: var(--hf-glass-blur, blur(12px));
            border: none;
            border-radius: var(--hf-radius, 8px);
            padding: 0;
            color: var(--hf-text-normal, #d9deeb);
            box-shadow: var(--hf-shadow-xl, 0 16px 32px rgba(0, 0, 0, 0.3));
            overflow: hidden;
        }

        color-picker .color-dialog::backdrop {
            background: var(--hf-backdrop, rgba(0, 0, 0, 0.6));
            backdrop-filter: var(--hf-glass-blur-sm, blur(4px));
        }

        color-picker .dialog-titlebar {
            background-color: var(--hf-titlebar-bg, var(--hf-bg-elevated, #262e3f));
            border-bottom: none;
            padding: 0 0.5em;
            min-height: 1.75rem;
            height: 1.75rem;
            font-size: 0.95rem;
            font-weight: 600;
            color: var(--hf-text-normal, #d9deeb);
            text-transform: lowercase;
            letter-spacing: 0.05em;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 0.5em;
            border-radius: var(--hf-radius, 8px) var(--hf-radius, 8px) 0 0;
        }

        color-picker .dialog-title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        color-picker .dialog-close {
            background: transparent;
            border: none;
            color: var(--hf-text-dim, #98a7c8);
            cursor: pointer;
            font-size: 0.875rem;
            padding: 0.25em 0.5em;
            line-height: 1;
            opacity: 0.7;
            transition: opacity 0.15s ease;
            margin-left: auto;
        }

        color-picker .dialog-close:hover {
            opacity: 1;
            color: var(--hf-text-normal, #d9deeb);
        }

        color-picker .dialog-body {
            padding: 0;
        }

        color-picker color-wheel {
            display: block;
        }
    `;
  document.head.appendChild(styleEl);
}
var ColorPicker = class extends HTMLElement {
  static get observedAttributes() {
    return ["value", "disabled", "name", "color-mode"];
  }
  constructor() {
    super();
    if (this.constructor.formAssociated) {
      this._internals = this.attachInternals?.();
    }
    this._value = "#000000";
    this._colorMode = "rgb";
    this._isOpen = false;
    this._rendered = false;
    this._listenersAttached = false;
  }
  connectedCallback() {
    if (!this._rendered) {
      this._render();
      this._rendered = true;
    }
    if (!this._listenersAttached) {
      this._setupEventListeners();
      this._listenersAttached = true;
    }
    this._updateSwatch();
    this._updateFormValue();
  }
  disconnectedCallback() {
    this._closeDialog();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    switch (name) {
      case "value":
        this._setValueFromAttribute(newValue);
        break;
      case "disabled":
        this._updateDisabledState();
        break;
      case "color-mode":
        this._colorMode = newValue || "rgb";
        this._updateSwatch();
        break;
    }
  }
  // ========================================================================
  // Public API
  // ========================================================================
  get value() {
    return this._value;
  }
  set value(val) {
    let rgb;
    if (typeof val === "string") {
      rgb = parseHex(val);
    } else if (Array.isArray(val) && val.length >= 3) {
      rgb = { r: val[0] * 255, g: val[1] * 255, b: val[2] * 255 };
    }
    if (rgb) {
      this._value = rgbToHex(rgb);
      this._updateSwatch();
      this._updateFormValue();
      const colorWheel = this.querySelector("color-wheel");
      if (colorWheel) {
        colorWheel.value = this._value;
      }
    }
  }
  get disabled() {
    return this.hasAttribute("disabled");
  }
  set disabled(val) {
    if (val) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }
  get name() {
    return this.getAttribute("name");
  }
  set name(val) {
    if (val) {
      this.setAttribute("name", val);
    } else {
      this.removeAttribute("name");
    }
  }
  get colorMode() {
    return this._colorMode;
  }
  set colorMode(val) {
    const mode = val || "rgb";
    if (mode === this._colorMode) return;
    this._colorMode = mode;
    this.setAttribute("color-mode", mode);
    this._updateSwatch();
  }
  // ========================================================================
  // Private Methods
  // ========================================================================
  _render() {
    this.innerHTML = `
            <button class="swatch-button" type="button" aria-haspopup="dialog" aria-expanded="false">
                <span class="swatch"></span>
                <span class="hex-display"></span>
                <span class="dropdown-arrow">\u25BC</span>
            </button>
            <dialog class="color-dialog" aria-label="Color picker">
                <div class="dialog-titlebar">
                    <span class="dialog-title">color</span>
                    <button class="dialog-close" type="button" aria-label="close">\u2715</button>
                </div>
                <div class="dialog-body">
                    <color-wheel mode="hsv"></color-wheel>
                </div>
            </dialog>
        `;
  }
  _setupEventListeners() {
    const button = this.querySelector(".swatch-button");
    const dialog = this.querySelector(".color-dialog");
    const closeBtn = this.querySelector(".dialog-close");
    const colorWheel = this.querySelector("color-wheel");
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      if (this.disabled) return;
      this._toggleDialog();
    });
    button.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this._toggleDialog();
      }
    });
    closeBtn.addEventListener("click", () => {
      this._closeDialog();
    });
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) {
        this._closeDialog();
      }
    });
    dialog.addEventListener("cancel", (e) => {
      e.preventDefault();
      this._closeDialog();
    });
    dialog.addEventListener("close", () => {
      this._onDialogClosed();
    });
    colorWheel.addEventListener("input", () => {
      this._value = colorWheel.value;
      this._updateSwatch();
      this._updateFormValue();
      this._emitInput();
    });
    colorWheel.addEventListener("change", () => {
      this._value = colorWheel.value;
      this._updateSwatch();
      this._updateFormValue();
      this._emitChange();
    });
  }
  _toggleDialog() {
    if (this._isOpen) {
      this._closeDialog();
    } else {
      this._openDialog();
    }
  }
  _openDialog() {
    const dialog = this.querySelector(".color-dialog");
    const button = this.querySelector(".swatch-button");
    const colorWheel = this.querySelector("color-wheel");
    colorWheel.value = this._value;
    colorWheel.mode = this._colorMode === "rgb" ? "hsv" : this._colorMode;
    dialog.showModal();
    button.setAttribute("aria-expanded", "true");
    this.classList.add("dialog-open");
    this._isOpen = true;
  }
  _closeDialog() {
    const dialog = this.querySelector(".color-dialog");
    if (dialog?.open) {
      dialog.close();
    } else {
      this._onDialogClosed();
    }
  }
  _onDialogClosed() {
    const button = this.querySelector(".swatch-button");
    if (button) button.setAttribute("aria-expanded", "false");
    this.classList.remove("dialog-open");
    this._isOpen = false;
  }
  _updateSwatch() {
    const swatch = this.querySelector(".swatch");
    const hexDisplay = this.querySelector(".hex-display");
    if (swatch) {
      swatch.style.backgroundColor = this._value;
    }
    if (hexDisplay) {
      hexDisplay.textContent = this._formatDisplay();
    }
  }
  _formatDisplay() {
    if (this._colorMode === "rgb") return this._value;
    const rgb = parseHex(this._value);
    if (!rgb) return this._value;
    if (this._colorMode === "hsv") {
      const { h, s, v } = rgbToHsv(rgb);
      return `${Math.round(h)}\xB0 ${Math.round(s)}% ${Math.round(v)}%`;
    }
    if (this._colorMode === "oklab") {
      const { l, a, b } = rgbToOklab(rgb);
      return `${l.toFixed(2)} ${a.toFixed(2)} ${b.toFixed(2)}`;
    }
    if (this._colorMode === "oklch") {
      const { l, c, h } = rgbToOklch(rgb);
      return `${l.toFixed(2)} ${c.toFixed(2)} ${Math.round(h)}\xB0`;
    }
    return this._value;
  }
  _updateDisabledState() {
    const button = this.querySelector(".swatch-button");
    if (button) {
      button.disabled = this.disabled;
    }
    if (this.disabled) {
      this._closeDialog();
    }
  }
  _setValueFromAttribute(hex) {
    const rgb = parseHex(hex);
    if (rgb) {
      this._value = rgbToHex(rgb);
      this._updateSwatch();
      this._updateFormValue();
    }
  }
  _updateFormValue() {
    if (this._internals) {
      this._internals.setFormValue(this._value);
    }
  }
  _emitInput() {
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
  }
  _emitChange() {
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  }
};
__publicField(ColorPicker, "formAssociated", true);
customElements.define("color-picker", ColorPicker);

// src/components/justify-button-group/JustifyButtonGroup.js
var JUSTIFY_BUTTON_GROUP_STYLES_ID = "hf-justify-button-group-styles";
if (!document.getElementById(JUSTIFY_BUTTON_GROUP_STYLES_ID)) {
  const styleEl = document.createElement("style");
  styleEl.id = JUSTIFY_BUTTON_GROUP_STYLES_ID;
  styleEl.textContent = `
        justify-button-group {
            display: inline-block;
        }

        justify-button-group .button-group {
            display: inline-flex;
            border-radius: var(--hf-radius-sm, 0.25rem);
            overflow: hidden;
            background: var(--hf-bg-surface, #333);
            border: 1px solid var(--hf-bg-elevated, #444);
        }

        justify-button-group .justify-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1.25rem;
            height: 1.25rem;
            padding: 0;
            border: none;
            background: transparent;
            color: var(--hf-text-dim, #888);
            cursor: pointer;
            transition: background 0.15s, color 0.15s;
        }

        justify-button-group .justify-btn:hover:not(:disabled):not(.selected) {
            background: var(--hf-bg-elevated, #444);
            color: var(--hf-text-normal, #ccc);
        }

        justify-button-group .justify-btn.selected {
            background: var(--hf-accent, #0066cc);
            color: var(--hf-bg-base, #000);
        }

        justify-button-group .material-symbols {
            color: inherit;
        }

        justify-button-group .justify-btn:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }

        /* Remove internal borders, only outer group has border-radius */
        justify-button-group .justify-btn:not(:last-child) {
            border-right: 1px solid var(--hf-bg-elevated, #444);
        }

        justify-button-group .material-symbols {
            font-family: 'Material Symbols Outlined';
            font-weight: normal;
            font-style: normal;
            font-size: var(--hf-size-base, 0.875rem);
            line-height: 1;
            letter-spacing: normal;
            text-transform: none;
            display: inline-block;
            white-space: nowrap;
            word-wrap: normal;
            direction: ltr;
            -webkit-font-feature-settings: 'liga';
            font-feature-settings: 'liga';
            -webkit-font-smoothing: antialiased;
        }
    `;
  document.head.appendChild(styleEl);
}
var JustifyButtonGroup = class extends HTMLElement {
  static get observedAttributes() {
    return ["value", "disabled", "name"];
  }
  constructor() {
    super();
    if (this.constructor.formAssociated) {
      this._internals = this.attachInternals?.();
    }
    this._value = "center";
    this._rendered = false;
    this._listenersAttached = false;
  }
  connectedCallback() {
    if (!this._rendered) {
      this._render();
      this._rendered = true;
    }
    if (!this._listenersAttached) {
      this._setupEventListeners();
      this._listenersAttached = true;
    }
    this._updateSelection();
    this._updateFormValue();
  }
  disconnectedCallback() {
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    switch (name) {
      case "value":
        this._value = newValue || "center";
        this._updateSelection();
        this._updateFormValue();
        break;
      case "disabled":
        this._updateDisabledState();
        break;
    }
  }
  // ========================================================================
  // Public API
  // ========================================================================
  /** @returns {'left'|'center'|'right'} Current value */
  get value() {
    return this._value;
  }
  /** @param {'left'|'center'|'right'} val */
  set value(val) {
    if (val === this._value) return;
    if (!["left", "center", "right"].includes(val)) return;
    this._value = val;
    this._updateSelection();
    this._updateFormValue();
  }
  /** @returns {string} */
  get name() {
    return this.getAttribute("name") || "";
  }
  /** @param {string} val */
  set name(val) {
    this.setAttribute("name", val);
  }
  /** @returns {boolean} */
  get disabled() {
    return this.hasAttribute("disabled");
  }
  /** @param {boolean} val */
  set disabled(val) {
    if (val) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }
  // ========================================================================
  // Private Methods
  // ========================================================================
  _render() {
    this.innerHTML = `
            <div class="button-group">
                <button type="button" class="justify-btn" data-value="left" title="Align left">
                    <span class="material-symbols">format_align_left</span>
                </button>
                <button type="button" class="justify-btn" data-value="center" title="Align center">
                    <span class="material-symbols">format_align_center</span>
                </button>
                <button type="button" class="justify-btn" data-value="right" title="Align right">
                    <span class="material-symbols">format_align_right</span>
                </button>
            </div>
        `;
  }
  _setupEventListeners() {
    const buttons = this.querySelectorAll(".justify-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (this.disabled) return;
        const newValue = btn.dataset.value;
        if (newValue !== this._value) {
          this._value = newValue;
          this._updateSelection();
          this._updateFormValue();
          this.dispatchEvent(new Event("change", { bubbles: true }));
          this.dispatchEvent(new CustomEvent("input", {
            bubbles: true,
            detail: { value: this._value }
          }));
        }
      });
    });
  }
  _updateSelection() {
    const buttons = this.querySelectorAll(".justify-btn");
    buttons.forEach((btn) => {
      btn.classList.toggle("selected", btn.dataset.value === this._value);
    });
  }
  _updateDisabledState() {
    const buttons = this.querySelectorAll(".justify-btn");
    const isDisabled = this.disabled;
    buttons.forEach((btn) => {
      btn.disabled = isDisabled;
    });
  }
  _updateFormValue() {
    if (this._internals) {
      this._internals.setFormValue(this._value);
    }
  }
};
__publicField(JustifyButtonGroup, "formAssociated", true);
if (!customElements.get("justify-button-group")) {
  customElements.define("justify-button-group", JustifyButtonGroup);
}

// src/components/toast/Toast.js
var STYLES_ID = "hf-toast-styles";
if (!document.getElementById(STYLES_ID)) {
  const style = document.createElement("style");
  style.id = STYLES_ID;
  style.textContent = `
        .hf-toast-container {
            position: fixed;
            bottom: 1rem;
            right: 1rem;
            display: flex;
            flex-direction: column-reverse;
            gap: 0.5rem;
            z-index: 10000;
            pointer-events: none;
        }

        .hf-toast {
            display: flex;
            align-items: flex-start;
            gap: 0.75em;
            padding: 0.75em 1em;
            min-width: 240px;
            max-width: 400px;
            background: color-mix(
                in srgb,
                var(--hf-bg-surface, #1a1e2e) 95%,
                transparent 5%
            );
            backdrop-filter: var(--hf-glass-blur, blur(12px));
            border: 1px solid var(--hf-bg-elevated);
            border-radius: var(--hf-radius-sm, 4px);
            box-shadow: var(--hf-shadow-md, 0 4px 8px rgba(0, 0, 0, 0.2));
            color: var(--hf-text-normal);
            font-size: 0.875rem;
            pointer-events: auto;
            opacity: 0;
            transform: translateX(100%);
            transition: opacity 0.2s ease, transform 0.2s ease;
            margin: 2px;
        }

        .hf-toast.show {
            opacity: 1;
            transform: translateX(0);
        }

        .hf-toast.hide {
            opacity: 0;
            transform: translateX(100%);
        }

        .hf-toast-icon {
            flex-shrink: 0;
            font-size: 1.125rem;
            line-height: 1;
        }

        .hf-toast-content {
            flex: 1;
            min-width: 0;
        }

        .hf-toast-message {
            margin: 0;
            line-height: 1.4;
            word-wrap: break-word;
        }

        .hf-toast-close {
            flex-shrink: 0;
            background: none;
            border: none;
            color: var(--hf-text-dim);
            cursor: pointer;
            font-size: var(--hf-size-md, 1rem);
            line-height: 1;
            padding: 0;
            opacity: 0.6;
            transition: opacity 0.15s ease;
        }

        .hf-toast-close:hover {
            opacity: 1;
        }

        /* Toast types */
        .hf-toast.hf-toast-success {
            border-color: color-mix(in srgb, var(--hf-green, #58db63) 30%, transparent 70%);
        }
        .hf-toast.hf-toast-success .hf-toast-icon {
            color: var(--hf-green, #58db63);
        }

        .hf-toast.hf-toast-error {
            border-color: color-mix(in srgb, var(--hf-red, #ff5b6b) 30%, transparent 70%);
        }
        .hf-toast.hf-toast-error .hf-toast-icon {
            color: var(--hf-red, #ff5b6b);
        }

        .hf-toast.hf-toast-warning {
            border-color: color-mix(in srgb, var(--hf-yellow, #ffd66b) 30%, transparent 70%);
        }
        .hf-toast.hf-toast-warning .hf-toast-icon {
            color: var(--hf-yellow, #ffd66b);
        }

        .hf-toast.hf-toast-info {
            border-color: color-mix(in srgb, var(--hf-accent, #a5b8ff) 30%, transparent 70%);
        }
        .hf-toast.hf-toast-info .hf-toast-icon {
            color: var(--hf-accent, #a5b8ff);
        }

        /* Progress bar for auto-dismiss */
        .hf-toast-progress {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: var(--hf-bg-muted);
            border-radius: 0 0 var(--hf-radius, 8px) var(--hf-radius, 8px);
            overflow: hidden;
        }

        .hf-toast-progress-bar {
            height: 100%;
            background: var(--hf-accent);
            transition: width linear;
        }

        .hf-toast.hf-toast-success .hf-toast-progress-bar {
            background: var(--hf-green, #58db63);
        }

        .hf-toast.hf-toast-error .hf-toast-progress-bar {
            background: var(--hf-red, #ff5b6b);
        }

        .hf-toast.hf-toast-warning .hf-toast-progress-bar {
            background: var(--hf-yellow, #ffd66b);
        }
    `;
  document.head.appendChild(style);
}
var ICONS = {
  success: "\u2713",
  error: "\u2715",
  warning: "\u26A0",
  info: "\u2139"
};
function getContainer() {
  let container = document.querySelector(".hf-toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "hf-toast-container";
    document.body.appendChild(container);
  }
  return container;
}
function showToast(message, options = {}) {
  const {
    type = "info",
    duration = 2e3,
    dismissible = true,
    showProgress = false
  } = options;
  const container = getContainer();
  const toast = document.createElement("div");
  toast.className = `hf-toast hf-toast-${type}`;
  toast.setAttribute("role", "alert");
  toast.setAttribute("aria-live", "polite");
  const icon = ICONS[type] || ICONS.info;
  toast.innerHTML = `
        <span class="hf-toast-icon" aria-hidden="true">${icon}</span>
        <div class="hf-toast-content">
            <p class="hf-toast-message">${message}</p>
        </div>
        ${dismissible ? '<button class="hf-toast-close" aria-label="Dismiss">\u2715</button>' : ""}
        ${duration > 0 && showProgress ? `
            <div class="hf-toast-progress">
                <div class="hf-toast-progress-bar" style="width: 100%"></div>
            </div>
        ` : ""}
    `;
  container.appendChild(toast);
  let dismissTimeout = null;
  let progressBar = toast.querySelector(".hf-toast-progress-bar");
  const dismiss = () => {
    if (dismissTimeout) {
      clearTimeout(dismissTimeout);
      dismissTimeout = null;
    }
    toast.classList.add("hide");
    toast.addEventListener("transitionend", () => {
      toast.remove();
    }, { once: true });
  };
  requestAnimationFrame(() => {
    toast.classList.add("show");
    if (duration > 0 && progressBar) {
      progressBar.style.transitionDuration = `${duration}ms`;
      requestAnimationFrame(() => {
        progressBar.style.width = "0%";
      });
    }
  });
  if (dismissible) {
    const closeBtn = toast.querySelector(".hf-toast-close");
    closeBtn.addEventListener("click", dismiss);
  }
  if (duration > 0) {
    dismissTimeout = setTimeout(dismiss, duration);
    toast.addEventListener("mouseenter", () => {
      if (dismissTimeout) {
        clearTimeout(dismissTimeout);
        dismissTimeout = null;
      }
      if (progressBar) {
        progressBar.style.transitionDuration = "0s";
      }
    });
    toast.addEventListener("mouseleave", () => {
      if (!toast.classList.contains("hide")) {
        const remaining = progressBar ? parseFloat(getComputedStyle(progressBar).width) / parseFloat(getComputedStyle(progressBar.parentElement).width) : 0.5;
        const remainingTime = duration * remaining;
        if (progressBar) {
          progressBar.style.transitionDuration = `${remainingTime}ms`;
          requestAnimationFrame(() => {
            progressBar.style.width = "0%";
          });
        }
        dismissTimeout = setTimeout(dismiss, remainingTime);
      }
    });
  }
  return { dismiss };
}
function showSuccess(message, options = {}) {
  return showToast(message, { ...options, type: "success" });
}
function showError(message, options = {}) {
  return showToast(message, { ...options, type: "error", duration: options.duration ?? 6e3 });
}
function showWarning(message, options = {}) {
  return showToast(message, { ...options, type: "warning" });
}
function showInfo(message, options = {}) {
  return showToast(message, { ...options, type: "info" });
}

// src/components/dropdown-menu/DropdownMenu.js
var DROPDOWN_MENU_STYLES_ID = "hf-dropdown-menu-styles";
if (!document.getElementById(DROPDOWN_MENU_STYLES_ID)) {
  const style = document.createElement("style");
  style.id = DROPDOWN_MENU_STYLES_ID;
  style.textContent = `
        dropdown-menu {
            display: inline-block;
            position: relative;
        }

        dropdown-menu[disabled] {
            opacity: 0.5;
            pointer-events: none;
        }

        /* Trigger button */
        dropdown-menu .dropdown-trigger {
            all: unset;
            display: inline-flex;
            align-items: center;
            box-sizing: border-box;
            gap: 0.5rem;
            min-height: var(--hf-control-height, 1.875rem);
            padding: var(--hf-control-padding, 0.25rem 0.5rem);
            cursor: pointer;
            font-size: var(--hf-size-sm, 0.75rem);
            font-weight: 500;
            line-height: var(--hf-leading-normal, 1.5);
            text-wrap: nowrap;
            font-family: var(--hf-font-family, 'Nunito', system-ui, sans-serif);
            color: var(--hf-text-normal);
            background: var(--hf-bg-elevated);
            border: 1px solid var(--hf-border-subtle);
            border-radius: var(--hf-radius-sm, 0.25rem);
            transition: background-color 0.15s ease, border-color 0.15s ease;
        }

        dropdown-menu .dropdown-trigger:hover,
        dropdown-menu .dropdown-trigger:focus {
            background: var(--hf-bg-muted);
            border-color: var(--hf-border-hover);
        }

        dropdown-menu .dropdown-trigger .material-symbols {
            font-size: 1.125rem;
        }

        /* Hide text on smaller screens */
        @media (max-width: 960px) {
            dropdown-menu[compact-mobile] .dropdown-trigger .trigger-text {
                display: none;
            }
        }

        /* The dropdown container */
        dropdown-menu .dropdown-content {
            position: absolute;
            top: 100%;
            left: 0;
            z-index: 100;
            min-width: 150px;
            padding: 0;
            margin-top: 2px;
            background: var(--hf-bg-surface);
            border: 1px solid var(--hf-border-subtle);
            border-radius: var(--hf-radius-sm, 0.25rem);
            box-shadow: var(--hf-shadow-md, 0 4px 8px rgba(0, 0, 0, 0.2));
            display: none;
            overflow: hidden;
        }

        dropdown-menu .dropdown-content.show {
            display: block;
        }

        dropdown-menu .dropdown-content.align-right {
            left: auto;
            right: 0;
        }

        /* Items */
        dropdown-menu dropdown-item,
        dropdown-menu .dropdown-item {
            display: block;
            width: 100%;
            padding: 0.5rem 0.75rem;
            font-size: var(--hf-size-sm, 0.75rem);
            font-family: inherit;
            text-align: left;
            text-wrap: nowrap;
            color: var(--hf-text-normal);
            background: transparent;
            border: none;
            cursor: pointer;
            transition: background-color 0.15s ease, color 0.15s ease;
        }

        dropdown-menu dropdown-item:hover,
        dropdown-menu .dropdown-item:hover {
            background: var(--hf-bg-elevated);
            color: var(--hf-text-bright);
        }

        dropdown-menu dropdown-item:active,
        dropdown-menu .dropdown-item:active {
            background: var(--hf-bg-muted);
        }

        dropdown-menu dropdown-item[destructive] {
            color: var(--hf-red);
        }

        dropdown-menu dropdown-item[destructive]:hover {
            background: color-mix(in srgb, var(--hf-red) 15%, transparent);
        }

        /* Small variant */
        dropdown-menu[small] .dropdown-trigger {
            min-height: var(--hf-control-height-sm, 1.5rem);
            padding: var(--hf-space-1, 0.25rem) var(--hf-space-2, 0.5rem);
            font-size: var(--hf-size-sm, 0.75rem);
            gap: 0.25rem;
        }

        dropdown-menu[small] .dropdown-trigger .material-symbols {
            font-size: var(--hf-size-base, 0.875rem);
        }

        dropdown-menu[small] .dropdown-content {
            min-width: 100px;
        }

        dropdown-menu[small] dropdown-item,
        dropdown-menu[small] .dropdown-item {
            padding: 0.375rem 0.5rem;
            font-size: var(--hf-size-sm, 0.75rem);
        }

        /* Selectable mode - dropdown arrow indicator */
        dropdown-menu[selectable] .dropdown-trigger::after {
            content: '\u25BE';
            font-size: var(--hf-size-md, 1rem);
            line-height: 0;
            color: var(--hf-text-dim);
            margin-left: 4px;
        }

        /* Selected item highlight in selectable mode */
        dropdown-menu[selectable] dropdown-item[selected],
        dropdown-menu[selectable] .dropdown-item[selected] {
            background: color-mix(in srgb, var(--hf-accent) 25%, transparent);
        }

        /* Divider */
        dropdown-menu .dropdown-divider {
            height: 1px;
            margin: 0.25rem 0;
            background: var(--hf-bg-muted);
        }
    `;
  document.head.appendChild(style);
}
var openMenus = /* @__PURE__ */ new Set();
if (!window._hfDropdownMenuGlobalHandler) {
  window._hfDropdownMenuGlobalHandler = true;
  document.addEventListener("click", (e) => {
    openMenus.forEach((menu) => {
      if (!menu.contains(e.target)) {
        menu.close();
      }
    });
  });
}
var DropdownMenu = class extends HTMLElement {
  static get observedAttributes() {
    return ["label", "icon", "disabled", "align", "value"];
  }
  constructor() {
    super();
    this._rendered = false;
    this._boundClose = this.close.bind(this);
    this._value = "";
  }
  connectedCallback() {
    if (!this._rendered) {
      this._render();
      this._setupEventListeners();
      this._rendered = true;
    }
    if (this.hasAttribute("selectable") && this.hasAttribute("value")) {
      this._value = this.getAttribute("value");
      this._updateSelectedState();
    }
  }
  disconnectedCallback() {
    openMenus.delete(this);
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (!this._rendered) return;
    if (name === "label") {
      const textEl = this.querySelector(".trigger-text");
      if (textEl) textEl.textContent = newValue || "";
    } else if (name === "icon") {
      const iconEl = this.querySelector(".trigger-icon");
      if (iconEl) iconEl.textContent = newValue || "";
      if (iconEl) iconEl.style.display = newValue ? "" : "none";
    } else if (name === "disabled") {
    } else if (name === "align") {
      const content = this.querySelector(".dropdown-content");
      if (content) {
        content.classList.toggle("align-right", newValue === "right");
      }
    } else if (name === "value") {
      if (this.hasAttribute("selectable")) {
        this._value = newValue || "";
        this._updateSelectedState();
      }
    }
  }
  /**
   * Get/set the current value (for selectable mode)
   * @type {string}
   */
  get value() {
    return this._value;
  }
  set value(val) {
    this._value = val;
    this.setAttribute("value", val);
    this._updateSelectedState();
  }
  /**
   * Update selected state for selectable mode
   * @private
   */
  _updateSelectedState() {
    if (!this.hasAttribute("selectable")) return;
    const items = this._getItems();
    let selectedText = "";
    items.forEach((item) => {
      const itemValue = item.getAttribute("value") || item.dataset.value || item.textContent.trim();
      if (itemValue === this._value) {
        item.setAttribute("selected", "");
        selectedText = item.textContent.trim();
      } else {
        item.removeAttribute("selected");
      }
    });
    if (selectedText) {
      const textEl = this.querySelector(".trigger-text");
      if (textEl) textEl.textContent = selectedText;
    }
  }
  _render() {
    const label = this.getAttribute("label") || "";
    const icon = this.getAttribute("icon") || "";
    const align = this.getAttribute("align");
    const existingItems = Array.from(this.children);
    this.innerHTML = `
            <button class="dropdown-trigger" type="button">
                <span class="material-symbols trigger-icon" style="${icon ? "" : "display:none"}">${icon}</span>
                <span class="trigger-text">${label}</span>
            </button>
            <div class="dropdown-content${align === "right" ? " align-right" : ""}"></div>
        `;
    const content = this.querySelector(".dropdown-content");
    existingItems.forEach((item) => content.appendChild(item));
  }
  _setupEventListeners() {
    const trigger = this.querySelector(".dropdown-trigger");
    const content = this.querySelector(".dropdown-content");
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      if (this._openedViaKeyboard) {
        this._openedViaKeyboard = false;
        return;
      }
      this.toggle();
    });
    content.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      const item = e.target.closest("dropdown-item, .dropdown-item");
      if (item) {
        const value = item.getAttribute("value") || item.dataset.value || item.textContent.trim();
        if (this.hasAttribute("selectable")) {
          this._value = value;
          this.setAttribute("value", value);
          this._updateSelectedState();
        }
        this.dispatchEvent(new CustomEvent("change", {
          detail: { value, item },
          bubbles: true
        }));
        this.close();
      }
    });
    trigger.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this._openedViaKeyboard = true;
        this.open();
        this._focusFirstItem();
      }
    });
    this.addEventListener("keydown", (e) => {
      if (!this.isOpen) return;
      if (!this.contains(document.activeElement)) return;
      if (document.activeElement === trigger) return;
      const items = this._getItems();
      const currentIndex = items.indexOf(document.activeElement);
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (currentIndex < items.length - 1) {
            items[currentIndex + 1].focus();
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (currentIndex > 0) {
            items[currentIndex - 1].focus();
          }
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (document.activeElement?.closest("dropdown-item, .dropdown-item")) {
            document.activeElement.click();
          }
          break;
      }
    });
  }
  _getItems() {
    return Array.from(this.querySelectorAll("dropdown-item, .dropdown-item"));
  }
  _focusFirstItem() {
    const items = this._getItems();
    if (items.length > 0) {
      items[0].setAttribute("tabindex", "0");
      items[0].focus();
    }
  }
  /**
   * Open the dropdown menu
   */
  open() {
    const content = this.querySelector(".dropdown-content");
    content.classList.add("show");
    openMenus.add(this);
    registerEscapeable(this, () => this.close());
  }
  /**
   * Close the dropdown menu
   */
  close() {
    const content = this.querySelector(".dropdown-content");
    content?.classList.remove("show");
    openMenus.delete(this);
    unregisterEscapeable(this);
  }
  /**
   * Toggle the dropdown menu
   */
  toggle() {
    const content = this.querySelector(".dropdown-content");
    if (content.classList.contains("show")) {
      this.close();
    } else {
      openMenus.forEach((menu) => {
        if (menu !== this) menu.close();
      });
      this.open();
    }
  }
  /**
   * Check if the dropdown is open
   * @returns {boolean}
   */
  get isOpen() {
    return this.querySelector(".dropdown-content")?.classList.contains("show") || false;
  }
  /**
   * Set items programmatically
   * @param {Array<{value: string, label: string, destructive?: boolean}>} items
   */
  setItems(items) {
    const content = this.querySelector(".dropdown-content");
    content.innerHTML = items.map(
      (item) => `<dropdown-item value="${item.value}"${item.destructive ? " destructive" : ""}>${item.label}</dropdown-item>`
    ).join("");
  }
  /**
   * Add a single item
   * @param {string} value
   * @param {string} label
   * @param {Object} [options]
   * @param {boolean} [options.destructive]
   */
  addItem(value, label, options = {}) {
    const content = this.querySelector(".dropdown-content");
    const item = document.createElement("dropdown-item");
    item.setAttribute("value", value);
    item.textContent = label;
    if (options.destructive) {
      item.setAttribute("destructive", "");
    }
    content.appendChild(item);
  }
  /**
   * Clear all items
   */
  clearItems() {
    const content = this.querySelector(".dropdown-content");
    content.innerHTML = "";
  }
};
var DropdownItem = class extends HTMLElement {
  constructor() {
    super();
    this.setAttribute("tabindex", "-1");
    this.setAttribute("role", "menuitem");
  }
};
customElements.define("dropdown-menu", DropdownMenu);
customElements.define("dropdown-item", DropdownItem);

// src/components/color-swatch/ColorSwatch.js
var STYLES_ID2 = "hf-color-swatch-styles";
if (!document.getElementById(STYLES_ID2)) {
  const style = document.createElement("style");
  style.id = STYLES_ID2;
  style.textContent = `
        color-swatch {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: var(--hf-radius-sm, 6px);
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: transform 0.1s ease, box-shadow 0.15s ease;
        }

        color-swatch[disabled] {
            cursor: not-allowed;
            opacity: 0.5;
        }

        /* Checkerboard background for transparency */
        color-swatch::before {
            content: '';
            position: absolute;
            inset: 0;
            background:
                linear-gradient(45deg, #888 25%, transparent 25%),
                linear-gradient(-45deg, #888 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #888 75%),
                linear-gradient(-45deg, transparent 75%, #888 75%);
            background-size: 8px 8px;
            background-position: 0 0, 0 4px, 4px -4px, -4px 0;
            opacity: 0.3;
        }

        color-swatch .swatch-color {
            position: absolute;
            inset: 0;
            transition: background-color 0.1s ease;
        }

        color-swatch:not([disabled]):hover {
            transform: scale(1.1);
        }

        color-swatch[selected] {
            box-shadow:
                0 0 0 2px var(--hf-bg-base),
                0 0 0 4px var(--hf-accent);
        }

        /* Hex tooltip */
        color-swatch .swatch-tooltip {
            position: absolute;
            bottom: calc(100% + 6px);
            left: 50%;
            transform: translateX(-50%);
            padding: 4px 8px;
            background: var(--hf-bg-base);
            border: 1px solid var(--hf-bg-elevated);
            border-radius: var(--hf-radius-sm, 0.25rem);
            color: var(--hf-text-normal);
            font-family: var(--hf-font-family-mono, monospace);
            font-size: var(--hf-size-xs, 0.625rem);
            white-space: nowrap;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.15s ease;
            z-index: 10;
        }

        color-swatch .swatch-tooltip::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 4px solid transparent;
            border-top-color: var(--hf-bg-elevated);
        }

        color-swatch:hover .swatch-tooltip {
            opacity: 1;
        }

        /* Size variants */
        color-swatch.small {
            width: 24px;
            height: 24px;
        }

        color-swatch.large {
            width: 48px;
            height: 48px;
        }

        /* Editable indicator */
        color-swatch[editable]::after {
            content: '';
            position: absolute;
            bottom: 2px;
            right: 2px;
            width: 8px;
            height: 8px;
            background: var(--hf-bg-base);
            border-radius: 50%;
            border: 1px solid var(--hf-border-subtle);
            opacity: 0;
            transition: opacity 0.15s ease;
        }

        color-swatch[editable]:hover::after {
            opacity: 0.8;
        }
    `;
  document.head.appendChild(style);
}
var ColorSwatch = class extends HTMLElement {
  constructor() {
    super();
    this._color = "#000000";
    this._rgb = [0, 0, 0];
    this._rendered = false;
  }
  static get observedAttributes() {
    return ["color", "selected", "disabled", "editable", "size", "show-tooltip"];
  }
  connectedCallback() {
    if (!this._rendered) {
      this._render();
      this._rendered = true;
    }
    this._updateFromAttributes();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this._rendered) return;
    switch (name) {
      case "color":
        this._parseAndSetColor(newValue);
        break;
      case "selected":
      case "disabled":
      case "editable":
        break;
      case "size":
        this._updateSize();
        break;
      case "show-tooltip":
        this._updateTooltip();
        break;
    }
  }
  // ========================================================================
  // Public API
  // ========================================================================
  /**
   * Get the current color as hex string
   */
  get color() {
    return this._color;
  }
  /**
   * Set color from hex string or RGB array (0-1 range)
   */
  set color(val) {
    if (typeof val === "string") {
      this._parseAndSetColor(val);
    } else if (Array.isArray(val)) {
      this._setColorFromRgb(val);
    }
  }
  /**
   * Get the current color as RGB array [0-1]
   */
  get rgb() {
    return [...this._rgb];
  }
  /**
   * Set color from RGB array [0-1]
   */
  set rgb(val) {
    this._setColorFromRgb(val);
  }
  get selected() {
    return this.hasAttribute("selected");
  }
  set selected(val) {
    if (val) {
      this.setAttribute("selected", "");
    } else {
      this.removeAttribute("selected");
    }
  }
  get disabled() {
    return this.hasAttribute("disabled");
  }
  set disabled(val) {
    if (val) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }
  // ========================================================================
  // Private Methods
  // ========================================================================
  _render() {
    this.innerHTML = `
            <div class="swatch-color"></div>
            <span class="swatch-tooltip"></span>
        `;
    this.addEventListener("click", (e) => {
      if (this.disabled) return;
      e.stopPropagation();
      this.dispatchEvent(new CustomEvent("select", {
        bubbles: true,
        detail: { color: this._color, rgb: this._rgb }
      }));
    });
    this.addEventListener("dblclick", (e) => {
      if (this.disabled || !this.hasAttribute("editable")) return;
      e.stopPropagation();
      this.dispatchEvent(new CustomEvent("edit", {
        bubbles: true,
        detail: { color: this._color, rgb: this._rgb }
      }));
    });
    this.setAttribute("tabindex", "0");
    this.setAttribute("role", "button");
    this.addEventListener("keydown", (e) => {
      if (this.disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.dispatchEvent(new CustomEvent("select", {
          bubbles: true,
          detail: { color: this._color, rgb: this._rgb }
        }));
      }
    });
  }
  _updateFromAttributes() {
    const colorAttr = this.getAttribute("color");
    if (colorAttr) {
      this._parseAndSetColor(colorAttr);
    }
    this._updateSize();
    this._updateTooltip();
  }
  _parseAndSetColor(value) {
    if (!value) return;
    if (value.startsWith("[")) {
      try {
        const arr = JSON.parse(value);
        this._setColorFromRgb(arr);
        return;
      } catch (_e) {
      }
    }
    const rgb = parseHex(value);
    if (rgb) {
      this._color = value.startsWith("#") ? value : `#${value}`;
      this._rgb = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
      this._updateDisplay();
    }
  }
  _setColorFromRgb(arr) {
    if (!Array.isArray(arr) || arr.length < 3) return;
    this._rgb = [arr[0], arr[1], arr[2]];
    this._color = rgbToHex({
      r: Math.round(arr[0] * 255),
      g: Math.round(arr[1] * 255),
      b: Math.round(arr[2] * 255)
    });
    this._updateDisplay();
  }
  _updateDisplay() {
    const colorEl = this.querySelector(".swatch-color");
    if (colorEl) {
      colorEl.style.backgroundColor = this._color;
    }
    const tooltipEl = this.querySelector(".swatch-tooltip");
    if (tooltipEl) {
      tooltipEl.textContent = this._color.toUpperCase();
    }
    this.setAttribute("aria-label", `Color ${this._color}`);
  }
  _updateSize() {
    const size = this.getAttribute("size") || "medium";
    this.classList.remove("small", "medium", "large");
    if (size !== "medium") {
      this.classList.add(size);
    }
  }
  _updateTooltip() {
    const tooltipEl = this.querySelector(".swatch-tooltip");
    if (tooltipEl) {
      tooltipEl.style.display = this.hasAttribute("show-tooltip") ? "" : "none";
    }
  }
};
customElements.define("color-swatch", ColorSwatch);

// src/components/gradient-stops/GradientStops.js
var STYLES_ID3 = "hf-gradient-stops-styles";
if (!document.getElementById(STYLES_ID3)) {
  const style = document.createElement("style");
  style.id = STYLES_ID3;
  style.textContent = `
        gradient-stops {
            display: block;
            position: relative;
            width: 100%;
            height: 28px;
            margin-top: 4px;
            user-select: none;
        }

        gradient-stops .stops-track {
            position: absolute;
            top: 0;
            left: 8px;
            right: 8px;
            height: 100%;
        }

        gradient-stops .stop-handle {
            position: absolute;
            width: 16px;
            height: 22px;
            transform: translateX(-50%);
            cursor: grab;
            transition: filter 0.1s ease;
        }

        gradient-stops .stop-handle:active {
            cursor: grabbing;
        }

        gradient-stops .stop-handle.selected {
            z-index: 10;
        }

        gradient-stops .stop-handle.selected .stop-body {
            box-shadow: 0 0 0 2px var(--hf-accent);
        }

        gradient-stops .stop-handle:hover .stop-body {
            filter: brightness(1.1);
        }

        gradient-stops .stop-pointer {
            position: absolute;
            top: 0;
            left: 50%;
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 6px solid var(--stop-color);
            transform: translateX(-50%);
        }

        gradient-stops .stop-body {
            position: absolute;
            top: 6px;
            left: 1px;
            right: 1px;
            height: 14px;
            background: var(--stop-color);
            border: 1px solid rgba(0, 0, 0, 0.3);
            border-radius: var(--hf-radius-sm, 0.25rem);
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        gradient-stops .stop-delete {
            position: absolute;
            top: -6px;
            right: -6px;
            width: 14px;
            height: 14px;
            background: var(--hf-bg-surface);
            border: 1px solid var(--hf-border-subtle);
            border-radius: 50%;
            color: var(--hf-text-dim);
            font-size: var(--hf-size-xs, 0.625rem);
            line-height: 12px;
            text-align: center;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.1s ease;
            z-index: 20;
        }

        gradient-stops .stop-handle.selected .stop-delete {
            opacity: 1;
        }

        gradient-stops .stop-delete:hover {
            background: var(--hf-red);
            border-color: var(--hf-red);
            color: white;
        }

        gradient-stops.disabled {
            pointer-events: none;
            opacity: 0.5;
        }

        gradient-stops.disabled .stop-handle {
            cursor: default;
        }
    `;
  document.head.appendChild(style);
}
var GradientStops = class extends HTMLElement {
  constructor() {
    super();
    this._colors = [];
    this._positions = [];
    this._selectedIndex = -1;
    this._isDragging = false;
    this._trackElement = null;
    this._boundOnDocumentClick = this._onDocumentClick.bind(this);
  }
  static get observedAttributes() {
    return ["disabled"];
  }
  connectedCallback() {
    this._render();
    document.addEventListener("click", this._boundOnDocumentClick);
  }
  disconnectedCallback() {
    document.removeEventListener("click", this._boundOnDocumentClick);
  }
  _onDocumentClick(e) {
    if (!this.contains(e.target)) {
      this._selectedIndex = -1;
      this._updateSelection();
    }
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (name === "disabled") {
      if (newValue !== null) {
        this.classList.add("disabled");
      } else {
        this.classList.remove("disabled");
      }
    }
  }
  /**
   * Set the colors and their positions
   * @param {number[][]} colors - Array of RGB colors [0-1]
   * @param {number[]} positions - Array of positions [0-1]
   */
  setStops(colors, positions) {
    this._colors = [...colors];
    this._positions = [...positions];
    while (this._positions.length < this._colors.length) {
      const i = this._positions.length;
      this._positions.push(i / (this._colors.length - 1));
    }
    this._render();
  }
  /**
   * Get current positions
   * @returns {number[]}
   */
  getPositions() {
    return [...this._positions];
  }
  /**
   * Get selected color index
   * @returns {number}
   */
  getSelectedIndex() {
    return this._selectedIndex;
  }
  /**
   * Set selected index
   * @param {number} index
   */
  setSelectedIndex(index) {
    this._selectedIndex = index;
    this._updateSelection();
  }
  /**
   * Update a single stop's position
   * @param {number} index - Color index
   * @param {number} position - New position [0-1]
   */
  setPosition(index, position) {
    if (index >= 0 && index < this._positions.length) {
      this._positions[index] = Math.max(0, Math.min(1, position));
      this._updateHandlePositions();
    }
  }
  _render() {
    this.innerHTML = `<div class="stops-track"></div>`;
    this._trackElement = this.querySelector(".stops-track");
    this._colors.forEach((color, index) => {
      const handle = this._createHandle(color, index);
      this._trackElement.appendChild(handle);
    });
    this._updateHandlePositions();
    this._updateSelection();
  }
  _createHandle(color, index) {
    const hex = rgbToHex({
      r: Math.round(color[0] * 255),
      g: Math.round(color[1] * 255),
      b: Math.round(color[2] * 255)
    });
    const handle = document.createElement("div");
    handle.className = "stop-handle";
    handle.dataset.index = index;
    handle.style.setProperty("--stop-color", hex);
    handle.innerHTML = `
            <div class="stop-pointer"></div>
            <div class="stop-body"></div>
            <button class="stop-delete" title="Delete color">\xD7</button>
        `;
    handle.addEventListener("mousedown", (e) => this._onMouseDown(e, index));
    handle.addEventListener("touchstart", (e) => this._onTouchStart(e, index), { passive: false });
    const deleteBtn = handle.querySelector(".stop-delete");
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this._onDelete(index);
    });
    return handle;
  }
  _updateHandlePositions() {
    const handles = this._trackElement?.querySelectorAll(".stop-handle");
    if (!handles) return;
    handles.forEach((handle, i) => {
      const pos = this._positions[i] ?? i / Math.max(1, this._colors.length - 1);
      handle.style.left = `${pos * 100}%`;
    });
  }
  _updateSelection() {
    const handles = this._trackElement?.querySelectorAll(".stop-handle");
    if (!handles) return;
    handles.forEach((handle, i) => {
      if (i === this._selectedIndex) {
        handle.classList.add("selected");
      } else {
        handle.classList.remove("selected");
      }
    });
  }
  _updateHandleColor(index, color) {
    const handle = this._trackElement?.querySelector(`[data-index="${index}"]`);
    if (handle) {
      const hex = rgbToHex({
        r: Math.round(color[0] * 255),
        g: Math.round(color[1] * 255),
        b: Math.round(color[2] * 255)
      });
      handle.style.setProperty("--stop-color", hex);
    }
  }
  _onMouseDown(e, index) {
    if (this.hasAttribute("disabled")) return;
    if (e.target.classList.contains("stop-delete")) return;
    e.preventDefault();
    this._selectedIndex = index;
    this._updateSelection();
    this.dispatchEvent(new CustomEvent("select", {
      detail: { index }
    }));
    this._isDragging = true;
    const startX = e.clientX;
    const startPos = this._positions[index];
    const trackRect = this._trackElement.getBoundingClientRect();
    const onMouseMove = (moveEvent) => {
      if (!this._isDragging) return;
      const deltaX = moveEvent.clientX - startX;
      const deltaPct = deltaX / trackRect.width;
      let newPos = startPos + deltaPct;
      newPos = this._clampPosition(newPos, index);
      this._positions[index] = newPos;
      this._updateHandlePositions();
      this.dispatchEvent(new CustomEvent("input", {
        detail: { index, position: newPos, positions: [...this._positions] }
      }));
    };
    const onMouseUp = () => {
      this._isDragging = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      this.dispatchEvent(new CustomEvent("change", {
        detail: { index, positions: [...this._positions] }
      }));
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }
  _onTouchStart(e, index) {
    if (this.hasAttribute("disabled")) return;
    if (e.target.classList.contains("stop-delete")) return;
    e.preventDefault();
    this._selectedIndex = index;
    this._updateSelection();
    this.dispatchEvent(new CustomEvent("select", {
      detail: { index }
    }));
    const touch = e.touches[0];
    const startX = touch.clientX;
    const startPos = this._positions[index];
    const trackRect = this._trackElement.getBoundingClientRect();
    const onTouchMove = (moveEvent) => {
      const currentTouch = moveEvent.touches[0];
      const deltaX = currentTouch.clientX - startX;
      const deltaPct = deltaX / trackRect.width;
      let newPos = startPos + deltaPct;
      newPos = this._clampPosition(newPos, index);
      this._positions[index] = newPos;
      this._updateHandlePositions();
      this.dispatchEvent(new CustomEvent("input", {
        detail: { index, position: newPos, positions: [...this._positions] }
      }));
    };
    const onTouchEnd = () => {
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      this.dispatchEvent(new CustomEvent("change", {
        detail: { index, positions: [...this._positions] }
      }));
    };
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd);
  }
  _clampPosition(position, index) {
    position = Math.max(0, Math.min(1, position));
    const prevPos = index > 0 ? this._positions[index - 1] : 0;
    const nextPos = index < this._positions.length - 1 ? this._positions[index + 1] : 1;
    const epsilon = 1e-3;
    position = Math.max(prevPos + epsilon, position);
    position = Math.min(nextPos - epsilon, position);
    return position;
  }
  _onDelete(index) {
    if (this.hasAttribute("disabled")) return;
    if (this._colors.length <= 2) return;
    this._colors.splice(index, 1);
    this._positions.splice(index, 1);
    if (this._selectedIndex >= this._colors.length) {
      this._selectedIndex = this._colors.length - 1;
    } else if (this._selectedIndex === index) {
      this._selectedIndex = Math.min(index, this._colors.length - 1);
    } else if (this._selectedIndex > index) {
      this._selectedIndex--;
    }
    this._render();
    this.dispatchEvent(new CustomEvent("delete", {
      detail: { index, positions: [...this._positions], colors: [...this._colors] }
    }));
  }
};
customElements.define("gradient-stops", GradientStops);

// src/components/image-magnifier/ImageMagnifier.js
var MAGNIFIER_SIZE = 120;
var ZOOM_LEVEL = 8;
var IMAGE_MAGNIFIER_STYLES_ID = "hf-image-magnifier-styles";
if (!document.getElementById(IMAGE_MAGNIFIER_STYLES_ID)) {
  const styleEl = document.createElement("style");
  styleEl.id = IMAGE_MAGNIFIER_STYLES_ID;
  styleEl.textContent = `
        image-magnifier {
            position: fixed;
            pointer-events: none;
            z-index: 10000;
            display: none;
            --mag-size: ${MAGNIFIER_SIZE}px;
            --mag-border: var(--hf-border-subtle, #4a5568);
            --mag-bg: var(--hf-bg-base, #1a202c);
            --mag-text: var(--hf-text-normal, #e2e8f0);
            --mag-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }

        image-magnifier[active] {
            display: block;
        }

        image-magnifier .magnifier-container {
            position: relative;
            width: var(--mag-size);
            height: var(--mag-size);
        }

        image-magnifier .magnifier-lens {
            width: var(--mag-size);
            height: var(--mag-size);
            border-radius: 50%;
            border: 2px solid var(--mag-border);
            box-shadow: var(--mag-shadow);
            overflow: hidden;
            position: relative;
            background: var(--mag-bg);
        }

        image-magnifier .magnifier-canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }

        image-magnifier .magnifier-crosshair {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
        }

        image-magnifier .magnifier-crosshair::before,
        image-magnifier .magnifier-crosshair::after {
            content: '';
            position: absolute;
            background: rgba(255, 255, 255, 0.8);
            box-shadow: 0 0 1px rgba(0, 0, 0, 0.8);
        }

        /* Horizontal line */
        image-magnifier .magnifier-crosshair::before {
            width: 20px;
            height: 1px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        /* Vertical line */
        image-magnifier .magnifier-crosshair::after {
            width: 1px;
            height: 20px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        image-magnifier .magnifier-center-pixel {
            position: absolute;
            top: 50%;
            left: 50%;
            width: ${ZOOM_LEVEL}px;
            height: ${ZOOM_LEVEL}px;
            transform: translate(-50%, -50%);
            border: 1px solid rgba(255, 255, 255, 0.9);
            box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
            pointer-events: none;
        }

        image-magnifier .magnifier-info {
            position: absolute;
            bottom: -28px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--mag-bg);
            border: 1px solid var(--mag-border);
            border-radius: var(--hf-radius-sm, 0.25rem);
            padding: 2px 8px;
            font-family: var(--hf-font-family-mono, monospace);
            font-size: var(--hf-size-xs, 0.625rem);
            color: var(--mag-text);
            white-space: nowrap;
            box-shadow: var(--mag-shadow);
            display: flex;
            align-items: center;
            gap: 6px;
        }

        image-magnifier .magnifier-color-preview {
            width: 12px;
            height: 12px;
            border-radius: var(--hf-radius-sm, 0.25rem);
            border: 1px solid rgba(255, 255, 255, 0.3);
            flex-shrink: 0;
        }
    `;
  document.head.appendChild(styleEl);
}
var ImageMagnifier = class extends HTMLElement {
  static get observedAttributes() {
    return ["active", "zoom", "size"];
  }
  constructor() {
    super();
    this._sourceCanvas = null;
    this._sourceCtx = null;
    this._pixelCanvas = null;
    this._pixelCtx = null;
    this._magnifierCanvas = null;
    this._magnifierCtx = null;
    this._zoom = ZOOM_LEVEL;
    this._size = MAGNIFIER_SIZE;
    this._centerColor = null;
    this._rendered = false;
    this._offsetX = 0;
    this._offsetY = 0;
  }
  connectedCallback() {
    if (!this._rendered) {
      this._render();
      this._rendered = true;
    }
  }
  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    switch (name) {
      case "zoom":
        this._zoom = parseInt(newVal, 10) || ZOOM_LEVEL;
        break;
      case "size":
        this._size = parseInt(newVal, 10) || MAGNIFIER_SIZE;
        this.style.setProperty("--mag-size", `${this._size}px`);
        break;
    }
  }
  // ========================================================================
  // Public API
  // ========================================================================
  /**
   * Attach the magnifier to a source canvas
   * @param {HTMLCanvasElement} canvas - The canvas to magnify
   */
  attach(canvas) {
    if (this._sourceCanvas) {
      this.detach();
    }
    this._sourceCanvas = canvas;
    this._sourceCtx = canvas.getContext("2d");
    this._pixelCanvas = document.createElement("canvas");
    this._pixelCanvas.width = 1;
    this._pixelCanvas.height = 1;
    this._pixelCtx = this._pixelCanvas.getContext("2d", { willReadFrequently: true });
    this._onMouseMove = this._handleMouseMove.bind(this);
    this._onMouseEnter = this._handleMouseEnter.bind(this);
    this._onMouseLeave = this._handleMouseLeave.bind(this);
    canvas.addEventListener("mousemove", this._onMouseMove);
    canvas.addEventListener("mouseenter", this._onMouseEnter);
    canvas.addEventListener("mouseleave", this._onMouseLeave);
  }
  /**
   * Detach the magnifier from the current source
   */
  detach() {
    if (this._sourceCanvas) {
      this._sourceCanvas.removeEventListener("mousemove", this._onMouseMove);
      this._sourceCanvas.removeEventListener("mouseenter", this._onMouseEnter);
      this._sourceCanvas.removeEventListener("mouseleave", this._onMouseLeave);
    }
    this._sourceCanvas = null;
    this._sourceCtx = null;
    this._pixelCanvas = null;
    this._pixelCtx = null;
    this.hide();
  }
  /**
   * Show the magnifier
   */
  show() {
    this.setAttribute("active", "");
  }
  /**
   * Hide the magnifier
   */
  hide() {
    this.removeAttribute("active");
  }
  /**
   * Get the current center color
   * @returns {{r: number, g: number, b: number}|null}
   */
  get centerColor() {
    return this._centerColor;
  }
  /**
   * Check if magnifier is active
   * @returns {boolean}
   */
  get active() {
    return this.hasAttribute("active");
  }
  // ========================================================================
  // Internal: Rendering
  // ========================================================================
  _render() {
    this.innerHTML = `
            <div class="magnifier-container">
                <div class="magnifier-lens">
                    <canvas class="magnifier-canvas" width="${this._size}" height="${this._size}"></canvas>
                    <div class="magnifier-crosshair"></div>
                    <div class="magnifier-center-pixel"></div>
                </div>
                <div class="magnifier-info">
                    <span class="magnifier-color-preview"></span>
                    <span class="magnifier-hex">#000000</span>
                </div>
            </div>
        `;
    this._magnifierCanvas = this.querySelector(".magnifier-canvas");
    this._magnifierCtx = this._magnifierCanvas?.getContext("2d", { willReadFrequently: true });
  }
  // ========================================================================
  // Internal: Event Handling
  // ========================================================================
  _handleMouseEnter() {
    this.show();
  }
  _handleMouseLeave() {
    this.hide();
  }
  _handleMouseMove(e) {
    if (!this._sourceCanvas || !this._sourceCtx || !this._magnifierCtx) return;
    const rect = this._sourceCanvas.getBoundingClientRect();
    const scaleX = this._sourceCanvas.width / rect.width;
    const scaleY = this._sourceCanvas.height / rect.height;
    const canvasX = Math.floor((e.clientX - rect.left) * scaleX);
    const canvasY = Math.floor((e.clientY - rect.top) * scaleY);
    this._updateMagnifierView(canvasX, canvasY);
    this._positionMagnifier(e.clientX, e.clientY);
  }
  _updateMagnifierView(centerX, centerY) {
    if (!this._sourceCtx || !this._magnifierCtx || !this._magnifierCanvas) return;
    const ctx = this._magnifierCtx;
    const sourceCtx = this._sourceCtx;
    const size = this._size;
    const zoom = this._zoom;
    const sourceSize = Math.ceil(size / zoom);
    const halfSource = Math.floor(sourceSize / 2);
    const sx = centerX - halfSource;
    const sy = centerY - halfSource;
    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.clip();
    const sourceCanvas = this._sourceCanvas;
    ctx.imageSmoothingEnabled = false;
    const actualSx = Math.max(0, sx);
    const actualSy = Math.max(0, sy);
    const actualEx = Math.min(sourceCanvas.width, sx + sourceSize);
    const actualEy = Math.min(sourceCanvas.height, sy + sourceSize);
    const actualWidth = actualEx - actualSx;
    const actualHeight = actualEy - actualSy;
    if (actualWidth > 0 && actualHeight > 0) {
      const destX = (actualSx - sx) * zoom;
      const destY = (actualSy - sy) * zoom;
      const destWidth = actualWidth * zoom;
      const destHeight = actualHeight * zoom;
      ctx.drawImage(
        sourceCanvas,
        actualSx,
        actualSy,
        actualWidth,
        actualHeight,
        destX,
        destY,
        destWidth,
        destHeight
      );
    }
    ctx.restore();
    if (centerX >= 0 && centerX < sourceCanvas.width && centerY >= 0 && centerY < sourceCanvas.height) {
      this._pixelCtx.drawImage(sourceCanvas, centerX, centerY, 1, 1, 0, 0, 1, 1);
      const pixel = this._pixelCtx.getImageData(0, 0, 1, 1).data;
      this._centerColor = {
        r: pixel[0],
        g: pixel[1],
        b: pixel[2]
      };
      this._updateColorInfo();
    }
  }
  _updateColorInfo() {
    if (!this._centerColor) return;
    const hex = rgbToHex(this._centerColor);
    const preview = this.querySelector(".magnifier-color-preview");
    const hexDisplay = this.querySelector(".magnifier-hex");
    if (preview) {
      preview.style.backgroundColor = hex;
    }
    if (hexDisplay) {
      hexDisplay.textContent = hex;
    }
  }
  _positionMagnifier(clientX, clientY) {
    const size = this._size;
    const infoHeight = 32;
    let x = clientX + this._offsetX;
    let y = clientY + this._offsetY;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    if (x + size > viewportWidth - 10) {
      x = clientX - size - this._offsetX;
    }
    if (y + size + infoHeight > viewportHeight - 10) {
      y = clientY - size - infoHeight - this._offsetY;
    }
    x = Math.max(10, x);
    y = Math.max(10, y);
    this.style.left = `${x}px`;
    this.style.top = `${y}px`;
  }
};
customElements.define("image-magnifier", ImageMagnifier);

// src/components/vector3d-picker/Vector3dPicker.js
var VECTOR3D_PICKER_STYLES_ID = "hf-vector3d-picker-styles";
if (!document.getElementById(VECTOR3D_PICKER_STYLES_ID)) {
  const styleEl = document.createElement("style");
  styleEl.id = VECTOR3D_PICKER_STYLES_ID;
  styleEl.textContent = `
        vector3d-picker {
            all: unset;
            display: block;
            font-family: inherit;
        }

        vector3d-picker[disabled] {
            opacity: 0.5;
            pointer-events: none;
        }

        vector3d-picker .vector-button {
            all: unset;
            display: flex;
            align-items: center;
            gap: 6px;
            padding: var(--hf-control-padding, 0.25rem 0.5rem);
            cursor: pointer;
            width: 100%;
            height: var(--hf-control-height, 1.875rem);
            box-sizing: border-box;
            font-size: var(--hf-size-sm, 0.75rem);
            color: var(--hf-text-normal);
            background: var(--hf-bg-elevated);
            border-radius: var(--hf-radius-sm, 0.25rem);
            border: 1px solid var(--hf-border-subtle);
        }

        vector3d-picker .vector-button:hover {
            background: var(--hf-bg-muted);
        }

        vector3d-picker .vector-preview {
            display: flex;
            align-items: center;
            gap: 4px;
            font-family: var(--hf-font-family-mono, monospace);
            font-size: 0.6875rem;
            color: var(--hf-text-normal);
        }

        vector3d-picker .vector-preview .axis {
            display: flex;
            align-items: center;
            gap: 1px;
            padding-right: 3px;
        }

        vector3d-picker .vector-preview .axis-label {
            font-weight: 600;
            opacity: 0.7;
        }

        vector3d-picker .vector-preview .axis-label.x { color: var(--hf-red); }
        vector3d-picker .vector-preview .axis-label.y { color: var(--hf-green); }
        vector3d-picker .vector-preview .axis-label.z { color: var(--hf-blue); }

        vector3d-picker .dropdown-arrow {
            font-size: 0.6rem;
            color: var(--hf-text-dim);
            flex-shrink: 0;
            margin-left: auto;
            transition: transform 0.15s ease;
        }

        vector3d-picker.dialog-open .dropdown-arrow {
            transform: rotate(180deg);
        }

        /* Dialog styles */
        vector3d-picker .vector-dialog {
            background: color-mix(
                in srgb,
                var(--hf-bg-surface, #1a1e2e) var(--hf-surface-opacity, 85%),
                transparent var(--hf-surface-transparency, 15%)
            );
            backdrop-filter: var(--hf-glass-blur, blur(12px));
            border: none;
            border-radius: var(--hf-radius, 8px);
            padding: 0;
            color: var(--hf-text-normal, #d9deeb);
            box-shadow: var(--hf-shadow-xl, 0 16px 32px rgba(0, 0, 0, 0.3));
            overflow: hidden;
            min-width: 320px;
        }

        vector3d-picker .vector-dialog::backdrop {
            background: var(--hf-backdrop, rgba(0, 0, 0, 0.6));
            backdrop-filter: var(--hf-glass-blur-sm, blur(4px));
        }

        vector3d-picker .dialog-titlebar {
            background-color: var(--hf-titlebar-bg, var(--hf-bg-elevated, #262e3f));
            border-bottom: none;
            padding: 0 0.5em;
            min-height: 1.75rem;
            height: 1.75rem;
            font-size: 0.95rem;
            font-weight: 600;
            color: var(--hf-text-normal, #d9deeb);
            text-transform: lowercase;
            letter-spacing: 0.05em;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 0.5em;
            border-radius: var(--hf-radius, 8px) var(--hf-radius, 8px) 0 0;
        }

        vector3d-picker .dialog-title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        vector3d-picker .dialog-close {
            background: transparent;
            border: none;
            color: var(--hf-text-dim, #98a7c8);
            cursor: pointer;
            font-size: 0.875rem;
            padding: 0.25em 0.5em;
            line-height: 1;
            opacity: 0.7;
            transition: opacity 0.15s ease;
            margin-left: auto;
        }

        vector3d-picker .dialog-close:hover {
            opacity: 1;
            color: var(--hf-text-normal, #d9deeb);
        }

        vector3d-picker .dialog-body {
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        /* Sphere gizmo container */
        vector3d-picker .gizmo-container {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0.5rem;
        }

        vector3d-picker .sphere-gizmo {
            width: 180px;
            height: 180px;
            border-radius: 50%;
            background: radial-gradient(
                circle at 30% 30%,
                var(--hf-bg-muted) 0%,
                var(--hf-bg-elevated) 50%,
                var(--hf-bg-surface) 100%
            );
            position: relative;
            cursor: crosshair;
            box-shadow:
                inset 0 0 30px rgba(0, 0, 0, 0.3),
                0 4px 12px rgba(0, 0, 0, 0.3);
            border: 2px solid var(--hf-border-subtle);
        }

        vector3d-picker .sphere-gizmo::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 50%;
            background: radial-gradient(
                circle at 25% 25%,
                rgba(255, 255, 255, 0.1) 0%,
                transparent 50%
            );
            pointer-events: none;
        }

        /* Grid lines on sphere */
        vector3d-picker .sphere-grid {
            position: absolute;
            inset: 0;
            border-radius: 50%;
            overflow: hidden;
            pointer-events: none;
        }

        vector3d-picker .sphere-grid::before,
        vector3d-picker .sphere-grid::after {
            content: '';
            position: absolute;
            background: var(--hf-text-dim);
            opacity: 0.2;
        }

        vector3d-picker .sphere-grid::before {
            /* Horizontal line */
            left: 10%;
            right: 10%;
            top: 50%;
            height: 1px;
            transform: translateY(-50%);
        }

        vector3d-picker .sphere-grid::after {
            /* Vertical line */
            top: 10%;
            bottom: 10%;
            left: 50%;
            width: 1px;
            transform: translateX(-50%);
        }

        /* Direction indicator dot */
        vector3d-picker .direction-indicator {
            position: absolute;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: var(--hf-accent);
            border: 2px solid var(--hf-text-bright);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
            transform: translate(-50%, -50%);
            transition: transform 0.05s ease-out;
            pointer-events: none;
            z-index: 1;
        }

        vector3d-picker .direction-indicator::after {
            content: '';
            position: absolute;
            inset: 2px;
            border-radius: 50%;
            background: radial-gradient(
                circle at 30% 30%,
                rgba(255, 255, 255, 0.4) 0%,
                transparent 60%
            );
        }

        /* Direction line from center to indicator */
        vector3d-picker .direction-line {
            position: absolute;
            left: 50%;
            top: 50%;
            height: 2px;
            background: linear-gradient(
                to right,
                transparent 0%,
                var(--hf-accent) 20%,
                var(--hf-accent) 100%
            );
            transform-origin: left center;
            pointer-events: none;
            opacity: 0.6;
        }

        /* Axis indicators */
        vector3d-picker .axis-indicators {
            position: absolute;
            inset: 0;
            pointer-events: none;
        }

        vector3d-picker .axis-indicator {
            position: absolute;
            font-size: 0.625rem;
            font-weight: 700;
            font-family: var(--hf-font-family-mono, monospace);
        }

        vector3d-picker .axis-indicator.x-pos { right: -2px; top: 50%; transform: translateY(-50%); color: var(--hf-red); }
        vector3d-picker .axis-indicator.x-neg { left: 2px; top: 50%; transform: translateY(-50%); color: var(--hf-red); }
        vector3d-picker .axis-indicator.y-pos { top: 2px; left: 50%; transform: translateX(-50%); color: var(--hf-green); }
        vector3d-picker .axis-indicator.y-neg { bottom: 2px; left: 50%; transform: translateX(-50%); color: var(--hf-green); }

        /* Z depth indicator */
        vector3d-picker .z-indicator {
            position: absolute;
            bottom: -24px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.625rem;
            font-family: var(--hf-font-family-mono, monospace);
            color: var(--hf-blue);
            display: flex;
            align-items: center;
            gap: 4px;
        }

        /* Sliders section */
        vector3d-picker .sliders-section {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        vector3d-picker .slider-row {
            display: grid;
            grid-template-columns: 20px 1fr 60px;
            align-items: center;
            gap: 0.5rem;
        }

        vector3d-picker .slider-label {
            font-size: 0.75rem;
            font-weight: 600;
            font-family: var(--hf-font-family-mono, monospace);
        }

        vector3d-picker .slider-label.x { color: var(--hf-red); }
        vector3d-picker .slider-label.y { color: var(--hf-green); }
        vector3d-picker .slider-label.z { color: var(--hf-blue); }

        vector3d-picker .axis-slider {
            -webkit-appearance: none;
            appearance: none;
            width: 100%;
            height: 6px;
            background: var(--hf-bg-elevated);
            border-radius: var(--hf-radius-sm, 0.25rem);
            outline: none;
            cursor: pointer;
        }

        vector3d-picker .axis-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            cursor: pointer;
            border: 2px solid var(--hf-text-bright);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }

        vector3d-picker .axis-slider.x::-webkit-slider-thumb { background: var(--hf-red); }
        vector3d-picker .axis-slider.y::-webkit-slider-thumb { background: var(--hf-green); }
        vector3d-picker .axis-slider.z::-webkit-slider-thumb { background: var(--hf-blue); }

        vector3d-picker .axis-slider::-moz-range-thumb {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            cursor: pointer;
            border: 2px solid var(--hf-text-bright);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }

        vector3d-picker .axis-slider.x::-moz-range-thumb { background: var(--hf-red); }
        vector3d-picker .axis-slider.y::-moz-range-thumb { background: var(--hf-green); }
        vector3d-picker .axis-slider.z::-moz-range-thumb { background: var(--hf-blue); }

        vector3d-picker .axis-input {
            width: 100%;
            padding: 0.25rem 0.375rem;
            font-size: 0.6875rem;
            font-family: var(--hf-font-family-mono, monospace);
            color: var(--hf-text-normal);
            background: var(--hf-bg-elevated);
            border: 1px solid var(--hf-border-subtle);
            border-radius: var(--hf-radius-sm, 0.25rem);
            text-align: right;
            box-sizing: border-box;
        }

        vector3d-picker .axis-input:focus {
            outline: none;
            border-color: var(--hf-accent);
        }

        /* Options row */
        vector3d-picker .options-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            padding-top: 0.5rem;
            border-top: 1px solid var(--hf-border-subtle);
        }

        vector3d-picker .normalize-toggle {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.75rem;
            color: var(--hf-text-dim);
            cursor: pointer;
        }

        vector3d-picker .normalize-toggle input {
            accent-color: var(--hf-accent);
            width: 14px;
            height: 14px;
            cursor: pointer;
        }

        vector3d-picker .magnitude-display {
            font-size: 0.6875rem;
            font-family: var(--hf-font-family-mono, monospace);
            color: var(--hf-text-dim);
        }

        vector3d-picker .reset-button {
            padding: 0.25rem 0.75rem;
            font-size: 0.6875rem;
            color: var(--hf-text-dim);
            background: var(--hf-bg-elevated);
            border: 1px solid var(--hf-border-subtle);
            border-radius: var(--hf-radius-sm, 0.25rem);
            cursor: pointer;
            transition: all 0.15s ease;
        }

        vector3d-picker .reset-button:hover {
            color: var(--hf-text-normal);
            background: var(--hf-bg-muted);
        }
    `;
  document.head.appendChild(styleEl);
}
var Vector3dPicker = class extends HTMLElement {
  static get observedAttributes() {
    return ["value", "disabled", "name", "min", "max", "step", "normalized"];
  }
  constructor() {
    super();
    if (this.constructor.formAssociated) {
      this._internals = this.attachInternals?.();
    }
    this._value = { x: 0, y: 1, z: 0 };
    this._min = -1;
    this._max = 1;
    this._step = 0.01;
    this._normalized = false;
    this._isOpen = false;
    this._isDragging = false;
    this._rendered = false;
    this._listenersAttached = false;
  }
  connectedCallback() {
    if (!this._rendered) {
      this._render();
      this._rendered = true;
    }
    if (!this._listenersAttached) {
      this._setupEventListeners();
      this._listenersAttached = true;
    }
    this._updateDisplay();
    this._updateFormValue();
  }
  disconnectedCallback() {
    this._closeDialog();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    switch (name) {
      case "value":
        this._setValueFromAttribute(newValue);
        break;
      case "disabled":
        this._updateDisabledState();
        break;
      case "min":
        this._min = parseFloat(newValue) || -1;
        this._updateSliderRanges();
        break;
      case "max":
        this._max = parseFloat(newValue) || 1;
        this._updateSliderRanges();
        break;
      case "step":
        this._step = parseFloat(newValue) || 0.01;
        this._updateSliderRanges();
        break;
      case "normalized":
        this._normalized = newValue !== null && newValue !== "false";
        this._updateNormalizeCheckbox();
        break;
    }
  }
  // ========================================================================
  // Public API
  // ========================================================================
  get value() {
    return this._value;
  }
  set value(val) {
    if (typeof val === "string") {
      this._setValueFromAttribute(val);
    } else if (Array.isArray(val) && val.length >= 3) {
      this._value = { x: val[0], y: val[1], z: val[2] };
    } else if (val && typeof val === "object") {
      this._value = {
        x: val.x ?? val[0] ?? 0,
        y: val.y ?? val[1] ?? 0,
        z: val.z ?? val[2] ?? 0
      };
    }
    this._updateDisplay();
    this._updateFormValue();
    this._updateGizmo();
    this._updateSliders();
  }
  get disabled() {
    return this.hasAttribute("disabled");
  }
  set disabled(val) {
    if (val) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }
  get name() {
    return this.getAttribute("name");
  }
  set name(val) {
    if (val) {
      this.setAttribute("name", val);
    } else {
      this.removeAttribute("name");
    }
  }
  get normalized() {
    return this._normalized;
  }
  set normalized(val) {
    this._normalized = !!val;
    if (this._normalized) {
      this.setAttribute("normalized", "");
    } else {
      this.removeAttribute("normalized");
    }
    this._updateNormalizeCheckbox();
  }
  // ========================================================================
  // Private Methods
  // ========================================================================
  _render() {
    this.innerHTML = `
            <button class="vector-button" type="button" aria-haspopup="dialog" aria-expanded="false">
                <span class="vector-preview">
                    <span class="axis"><span class="axis-label x">X</span><span class="x-value">0.00</span></span>
                    <span class="axis"><span class="axis-label y">Y</span><span class="y-value">0.00</span></span>
                    <span class="axis"><span class="axis-label z">Z</span><span class="z-value">0.00</span></span>
                </span>
                <span class="dropdown-arrow">\u25BC</span>
            </button>
            <dialog class="vector-dialog" aria-label="3D Vector picker">
                <div class="dialog-titlebar">
                    <span class="dialog-title">vector</span>
                    <button class="dialog-close" type="button" aria-label="close">\u2715</button>
                </div>
                <div class="dialog-body">
                    <div class="gizmo-container">
                        <div class="sphere-gizmo">
                            <div class="sphere-grid"></div>
                            <div class="axis-indicators">
                                <span class="axis-indicator x-pos">+X</span>
                                <span class="axis-indicator x-neg">-X</span>
                                <span class="axis-indicator y-pos">+Y</span>
                                <span class="axis-indicator y-neg">-Y</span>
                            </div>
                            <div class="direction-line"></div>
                            <div class="direction-indicator"></div>
                            <div class="z-indicator">
                                <span>Z:</span>
                                <span class="z-depth-value">0.00</span>
                            </div>
                        </div>
                    </div>

                    <div class="sliders-section">
                        <div class="slider-row">
                            <span class="slider-label x">X</span>
                            <input type="range" class="axis-slider x" name="x-range" min="-1" max="1" step="0.01" value="0">
                            <input type="text" class="axis-input x-input" name="x-input" value="0.00">
                        </div>
                        <div class="slider-row">
                            <span class="slider-label y">Y</span>
                            <input type="range" class="axis-slider y" name="y-range" min="-1" max="1" step="0.01" value="0">
                            <input type="text" class="axis-input y-input" name="y-input" value="0.00">
                        </div>
                        <div class="slider-row">
                            <span class="slider-label z">Z</span>
                            <input type="range" class="axis-slider z" name="z-range" min="-1" max="1" step="0.01" value="0">
                            <input type="text" class="axis-input z-input" name="z-input" value="0.00">
                        </div>
                    </div>

                    <div class="options-row">
                        <label class="normalize-toggle">
                            <input type="checkbox" class="normalize-checkbox" name="normalize">
                            <span>Normalize</span>
                        </label>
                        <span class="magnitude-display">|v| = 0.00</span>
                        <button class="reset-button" type="button">Reset</button>
                    </div>
                </div>
            </dialog>
        `;
  }
  _setupEventListeners() {
    const button = this.querySelector(".vector-button");
    const dialog = this.querySelector(".vector-dialog");
    const closeBtn = this.querySelector(".dialog-close");
    const sphereGizmo = this.querySelector(".sphere-gizmo");
    const normalizeCheckbox = this.querySelector(".normalize-checkbox");
    const resetButton = this.querySelector(".reset-button");
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      if (this.disabled) return;
      this._toggleDialog();
    });
    button.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this._toggleDialog();
      }
    });
    closeBtn.addEventListener("click", () => {
      this._closeDialog();
    });
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) {
        this._closeDialog();
      }
    });
    dialog.addEventListener("cancel", (e) => {
      e.preventDefault();
      this._closeDialog();
    });
    dialog.addEventListener("close", () => {
      this._onDialogClosed();
    });
    sphereGizmo.addEventListener("mousedown", (e) => this._onGizmoMouseDown(e));
    sphereGizmo.addEventListener("touchstart", (e) => this._onGizmoTouchStart(e), { passive: false });
    document.addEventListener("mousemove", (e) => this._onGizmoMouseMove(e));
    document.addEventListener("mouseup", () => this._onGizmoMouseUp());
    document.addEventListener("touchmove", (e) => this._onGizmoTouchMove(e), { passive: false });
    document.addEventListener("touchend", () => this._onGizmoTouchEnd());
    const sliders = this.querySelectorAll(".axis-slider");
    sliders.forEach((slider) => {
      slider.addEventListener("input", (e) => this._onSliderInput(e));
      slider.addEventListener("change", (e) => this._onSliderChange(e));
    });
    const inputs = this.querySelectorAll(".axis-input");
    inputs.forEach((input) => {
      input.addEventListener("keydown", (e) => this._onInputKeyDown(e));
      input.addEventListener("blur", (e) => this._onInputBlur(e));
    });
    normalizeCheckbox.addEventListener("change", () => {
      this._normalized = normalizeCheckbox.checked;
      if (this._normalized) {
        this._normalizeValue();
      }
      this._updateDisplay();
      this._updateGizmo();
      this._updateSliders();
      this._emitInput();
      this._emitChange();
    });
    resetButton.addEventListener("click", () => {
      this._value = { x: 0, y: 1, z: 0 };
      this._updateDisplay();
      this._updateGizmo();
      this._updateSliders();
      this._updateFormValue();
      this._emitInput();
      this._emitChange();
    });
  }
  _toggleDialog() {
    if (this._isOpen) {
      this._closeDialog();
    } else {
      this._openDialog();
    }
  }
  _openDialog() {
    const dialog = this.querySelector(".vector-dialog");
    const button = this.querySelector(".vector-button");
    this._updateSliders();
    this._updateGizmo();
    this._updateNormalizeCheckbox();
    dialog.showModal();
    button.setAttribute("aria-expanded", "true");
    this.classList.add("dialog-open");
    this._isOpen = true;
  }
  _closeDialog() {
    const dialog = this.querySelector(".vector-dialog");
    if (dialog?.open) {
      dialog.close();
    } else {
      this._onDialogClosed();
    }
  }
  _onDialogClosed() {
    const button = this.querySelector(".vector-button");
    if (button) button.setAttribute("aria-expanded", "false");
    this.classList.remove("dialog-open");
    this._isOpen = false;
  }
  // ========================================================================
  // Gizmo Interaction
  // ========================================================================
  _onGizmoMouseDown(e) {
    e.preventDefault();
    this._isDragging = true;
    this._updateFromGizmoEvent(e);
  }
  _onGizmoMouseMove(e) {
    if (!this._isDragging) return;
    this._updateFromGizmoEvent(e);
  }
  _onGizmoMouseUp() {
    if (this._isDragging) {
      this._isDragging = false;
      this._emitChange();
    }
  }
  _onGizmoTouchStart(e) {
    e.preventDefault();
    this._isDragging = true;
    if (e.touches.length > 0) {
      this._updateFromGizmoEvent(e.touches[0]);
    }
  }
  _onGizmoTouchMove(e) {
    if (!this._isDragging) return;
    e.preventDefault();
    if (e.touches.length > 0) {
      this._updateFromGizmoEvent(e.touches[0]);
    }
  }
  _onGizmoTouchEnd() {
    if (this._isDragging) {
      this._isDragging = false;
      this._emitChange();
    }
  }
  _updateFromGizmoEvent(e) {
    const gizmo = this.querySelector(".sphere-gizmo");
    const rect = gizmo.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const radius = rect.width / 2;
    let nx = (e.clientX - centerX) / radius;
    let ny = -(e.clientY - centerY) / radius;
    const distSq = nx * nx + ny * ny;
    if (distSq > 1) {
      const dist = Math.sqrt(distSq);
      nx /= dist;
      ny /= dist;
    }
    const zSq = 1 - nx * nx - ny * ny;
    let nz = zSq > 0 ? Math.sqrt(zSq) : 0;
    if (e.shiftKey) {
      nz = -nz;
    }
    if (this._normalized) {
      this._value = { x: nx, y: ny, z: nz };
    } else {
      const range = this._max - this._min;
      this._value = {
        x: this._roundToStep(nx * range / 2 + (this._max + this._min) / 2),
        y: this._roundToStep(ny * range / 2 + (this._max + this._min) / 2),
        z: this._roundToStep(nz * range / 2 + (this._max + this._min) / 2)
      };
    }
    this._updateDisplay();
    this._updateGizmo();
    this._updateSliders();
    this._updateFormValue();
    this._emitInput();
  }
  // ========================================================================
  // Slider Interaction
  // ========================================================================
  _onSliderInput(e) {
    const slider = e.target;
    const val = parseFloat(slider.value);
    if (slider.classList.contains("x")) {
      this._value.x = val;
    } else if (slider.classList.contains("y")) {
      this._value.y = val;
    } else if (slider.classList.contains("z")) {
      this._value.z = val;
    }
    if (this._normalized) {
      this._normalizeValue();
    }
    this._updateDisplay();
    this._updateGizmo();
    this._updateSliders();
    this._updateFormValue();
    this._emitInput();
  }
  _onSliderChange() {
    this._emitChange();
  }
  // ========================================================================
  // Input Field Interaction
  // ========================================================================
  _onInputKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      this._applyInputValue(e.target);
      e.target.blur();
    } else if (e.key === "Escape") {
      e.target.blur();
    }
  }
  _onInputBlur(e) {
    this._applyInputValue(e.target);
  }
  _applyInputValue(input) {
    const val = parseFloat(input.value);
    if (isNaN(val)) {
      this._updateSliders();
      return;
    }
    const clampedVal = Math.max(this._min, Math.min(this._max, this._roundToStep(val)));
    if (input.classList.contains("x-input")) {
      this._value.x = clampedVal;
    } else if (input.classList.contains("y-input")) {
      this._value.y = clampedVal;
    } else if (input.classList.contains("z-input")) {
      this._value.z = clampedVal;
    }
    if (this._normalized) {
      this._normalizeValue();
    }
    this._updateDisplay();
    this._updateGizmo();
    this._updateSliders();
    this._updateFormValue();
    this._emitInput();
    this._emitChange();
  }
  // ========================================================================
  // Update Methods
  // ========================================================================
  _updateDisplay() {
    const xVal = this.querySelector(".x-value");
    const yVal = this.querySelector(".y-value");
    const zVal = this.querySelector(".z-value");
    const magDisplay = this.querySelector(".magnitude-display");
    if (xVal) xVal.textContent = this._formatValue(this._value.x);
    if (yVal) yVal.textContent = this._formatValue(this._value.y);
    if (zVal) zVal.textContent = this._formatValue(this._value.z);
    const magnitude = Math.sqrt(
      this._value.x ** 2 + this._value.y ** 2 + this._value.z ** 2
    );
    if (magDisplay) magDisplay.textContent = `|v| = ${magnitude.toFixed(2)}`;
  }
  _updateGizmo() {
    const indicator = this.querySelector(".direction-indicator");
    const line = this.querySelector(".direction-line");
    const zDepthValue = this.querySelector(".z-depth-value");
    const gizmo = this.querySelector(".sphere-gizmo");
    if (!indicator || !gizmo) return;
    const gizmoRect = { width: 180, height: 180 };
    const radius = gizmoRect.width / 2;
    const mag = Math.sqrt(this._value.x ** 2 + this._value.y ** 2 + this._value.z ** 2);
    let nx = 0, ny = 0, nz = 0;
    if (mag > 0) {
      nx = this._value.x / mag;
      ny = this._value.y / mag;
      nz = this._value.z / mag;
    }
    const projX = nx * radius * 0.85 + radius;
    const projY = -ny * radius * 0.85 + radius;
    indicator.style.left = `${projX}px`;
    indicator.style.top = `${projY}px`;
    if (line) {
      const dx = projX - radius;
      const dy = projY - radius;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      line.style.width = `${length}px`;
      line.style.transform = `rotate(${angle}deg)`;
    }
    if (zDepthValue) {
      zDepthValue.textContent = this._formatValue(this._value.z);
    }
    const zFactor = (nz + 1) / 2;
    const scale = 0.7 + zFactor * 0.6;
    const opacity = 0.5 + zFactor * 0.5;
    indicator.style.transform = `translate(-50%, -50%) scale(${scale})`;
    indicator.style.opacity = opacity.toString();
  }
  _updateSliders() {
    const sliderX = this.querySelector(".axis-slider.x");
    const sliderY = this.querySelector(".axis-slider.y");
    const sliderZ = this.querySelector(".axis-slider.z");
    const inputX = this.querySelector(".x-input");
    const inputY = this.querySelector(".y-input");
    const inputZ = this.querySelector(".z-input");
    if (sliderX) sliderX.value = this._value.x;
    if (sliderY) sliderY.value = this._value.y;
    if (sliderZ) sliderZ.value = this._value.z;
    if (inputX) inputX.value = this._formatValue(this._value.x);
    if (inputY) inputY.value = this._formatValue(this._value.y);
    if (inputZ) inputZ.value = this._formatValue(this._value.z);
  }
  _updateSliderRanges() {
    const sliders = this.querySelectorAll(".axis-slider");
    sliders.forEach((slider) => {
      slider.min = this._min;
      slider.max = this._max;
      slider.step = this._step;
    });
  }
  _updateNormalizeCheckbox() {
    const checkbox = this.querySelector(".normalize-checkbox");
    if (checkbox) {
      checkbox.checked = this._normalized;
    }
  }
  _updateDisabledState() {
    const button = this.querySelector(".vector-button");
    if (button) {
      button.disabled = this.disabled;
    }
    if (this.disabled) {
      this._closeDialog();
    }
  }
  // ========================================================================
  // Utility Methods
  // ========================================================================
  _normalizeValue() {
    const mag = Math.sqrt(
      this._value.x ** 2 + this._value.y ** 2 + this._value.z ** 2
    );
    if (mag > 0) {
      this._value.x /= mag;
      this._value.y /= mag;
      this._value.z /= mag;
    }
  }
  _roundToStep(value) {
    return Math.round(value / this._step) * this._step;
  }
  _formatValue(val) {
    const rounded = this._roundToStep(val);
    if (Math.abs(rounded - Math.round(rounded)) < 1e-4) {
      return Math.round(rounded).toString();
    }
    return rounded.toFixed(2);
  }
  _setValueFromAttribute(str) {
    if (!str) return;
    try {
      const parsed = JSON.parse(str);
      if (Array.isArray(parsed) && parsed.length >= 3) {
        this._value = { x: parsed[0], y: parsed[1], z: parsed[2] };
      } else if (parsed && typeof parsed === "object") {
        this._value = {
          x: parsed.x ?? 0,
          y: parsed.y ?? 0,
          z: parsed.z ?? 0
        };
      }
    } catch {
      const parts = str.split(",").map((p) => parseFloat(p.trim()));
      if (parts.length >= 3 && parts.every((p) => !isNaN(p))) {
        this._value = { x: parts[0], y: parts[1], z: parts[2] };
      }
    }
    this._updateDisplay();
    this._updateFormValue();
  }
  _updateFormValue() {
    if (this._internals) {
      const valueStr = JSON.stringify([this._value.x, this._value.y, this._value.z]);
      this._internals.setFormValue(valueStr);
    }
  }
  _emitInput() {
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
  }
  _emitChange() {
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  }
};
__publicField(Vector3dPicker, "formAssociated", true);
customElements.define("vector3d-picker", Vector3dPicker);

// src/components/code-editor/tokenizers/default.js
function defaultTokenizer(line) {
  return [{ type: "text", text: line }];
}

// src/components/code-editor/CodeEditor.js
function tokensToHtml(tokens) {
  return tokens.map((token) => {
    const escaped = token.text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    if (token.type === "text") {
      return escaped;
    }
    return `<span class="hl-${token.type}">${escaped}</span>`;
  }).join("");
}
var CODE_EDITOR_STYLES_ID = "hf-code-editor-styles";
if (!document.getElementById(CODE_EDITOR_STYLES_ID)) {
  const styleEl = document.createElement("style");
  styleEl.id = CODE_EDITOR_STYLES_ID;
  styleEl.textContent = `
        code-editor {
            display: block;
            position: relative;
            font-family: var(--code-editor-font, var(--hf-font-family-mono, ui-monospace, 'Cascadia Mono', 'Consolas', monospace));
            font-size: var(--code-editor-font-size, 0.95rem);
            line-height: var(--code-editor-line-height, 1.6);
            overflow: hidden;
        }

        /* Line numbers gutter */
        code-editor .code-editor-gutter {
            position: absolute;
            top: 0;
            left: 0;
            width: var(--code-editor-gutter-width, 3em);
            pointer-events: none;
            user-select: none;
            text-align: right;
            padding-right: 0.5em;
            box-sizing: border-box;
            color: var(--code-editor-line-number-color, var(--hf-text-dim, #666));
            background: var(--code-editor-gutter-bg, rgba(7, 9, 13, 0.75));
            font: inherit;
            line-height: inherit;
            will-change: transform;
            z-index: 1;
        }

        code-editor .code-editor-gutter .line-number {
            display: block;
            opacity: 0.5;
            box-sizing: border-box;
        }

        code-editor .code-editor-textarea {
            position: absolute;
            top: 0;
            bottom: 0;
            left: var(--code-editor-gutter-width, 3em);
            right: 0;
            margin: 0;
            padding: 0;
            background: transparent;
            border: none !important;
            outline: none !important;
            box-shadow: none !important;
            resize: none;
            font: inherit;
            line-height: inherit;
            letter-spacing: inherit;
            word-spacing: inherit;
            color: transparent;
            caret-color: var(--code-editor-caret-color, var(--hf-accent, #5a7fdd));
            white-space: pre-wrap;
            overflow-wrap: break-word;
            word-break: break-word;
            box-sizing: border-box;
            -webkit-appearance: none;
            appearance: none;
            overflow-y: auto;
            overflow-x: hidden;
            scrollbar-width: none;
            -ms-overflow-style: none;
            z-index: 3;
        }

        code-editor .code-editor-textarea::-webkit-scrollbar {
            width: 0;
            height: 0;
            display: none;
        }

        /* Selection styling */
        code-editor .code-editor-textarea::selection {
            background: var(--code-editor-selection-bg, var(--hf-accent, #5a7fdd));
            color: var(--code-editor-selection-fg, #fff);
        }

        code-editor .code-editor-textarea::-moz-selection {
            background: var(--code-editor-selection-bg, var(--hf-accent, #5a7fdd));
            color: var(--code-editor-selection-fg, #fff);
        }

        /* Display layer - positioned behind textarea for syntax highlighting */
        code-editor .code-editor-display {
            position: absolute;
            top: 0;
            left: var(--code-editor-gutter-width, 3em);
            right: 0;
            pointer-events: none;
            white-space: pre-wrap;
            overflow-wrap: break-word;
            word-break: break-word;
            font: inherit;
            line-height: inherit;
            letter-spacing: inherit;
            word-spacing: inherit;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            will-change: transform;
            z-index: 2;
        }

        code-editor .code-editor-display .code-line {
            display: block;
            background: var(--code-editor-bg, transparent);
            -webkit-box-decoration-break: clone;
            box-decoration-break: clone;
        }

        code-editor .code-editor-display .code-segment {
            background: var(--text-bg-color, #000);
            padding: 0.125em 0;
        }

        /* Focus state */
        code-editor:focus-within {
            outline: 1px solid var(--code-editor-focus-outline, transparent);
        }

        /* Syntax highlighting colors */
        code-editor .hl-comment {
            color: var(--hl-comment, #6a737d);
            font-style: italic;
        }

        code-editor .hl-string {
            color: var(--hl-string, #9ecbff);
        }

        code-editor .hl-number {
            color: var(--hl-number, #79b8ff);
        }

        code-editor .hl-color {
            color: var(--hl-color, #ffab70);
        }

        code-editor .hl-boolean {
            color: var(--hl-boolean, #ff7b72);
        }

        code-editor .hl-null {
            color: var(--hl-null, #ff7b72);
        }

        code-editor .hl-function {
            color: var(--hl-function, #d2a8ff);
        }

        code-editor .hl-parameter {
            color: var(--hl-parameter, #ffa657);
        }

        code-editor .hl-output {
            color: var(--hl-output, #7ee787);
            font-weight: 600;
        }

        code-editor .hl-punctuation {
            color: var(--hl-punctuation, var(--hf-text-normal, #e0e0e0));
        }

        code-editor .hl-operator {
            color: var(--hl-operator, #ff7b72);
        }

        code-editor .hl-identifier {
            color: var(--hl-identifier, var(--hf-text-normal, #e0e0e0));
        }

        /* Selection highlight overlay */
        code-editor .code-editor-selection-highlight {
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 0;
            overflow: hidden;
        }
    `;
  document.head.appendChild(styleEl);
}
var CodeEditor = class extends HTMLElement {
  static get observedAttributes() {
    return [
      "value",
      "spellcheck",
      "placeholder",
      "readonly",
      "disabled",
      "font-family",
      "font-size",
      "background-color",
      "background-opacity",
      "text-color",
      "text-bg-color",
      "caret-color",
      "selection-color",
      "line-numbers"
    ];
  }
  constructor() {
    super();
    this._textarea = null;
    this._display = null;
    this._gutter = null;
    this._rendered = false;
    this._value = "";
    this._showLineNumbers = true;
    this._resizeObserver = null;
    this._tokenizer = defaultTokenizer;
    this._origDescriptor = Object.getOwnPropertyDescriptor(
      HTMLTextAreaElement.prototype,
      "value"
    );
  }
  connectedCallback() {
    if (!this._rendered) {
      this._render();
      this._rendered = true;
    }
    this._attachEventListeners();
    this._applyStyles();
    this.syncDisplay();
    this._resizeObserver = new ResizeObserver(() => {
      this._syncLineHeights();
    });
    this._resizeObserver.observe(this);
  }
  disconnectedCallback() {
    this._detachEventListeners();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    switch (name) {
      case "value":
        this.value = newValue || "";
        break;
      case "spellcheck":
        if (this._textarea) {
          this._textarea.spellcheck = newValue === "true";
        }
        break;
      case "placeholder":
        if (this._textarea) {
          this._textarea.placeholder = newValue || "";
        }
        break;
      case "readonly":
        if (this._textarea) {
          this._textarea.readOnly = newValue !== null;
        }
        break;
      case "disabled":
        if (this._textarea) {
          this._textarea.disabled = newValue !== null;
        }
        break;
      case "line-numbers":
        this._showLineNumbers = newValue !== "false";
        this._updateGutterVisibility();
        this.syncDisplay();
        break;
      case "font-family":
      case "font-size":
      case "background-color":
      case "background-opacity":
      case "text-color":
      case "caret-color":
      case "selection-color":
        this._applyStyles();
        break;
    }
  }
  // =====================================================================
  // Public API
  // =====================================================================
  /**
   * Get the current value
   * @returns {string}
   */
  get value() {
    if (this._textarea) {
      return this._origDescriptor.get.call(this._textarea);
    }
    return this._value;
  }
  /**
   * Set the value
   * @param {string} v
   */
  set value(v) {
    this._value = v ?? "";
    if (this._textarea) {
      this._origDescriptor.set.call(this._textarea, this._value);
      this.syncDisplay();
      requestAnimationFrame(() => this.syncScroll());
    }
  }
  /**
   * Get the current tokenizer function
   * @returns {Function}
   */
  get tokenizer() {
    return this._tokenizer;
  }
  /**
   * Set a custom tokenizer function
   * @param {Function} fn - A function (line: string) => Array<{type: string, text: string}>
   */
  set tokenizer(fn) {
    this.setTokenizer(fn);
  }
  /**
   * Set a custom tokenizer function and re-render
   * @param {Function} fn - A function (line: string) => Array<{type: string, text: string}>
   */
  setTokenizer(fn) {
    if (typeof fn !== "function") {
      throw new TypeError("Tokenizer must be a function");
    }
    this._tokenizer = fn;
    if (this._rendered) {
      this.syncDisplay();
    }
  }
  /**
   * Get the textarea element for direct access if needed
   * @returns {HTMLTextAreaElement|null}
   */
  getTextarea() {
    return this._textarea;
  }
  /**
   * Get the display element for direct access if needed
   * @returns {HTMLElement|null}
   */
  getDisplay() {
    return this._display;
  }
  /**
   * Focus the editor
   */
  focus() {
    this._textarea?.focus();
  }
  /**
   * Blur the editor
   */
  blur() {
    this._textarea?.blur();
  }
  /**
   * Select all text
   */
  selectAll() {
    if (this._textarea) {
      this._textarea.select();
    }
  }
  /**
   * Get selection start
   * @returns {number}
   */
  get selectionStart() {
    return this._textarea?.selectionStart ?? 0;
  }
  /**
   * Set selection start
   * @param {number} v
   */
  set selectionStart(v) {
    if (this._textarea) {
      this._textarea.selectionStart = v;
    }
  }
  /**
   * Get selection end
   * @returns {number}
   */
  get selectionEnd() {
    return this._textarea?.selectionEnd ?? 0;
  }
  /**
   * Set selection end
   * @param {number} v
   */
  set selectionEnd(v) {
    if (this._textarea) {
      this._textarea.selectionEnd = v;
    }
  }
  /**
   * Set selection range
   * @param {number} start
   * @param {number} end
   * @param {string} [direction]
   */
  setSelectionRange(start, end, direction) {
    this._textarea?.setSelectionRange(start, end, direction);
  }
  /**
   * Sync the display element with the textarea content.
   * Converts plain text to syntax-highlighted HTML spans using the current tokenizer.
   */
  syncDisplay() {
    if (!this._display || !this._textarea) return;
    const lines = this.value.split("\n");
    this._display.innerHTML = lines.map((line) => {
      const tokens = this._tokenizer(line);
      const highlighted = tokensToHtml(tokens);
      return `<span class="code-line"><span class="code-segment">${highlighted}</span>
</span>`;
    }).join("");
    if (this._gutter && this._showLineNumbers) {
      this._gutter.innerHTML = lines.map(
        (_, i) => `<span class="line-number">${i + 1}</span>`
      ).join("");
    }
    requestAnimationFrame(() => this._syncLineHeights());
  }
  /**
   * Sync the display scroll position with the textarea
   */
  syncScroll() {
    if (!this._textarea) return;
    const scrollTop = this._textarea.scrollTop;
    if (this._display) {
      this._display.style.transform = `translateY(${-scrollTop}px)`;
    }
    if (this._gutter) {
      this._gutter.style.transform = `translateY(${-scrollTop}px)`;
    }
  }
  // =====================================================================
  // Private Methods
  // =====================================================================
  /**
   * Render the component structure
   * @private
   */
  _render() {
    this._showLineNumbers = this.getAttribute("line-numbers") !== "false";
    this._gutter = document.createElement("div");
    this._gutter.className = "code-editor-gutter";
    this._gutter.setAttribute("aria-hidden", "true");
    this._textarea = document.createElement("textarea");
    this._textarea.className = "code-editor-textarea";
    this._textarea.name = "code-editor-textarea";
    this._textarea.spellcheck = this.getAttribute("spellcheck") === "true";
    this._textarea.placeholder = this.getAttribute("placeholder") || "";
    this._textarea.readOnly = this.hasAttribute("readonly");
    this._textarea.disabled = this.hasAttribute("disabled");
    this._display = document.createElement("div");
    this._display.className = "code-editor-display";
    this._display.setAttribute("aria-hidden", "true");
    this.appendChild(this._gutter);
    this.appendChild(this._display);
    this.appendChild(this._textarea);
    this._updateGutterVisibility();
    if (this._value) {
      this._origDescriptor.set.call(this._textarea, this._value);
    }
    const self = this;
    Object.defineProperty(this._textarea, "value", {
      get() {
        return self._origDescriptor.get.call(this);
      },
      set(v) {
        self._origDescriptor.set.call(this, v);
        self.syncDisplay();
        requestAnimationFrame(() => self.syncScroll());
      }
    });
  }
  /**
   * Apply custom styles from attributes
   * @private
   */
  _applyStyles() {
    const fontFamily = this.getAttribute("font-family");
    const fontSize = this.getAttribute("font-size");
    const bgColor = this.getAttribute("background-color");
    const bgOpacity = this.getAttribute("background-opacity");
    const textColor = this.getAttribute("text-color");
    const textBgColor = this.getAttribute("text-bg-color");
    const caretColor = this.getAttribute("caret-color");
    const selectionColor = this.getAttribute("selection-color");
    if (fontFamily) {
      this.style.setProperty("--code-editor-font", fontFamily);
    }
    if (fontSize) {
      this.style.setProperty("--code-editor-font-size", fontSize);
    }
    if (bgColor) {
      const opacity = bgOpacity ? parseFloat(bgOpacity) : 0.85;
      this.style.setProperty("--code-editor-bg", this._colorWithOpacity(bgColor, opacity));
    } else if (bgOpacity) {
      const opacity = parseFloat(bgOpacity);
      this.style.setProperty("--code-editor-bg", `rgba(7, 9, 13, ${opacity})`);
    }
    if (textColor) {
      this.style.setProperty("--code-editor-text-color", textColor);
    }
    if (textBgColor) {
      this.style.setProperty("--text-bg-color", textBgColor);
    }
    if (caretColor) {
      this.style.setProperty("--code-editor-caret-color", caretColor);
    }
    if (selectionColor) {
      this.style.setProperty("--code-editor-selection-bg", selectionColor);
    }
  }
  /**
   * Convert a color to rgba with specified opacity
   * @param {string} color - CSS color value
   * @param {number} opacity - Opacity value 0-1
   * @returns {string} RGBA color string
   * @private
   */
  _colorWithOpacity(color, opacity) {
    if (color.startsWith("rgba") || color.startsWith("hsla")) {
      return color;
    }
    if (color.startsWith("#")) {
      const hex = color.slice(1);
      const bigint = parseInt(hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex, 16);
      const r = bigint >> 16 & 255;
      const g = bigint >> 8 & 255;
      const b = bigint & 255;
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    if (color.startsWith("rgb(")) {
      return color.replace("rgb(", "rgba(").replace(")", `, ${opacity})`);
    }
    return `color-mix(in srgb, ${color} ${opacity * 100}%, transparent ${(1 - opacity) * 100}%)`;
  }
  /**
   * Update gutter visibility based on line-numbers setting
   * @private
   */
  _updateGutterVisibility() {
    if (!this._gutter) return;
    if (this._showLineNumbers) {
      this._gutter.style.display = "";
      this.style.setProperty("--code-editor-gutter-width", "3em");
    } else {
      this._gutter.style.display = "none";
      this.style.setProperty("--code-editor-gutter-width", "0");
    }
  }
  /**
   * Sync line number heights with code line heights to handle wrapping
   * @private
   */
  _syncLineHeights() {
    if (!this._gutter || !this._display || !this._showLineNumbers) return;
    const codeLines = this._display.querySelectorAll(".code-line");
    const lineNumbers = this._gutter.querySelectorAll(".line-number");
    if (codeLines.length !== lineNumbers.length) return;
    for (let i = 0; i < codeLines.length; i++) {
      const codeLineHeight = codeLines[i].getBoundingClientRect().height;
      lineNumbers[i].style.height = `${codeLineHeight}px`;
    }
  }
  /**
   * Attach event listeners
   * @private
   */
  _attachEventListeners() {
    if (!this._textarea) return;
    this._boundScrollHandler = () => this.syncScroll();
    this._boundInputHandler = (e) => this._handleInput(e);
    this._boundKeydownHandler = (e) => this._handleKeydown(e);
    this._textarea.addEventListener("scroll", this._boundScrollHandler, { passive: true });
    this._textarea.addEventListener("input", this._boundInputHandler);
    this._textarea.addEventListener("keydown", this._boundKeydownHandler);
  }
  /**
   * Detach event listeners
   * @private
   */
  _detachEventListeners() {
    if (!this._textarea) return;
    if (this._boundScrollHandler) {
      this._textarea.removeEventListener("scroll", this._boundScrollHandler);
    }
    if (this._boundInputHandler) {
      this._textarea.removeEventListener("input", this._boundInputHandler);
    }
    if (this._boundKeydownHandler) {
      this._textarea.removeEventListener("keydown", this._boundKeydownHandler);
    }
  }
  /**
   * Handle input events
   * @private
   */
  _handleInput() {
    this.syncDisplay();
    requestAnimationFrame(() => this.syncScroll());
    this.dispatchEvent(new CustomEvent("input", {
      bubbles: true,
      composed: true,
      detail: { value: this.value }
    }));
  }
  /**
   * Handle keydown events
   * @param {KeyboardEvent} e
   * @private
   */
  _handleKeydown(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      this.dispatchEvent(new CustomEvent("forcerecompile", {
        bubbles: true,
        composed: true
      }));
    }
  }
};
customElements.define("code-editor", CodeEditor);

// src/components/code-editor/codeEditorThemes.js
var EDITOR_THEMES = {
  // Default dark theme - GitHub Dark inspired
  default: {
    name: "GitHub Dark",
    colors: {
      "--hl-comment": "#6a737d",
      "--hl-string": "#9ecbff",
      "--hl-number": "#79b8ff",
      "--hl-color": "#ffab70",
      "--hl-boolean": "#ff7b72",
      "--hl-null": "#ff7b72",
      "--hl-function": "#d2a8ff",
      "--hl-parameter": "#ffa657",
      "--hl-output": "#7ee787",
      "--hl-punctuation": "#e0e0e0",
      "--hl-operator": "#ff7b72",
      "--hl-identifier": "#e0e0e0",
      "--text-bg-color": "#000",
      "--code-editor-caret-color": "#5a7fdd",
      "--code-editor-selection-bg": "#5a7fdd",
      "--code-editor-selection-fg": "#ffffff",
      "--code-editor-gutter-bg": "rgba(7, 9, 13, 0.75)",
      "--code-editor-line-number-color": "#666"
    }
  },
  // Monokai - Classic sublime text theme
  monokai: {
    name: "Monokai",
    colors: {
      "--hl-comment": "#75715e",
      "--hl-string": "#e6db74",
      "--hl-number": "#ae81ff",
      "--hl-color": "#fd971f",
      "--hl-boolean": "#ae81ff",
      "--hl-null": "#ae81ff",
      "--hl-function": "#a6e22e",
      "--hl-parameter": "#fd971f",
      "--hl-output": "#66d9ef",
      "--hl-punctuation": "#f8f8f2",
      "--hl-operator": "#f92672",
      "--hl-identifier": "#f8f8f2",
      "--text-bg-color": "#272822",
      "--code-editor-caret-color": "#f8f8f2",
      "--code-editor-selection-bg": "#49483e",
      "--code-editor-selection-fg": "#f8f8f2",
      "--code-editor-gutter-bg": "rgba(39, 40, 34, 0.9)",
      "--code-editor-line-number-color": "#90908a"
    }
  },
  // Dracula - Popular dark theme
  dracula: {
    name: "Dracula",
    colors: {
      "--hl-comment": "#6272a4",
      "--hl-string": "#f1fa8c",
      "--hl-number": "#bd93f9",
      "--hl-color": "#ffb86c",
      "--hl-boolean": "#bd93f9",
      "--hl-null": "#bd93f9",
      "--hl-function": "#50fa7b",
      "--hl-parameter": "#ffb86c",
      "--hl-output": "#8be9fd",
      "--hl-punctuation": "#f8f8f2",
      "--hl-operator": "#ff79c6",
      "--hl-identifier": "#f8f8f2",
      "--text-bg-color": "#282a36",
      "--code-editor-caret-color": "#f8f8f2",
      "--code-editor-selection-bg": "#44475a",
      "--code-editor-selection-fg": "#f8f8f2",
      "--code-editor-gutter-bg": "rgba(40, 42, 54, 0.9)",
      "--code-editor-line-number-color": "#6272a4"
    }
  },
  // Nord - Cool, arctic color palette
  nord: {
    name: "Nord",
    colors: {
      "--hl-comment": "#616e88",
      "--hl-string": "#a3be8c",
      "--hl-number": "#b48ead",
      "--hl-color": "#d08770",
      "--hl-boolean": "#b48ead",
      "--hl-null": "#b48ead",
      "--hl-function": "#88c0d0",
      "--hl-parameter": "#d08770",
      "--hl-output": "#8fbcbb",
      "--hl-punctuation": "#d8dee9",
      "--hl-operator": "#81a1c1",
      "--hl-identifier": "#d8dee9",
      "--text-bg-color": "#2e3440",
      "--code-editor-caret-color": "#d8dee9",
      "--code-editor-selection-bg": "#434c5e",
      "--code-editor-selection-fg": "#eceff4",
      "--code-editor-gutter-bg": "rgba(46, 52, 64, 0.9)",
      "--code-editor-line-number-color": "#4c566a"
    }
  },
  // Solarized Dark - Low contrast dark theme
  solarizedDark: {
    name: "Solarized Dark",
    colors: {
      "--hl-comment": "#586e75",
      "--hl-string": "#2aa198",
      "--hl-number": "#d33682",
      "--hl-color": "#cb4b16",
      "--hl-boolean": "#d33682",
      "--hl-null": "#d33682",
      "--hl-function": "#268bd2",
      "--hl-parameter": "#cb4b16",
      "--hl-output": "#859900",
      "--hl-punctuation": "#839496",
      "--hl-operator": "#dc322f",
      "--hl-identifier": "#839496",
      "--text-bg-color": "#002b36",
      "--code-editor-caret-color": "#839496",
      "--code-editor-selection-bg": "#073642",
      "--code-editor-selection-fg": "#93a1a1",
      "--code-editor-gutter-bg": "rgba(0, 43, 54, 0.9)",
      "--code-editor-line-number-color": "#586e75"
    }
  },
  // Solarized Light - Light theme variant
  solarizedLight: {
    name: "Solarized Light",
    colors: {
      "--hl-comment": "#93a1a1",
      "--hl-string": "#2aa198",
      "--hl-number": "#d33682",
      "--hl-color": "#cb4b16",
      "--hl-boolean": "#d33682",
      "--hl-null": "#d33682",
      "--hl-function": "#268bd2",
      "--hl-parameter": "#cb4b16",
      "--hl-output": "#859900",
      "--hl-punctuation": "#657b83",
      "--hl-operator": "#dc322f",
      "--hl-identifier": "#657b83",
      "--text-bg-color": "#fdf6e3",
      "--code-editor-caret-color": "#657b83",
      "--code-editor-selection-bg": "#eee8d5",
      "--code-editor-selection-fg": "#586e75",
      "--code-editor-gutter-bg": "rgba(253, 246, 227, 0.95)",
      "--code-editor-line-number-color": "#93a1a1"
    }
  },
  // One Dark - Atom editor theme
  oneDark: {
    name: "One Dark",
    colors: {
      "--hl-comment": "#5c6370",
      "--hl-string": "#98c379",
      "--hl-number": "#d19a66",
      "--hl-color": "#d19a66",
      "--hl-boolean": "#d19a66",
      "--hl-null": "#d19a66",
      "--hl-function": "#61afef",
      "--hl-parameter": "#e5c07b",
      "--hl-output": "#56b6c2",
      "--hl-punctuation": "#abb2bf",
      "--hl-operator": "#c678dd",
      "--hl-identifier": "#abb2bf",
      "--text-bg-color": "#282c34",
      "--code-editor-caret-color": "#528bff",
      "--code-editor-selection-bg": "#3e4451",
      "--code-editor-selection-fg": "#abb2bf",
      "--code-editor-gutter-bg": "rgba(40, 44, 52, 0.9)",
      "--code-editor-line-number-color": "#4b5263"
    }
  },
  // GitHub Light - Light mode theme
  githubLight: {
    name: "GitHub Light",
    colors: {
      "--hl-comment": "#6a737d",
      "--hl-string": "#032f62",
      "--hl-number": "#005cc5",
      "--hl-color": "#e36209",
      "--hl-boolean": "#005cc5",
      "--hl-null": "#005cc5",
      "--hl-function": "#6f42c1",
      "--hl-parameter": "#e36209",
      "--hl-output": "#22863a",
      "--hl-punctuation": "#24292e",
      "--hl-operator": "#d73a49",
      "--hl-identifier": "#24292e",
      "--text-bg-color": "#ffffff",
      "--code-editor-caret-color": "#24292e",
      "--code-editor-selection-bg": "#c8e1ff",
      "--code-editor-selection-fg": "#24292e",
      "--code-editor-gutter-bg": "rgba(255, 255, 255, 0.95)",
      "--code-editor-line-number-color": "#959da5"
    }
  }
};
var THEME_KEYS = Object.keys(EDITOR_THEMES);
function applyEditorTheme(editorElement, themeName) {
  const theme = EDITOR_THEMES[themeName] || EDITOR_THEMES.default;
  for (const [property, value] of Object.entries(theme.colors)) {
    editorElement.style.setProperty(property, value);
  }
}
function applyEditorThemeGlobal(themeName) {
  const theme = EDITOR_THEMES[themeName] || EDITOR_THEMES.default;
  const editors = document.querySelectorAll("code-editor");
  editors.forEach((editor) => {
    for (const [property, value] of Object.entries(theme.colors)) {
      editor.style.setProperty(property, value);
    }
  });
}

// src/components/code-editor/tokenizers/dsl.js
var TokenType = {
  COMMENT: "comment",
  STRING: "string",
  NUMBER: "number",
  COLOR: "color",
  BOOLEAN: "boolean",
  NULL: "null",
  KEYWORD: "keyword",
  FUNCTION: "function",
  PARAMETER: "parameter",
  OUTPUT: "output",
  PUNCTUATION: "punctuation",
  OPERATOR: "operator",
  IDENTIFIER: "identifier",
  TEXT: "text"
};
var DSL_KEYWORDS = /* @__PURE__ */ new Set(["true", "false", "null"]);
var DSL_OUTPUTS = /* @__PURE__ */ new Set(["o0", "o1", "o2", "o3", "o4", "o5", "o6", "o7"]);
function dslTokenizer(line) {
  const tokens = [];
  let i = 0;
  const length = line.length;
  function peek(offset = 0) {
    return line[i + offset];
  }
  function isDigit(ch) {
    return ch >= "0" && ch <= "9";
  }
  function isHex(ch) {
    return isDigit(ch) || ch >= "a" && ch <= "f" || ch >= "A" && ch <= "F";
  }
  function isIdentStart(ch) {
    return ch >= "A" && ch <= "Z" || ch >= "a" && ch <= "z" || ch === "_";
  }
  function isIdent(ch) {
    return isIdentStart(ch) || isDigit(ch);
  }
  while (i < length) {
    const ch = peek();
    if (ch === "/" && peek(1) === "/") {
      tokens.push({ type: TokenType.COMMENT, text: line.slice(i) });
      break;
    }
    if (ch === "/" && peek(1) === "*") {
      let commentEnd = line.indexOf("*/", i + 2);
      if (commentEnd === -1) {
        tokens.push({ type: TokenType.COMMENT, text: line.slice(i) });
        break;
      } else {
        tokens.push({ type: TokenType.COMMENT, text: line.slice(i, commentEnd + 2) });
        i = commentEnd + 2;
        continue;
      }
    }
    if (ch === " " || ch === "	") {
      let ws = "";
      while (i < length && (peek() === " " || peek() === "	")) {
        ws += line[i++];
      }
      tokens.push({ type: TokenType.TEXT, text: ws });
      continue;
    }
    if (ch === '"' || ch === "'") {
      const quote = ch;
      let str = ch;
      i++;
      while (i < length && peek() !== quote) {
        if (peek() === "\\" && i + 1 < length) {
          str += line[i++];
        }
        str += line[i++];
      }
      if (i < length) {
        str += line[i++];
      }
      tokens.push({ type: TokenType.STRING, text: str });
      continue;
    }
    if (ch === "#") {
      let color = "#";
      i++;
      while (i < length && isHex(peek())) {
        color += line[i++];
      }
      tokens.push({ type: TokenType.COLOR, text: color });
      continue;
    }
    if (isDigit(ch) || ch === "." && isDigit(peek(1))) {
      let num = "";
      if (ch === ".") {
        num = "0";
      }
      while (i < length && isDigit(peek())) {
        num += line[i++];
      }
      if (peek() === ".") {
        num += line[i++];
        while (i < length && isDigit(peek())) {
          num += line[i++];
        }
      }
      tokens.push({ type: TokenType.NUMBER, text: num });
      continue;
    }
    if (ch === "+" || ch === "-" || ch === "*" || ch === "/" || ch === "?" || ch === "<" || ch === ">" || ch === "=") {
      tokens.push({ type: TokenType.OPERATOR, text: ch });
      i++;
      continue;
    }
    if (ch === "(" || ch === ")" || ch === "{" || ch === "}" || ch === "[" || ch === "]" || ch === "," || ch === ":" || ch === ".") {
      tokens.push({ type: TokenType.PUNCTUATION, text: ch });
      i++;
      continue;
    }
    if (isIdentStart(ch)) {
      let id = "";
      while (i < length && isIdent(peek())) {
        id += line[i++];
      }
      if (DSL_KEYWORDS.has(id)) {
        tokens.push({ type: id === "null" ? TokenType.NULL : TokenType.BOOLEAN, text: id });
      } else if (DSL_OUTPUTS.has(id)) {
        tokens.push({ type: TokenType.OUTPUT, text: id });
      } else if (peek() === "(") {
        tokens.push({ type: TokenType.FUNCTION, text: id });
      } else if (peek() === ":") {
        tokens.push({ type: TokenType.PARAMETER, text: id });
      } else {
        tokens.push({ type: TokenType.IDENTIFIER, text: id });
      }
      continue;
    }
    tokens.push({ type: TokenType.TEXT, text: ch });
    i++;
  }
  return tokens;
}
export {
  CodeEditor,
  ColorPicker,
  ColorSwatch,
  ColorWheel,
  DropdownItem,
  DropdownMenu,
  EDITOR_THEMES,
  GradientStops,
  ImageMagnifier,
  JustifyButtonGroup,
  SelectDropdown,
  SliderValue,
  THEME_KEYS,
  ToggleSwitch,
  Vector3dPicker,
  applyEditorTheme,
  applyEditorThemeGlobal,
  clamp,
  closeTopmost,
  dslTokenizer,
  gamutMapLinearRGB,
  getMaxAB,
  getMaxChroma,
  hasOpenEscapeables,
  hsvToRgb,
  initEscapeHandler,
  initializeTooltips,
  isInGamut,
  linearRGBToOKLab,
  linearRGBToSRGB,
  linearToSRGB,
  normalizeHue,
  okLabToLinearRGB,
  okLabToOKLCH,
  oklabToRgb,
  oklchToOKLab,
  oklchToRgb,
  oklchToRgbRaw,
  parseHex,
  registerEscapeable,
  rgbToHex,
  rgbToHexWithAlpha,
  rgbToHsv,
  rgbToOklab,
  rgbToOklch,
  roundTo,
  sRGBToLinear,
  sRGBToLinearRGB,
  showError,
  showInfo,
  showSuccess,
  showToast,
  showWarning,
  unregisterEscapeable
};
