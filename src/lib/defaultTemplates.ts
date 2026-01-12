/**
 * Default NPI Phase Templates
 *
 * Industry-standard hardware NPI phase templates:
 * - EVT (Engineering Validation Test)
 * - DVT (Design Validation Test)
 * - PVT (Production Validation Test)
 * - MP (Mass Production)
 */

export interface DefaultPhase {
  name: string
  description: string
  durationWeeks: number
  order: number
}

export interface DefaultTemplate {
  name: string
  description: string
  isDefault: boolean
  phases: DefaultPhase[]
}

/**
 * Standard hardware NPI phase template
 * Common across most hardware product development
 */
export const STANDARD_NPI_TEMPLATE: DefaultTemplate = {
  name: "Standard NPI",
  description: "Standard hardware NPI phases (EVT → DVT → PVT → MP)",
  isDefault: true,
  phases: [
    {
      name: "EVT",
      description:
        "Engineering Validation Test - Validate core functionality and design feasibility",
      durationWeeks: 12,
      order: 1,
    },
    {
      name: "DVT",
      description:
        "Design Validation Test - Verify design meets specifications and requirements",
      durationWeeks: 10,
      order: 2,
    },
    {
      name: "PVT",
      description:
        "Production Validation Test - Validate manufacturability and production processes",
      durationWeeks: 8,
      order: 3,
    },
    {
      name: "MP",
      description: "Mass Production - Full-scale manufacturing ramp",
      durationWeeks: 4,
      order: 4,
    },
  ],
}

/**
 * Fast-track template for rapid development cycles
 * Compressed timeline with overlapping phases
 */
export const FAST_TRACK_TEMPLATE: DefaultTemplate = {
  name: "Fast Track",
  description: "Accelerated NPI for rapid product iteration",
  isDefault: false,
  phases: [
    {
      name: "EVT",
      description: "Engineering Validation - Core functionality validation",
      durationWeeks: 6,
      order: 1,
    },
    {
      name: "DVT",
      description: "Design Validation - Design and spec verification",
      durationWeeks: 6,
      order: 2,
    },
    {
      name: "PVT",
      description: "Production Validation - Manufacturing readiness",
      durationWeeks: 4,
      order: 3,
    },
    {
      name: "Pilot Run",
      description: "Small batch production for final validation",
      durationWeeks: 2,
      order: 4,
    },
    {
      name: "MP",
      description: "Mass Production ramp",
      durationWeeks: 2,
      order: 5,
    },
  ],
}

/**
 * Extended template for complex products
 * Additional validation phases for high-reliability products
 */
export const EXTENDED_NPI_TEMPLATE: DefaultTemplate = {
  name: "Extended NPI",
  description: "Extended validation for complex or high-reliability products",
  isDefault: false,
  phases: [
    {
      name: "Concept",
      description: "Concept validation and feasibility study",
      durationWeeks: 4,
      order: 1,
    },
    {
      name: "EVT1",
      description: "Engineering Validation Test - Phase 1",
      durationWeeks: 8,
      order: 2,
    },
    {
      name: "EVT2",
      description: "Engineering Validation Test - Phase 2",
      durationWeeks: 8,
      order: 3,
    },
    {
      name: "DVT",
      description: "Design Validation Test",
      durationWeeks: 12,
      order: 4,
    },
    {
      name: "PVT",
      description: "Production Validation Test",
      durationWeeks: 10,
      order: 5,
    },
    {
      name: "Pilot",
      description: "Pilot production run",
      durationWeeks: 6,
      order: 6,
    },
    {
      name: "MP",
      description: "Mass Production",
      durationWeeks: 4,
      order: 7,
    },
  ],
}

/**
 * Software-focused template
 * For products with significant software/firmware development
 */
export const SOFTWARE_FOCUSED_TEMPLATE: DefaultTemplate = {
  name: "Software-Focused NPI",
  description: "NPI template emphasizing software/firmware development",
  isDefault: false,
  phases: [
    {
      name: "Alpha",
      description: "Alpha software release - core features functional",
      durationWeeks: 8,
      order: 1,
    },
    {
      name: "Beta",
      description: "Beta software release - feature complete",
      durationWeeks: 8,
      order: 2,
    },
    {
      name: "EVT",
      description: "Engineering Validation with integrated software",
      durationWeeks: 6,
      order: 3,
    },
    {
      name: "DVT",
      description: "Design Validation - hardware and software integration",
      durationWeeks: 8,
      order: 4,
    },
    {
      name: "PVT",
      description: "Production Validation with final firmware",
      durationWeeks: 6,
      order: 5,
    },
    {
      name: "MP",
      description: "Mass Production",
      durationWeeks: 4,
      order: 6,
    },
  ],
}

/**
 * All default templates
 */
export const DEFAULT_TEMPLATES: DefaultTemplate[] = [
  STANDARD_NPI_TEMPLATE,
  FAST_TRACK_TEMPLATE,
  EXTENDED_NPI_TEMPLATE,
  SOFTWARE_FOCUSED_TEMPLATE,
]

/**
 * Get template by name
 */
export function getTemplateByName(name: string): DefaultTemplate | undefined {
  return DEFAULT_TEMPLATES.find((t) => t.name === name)
}

/**
 * Get default template
 */
export function getDefaultTemplate(): DefaultTemplate {
  return STANDARD_NPI_TEMPLATE
}
