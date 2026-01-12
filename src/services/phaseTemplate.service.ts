/**
 * Phase Template Service
 *
 * Manages NPI phase templates and their phases.
 * Supports creating projects from templates.
 */

import { DEFAULT_TEMPLATES, DefaultTemplate } from "@/lib/defaultTemplates"

type UUID = string

interface PhaseTemplate {
  id: string
  organizationId: string
  name: string
  description?: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

interface PhaseTemplatePhase {
  id: string
  templateId: string
  name: string
  description?: string
  durationWeeks?: number
  order: number
  createdAt: string
}

interface PhaseTemplateWithPhases extends PhaseTemplate {
  phases: PhaseTemplatePhase[]
}

interface CreateTemplateInput {
  organizationId: UUID
  name: string
  description?: string
  isDefault?: boolean
}

interface CreateTemplatePhaseInput {
  templateId: UUID
  name: string
  description?: string
  durationWeeks?: number
  order: number
}

interface UpdateTemplateInput {
  id: UUID
  name?: string
  description?: string
  isDefault?: boolean
}

/**
 * Phase Template Service
 */
export class PhaseTemplateService {
  /**
   * List all templates for an organization
   */
  async listTemplates(organizationId: UUID): Promise<PhaseTemplate[]> {
    // TODO: Replace with generated SDK call
    throw new Error("SDK not generated. Run: firebase dataconnect:sdk:generate")
  }

  /**
   * Get a single template with all phases
   */
  async getTemplate(id: UUID): Promise<PhaseTemplateWithPhases | null> {
    // TODO: Replace with generated SDK call
    throw new Error("SDK not generated. Run: firebase dataconnect:sdk:generate")
  }

  /**
   * Get default templates for an organization
   */
  async getDefaultTemplates(organizationId: UUID): Promise<PhaseTemplateWithPhases[]> {
    // TODO: Replace with generated SDK call
    throw new Error("SDK not generated. Run: firebase dataconnect:sdk:generate")
  }

  /**
   * Create a new template
   */
  async createTemplate(input: CreateTemplateInput): Promise<PhaseTemplate> {
    // Validate input
    if (!input.name || input.name.trim().length === 0) {
      throw new Error("Template name is required")
    }

    if (!input.organizationId) {
      throw new Error("Organization ID is required")
    }

    // TODO: Replace with generated SDK call
    throw new Error("SDK not generated. Run: firebase dataconnect:sdk:generate")
  }

  /**
   * Update a template
   */
  async updateTemplate(input: UpdateTemplateInput): Promise<PhaseTemplate> {
    // Validate input
    if (!input.id) {
      throw new Error("Template ID is required")
    }

    if (input.name !== undefined && input.name.trim().length === 0) {
      throw new Error("Template name cannot be empty")
    }

    // TODO: Replace with generated SDK call
    throw new Error("SDK not generated. Run: firebase dataconnect:sdk:generate")
  }

  /**
   * Delete a template
   *
   * WARNING: This will delete all phases within the template.
   * Projects using this template will keep their copied phases.
   */
  async deleteTemplate(id: UUID): Promise<void> {
    if (!id) {
      throw new Error("Template ID is required")
    }

    // TODO: Replace with generated SDK call
    throw new Error("SDK not generated. Run: firebase dataconnect:sdk:generate")
  }

  /**
   * Add a phase to a template
   */
  async createPhase(input: CreateTemplatePhaseInput): Promise<PhaseTemplatePhase> {
    // Validate input
    if (!input.name || input.name.trim().length === 0) {
      throw new Error("Phase name is required")
    }

    if (!input.templateId) {
      throw new Error("Template ID is required")
    }

    if (input.order < 0) {
      throw new Error("Phase order must be non-negative")
    }

    if (input.durationWeeks !== undefined && input.durationWeeks < 0) {
      throw new Error("Duration weeks must be non-negative")
    }

    // TODO: Replace with generated SDK call
    throw new Error("SDK not generated. Run: firebase dataconnect:sdk:generate")
  }

  /**
   * Update a template phase
   */
  async updatePhase(
    id: UUID,
    updates: Partial<Omit<CreateTemplatePhaseInput, "templateId">>
  ): Promise<PhaseTemplatePhase> {
    if (!id) {
      throw new Error("Phase ID is required")
    }

    if (updates.name !== undefined && updates.name.trim().length === 0) {
      throw new Error("Phase name cannot be empty")
    }

    if (updates.order !== undefined && updates.order < 0) {
      throw new Error("Phase order must be non-negative")
    }

    if (updates.durationWeeks !== undefined && updates.durationWeeks < 0) {
      throw new Error("Duration weeks must be non-negative")
    }

    // TODO: Replace with generated SDK call
    throw new Error("SDK not generated. Run: firebase dataconnect:sdk:generate")
  }

  /**
   * Delete a template phase
   */
  async deletePhase(id: UUID): Promise<void> {
    if (!id) {
      throw new Error("Phase ID is required")
    }

    // TODO: Replace with generated SDK call
    throw new Error("SDK not generated. Run: firebase dataconnect:sdk:generate")
  }

  /**
   * Initialize default templates for a new organization
   *
   * Creates the 4 standard NPI templates when an organization is first set up.
   * This should be called during organization onboarding.
   */
  async initializeDefaultTemplates(organizationId: UUID): Promise<PhaseTemplate[]> {
    if (!organizationId) {
      throw new Error("Organization ID is required")
    }

    const createdTemplates: PhaseTemplate[] = []

    for (const defaultTemplate of DEFAULT_TEMPLATES) {
      try {
        // Create the template
        const template = await this.createTemplate({
          organizationId,
          name: defaultTemplate.name,
          description: defaultTemplate.description,
          isDefault: defaultTemplate.isDefault,
        })

        // Create all phases for this template
        for (const phase of defaultTemplate.phases) {
          await this.createPhase({
            templateId: template.id,
            name: phase.name,
            description: phase.description,
            durationWeeks: phase.durationWeeks,
            order: phase.order,
          })
        }

        createdTemplates.push(template)
      } catch (error) {
        console.error(`Failed to create template ${defaultTemplate.name}:`, error)
        // Continue with other templates even if one fails
      }
    }

    return createdTemplates
  }

  /**
   * Clone a template
   *
   * Creates a copy of an existing template with all its phases.
   * Useful for creating variations of standard templates.
   */
  async cloneTemplate(
    templateId: UUID,
    newName: string,
    organizationId: UUID
  ): Promise<PhaseTemplateWithPhases> {
    if (!templateId) {
      throw new Error("Template ID is required")
    }

    if (!newName || newName.trim().length === 0) {
      throw new Error("New template name is required")
    }

    // Get the source template with all phases
    const sourceTemplate = await this.getTemplate(templateId)
    if (!sourceTemplate) {
      throw new Error("Source template not found")
    }

    // Create the new template
    const newTemplate = await this.createTemplate({
      organizationId,
      name: newName,
      description: `Cloned from ${sourceTemplate.name}`,
      isDefault: false,
    })

    // Copy all phases
    const newPhases: PhaseTemplatePhase[] = []
    for (const phase of sourceTemplate.phases) {
      const newPhase = await this.createPhase({
        templateId: newTemplate.id,
        name: phase.name,
        description: phase.description,
        durationWeeks: phase.durationWeeks,
        order: phase.order,
      })
      newPhases.push(newPhase)
    }

    return {
      ...newTemplate,
      phases: newPhases,
    }
  }

  /**
   * Validate template name uniqueness
   */
  async isNameAvailable(
    organizationId: UUID,
    name: string,
    excludeId?: UUID
  ): Promise<boolean> {
    const templates = await this.listTemplates(organizationId)

    return !templates.some(
      (t) => t.name.toLowerCase() === name.toLowerCase() && t.id !== excludeId
    )
  }

  /**
   * Get the default templates as TypeScript objects (not from database)
   */
  getDefaultTemplateDefinitions(): DefaultTemplate[] {
    return DEFAULT_TEMPLATES
  }
}

// Export singleton instance
export const phaseTemplateService = new PhaseTemplateService()
