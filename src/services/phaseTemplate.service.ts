/**
 * Phase Template Service
 *
 * Manages NPI phase templates and their phases.
 * Supports creating projects from templates.
 */

import { DEFAULT_TEMPLATES, DefaultTemplate } from "@/lib/defaultTemplates"
import { dataConnect } from "@/lib/firebase"
import {
  listPhaseTemplates,
  getPhaseTemplate,
  getDefaultTemplates,
  createPhaseTemplate,
  updatePhaseTemplate,
  deletePhaseTemplate,
  createPhaseTemplatePhase,
  updatePhaseTemplatePhase,
  deletePhaseTemplatePhase,
  listPhaseTemplatePhases,
} from "@firebasegen/default-connector"

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
    const result = await listPhaseTemplates(dataConnect, { organizationId })
    return result.data.phaseTemplates.map((t) => ({
      id: t.id,
      organizationId: t.organizationId || organizationId,
      name: t.name,
      description: t.description ?? undefined,
      isDefault: t.isDefault,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
    }))
  }

  /**
   * Get a single template with all phases
   */
  async getTemplate(id: UUID): Promise<PhaseTemplateWithPhases | null> {
    const templateResult = await getPhaseTemplate(dataConnect, { id })
    if (!templateResult.data.phaseTemplate) {
      return null
    }

    const template = templateResult.data.phaseTemplate

    // Fetch phases
    const phasesResult = await listPhaseTemplatePhases(dataConnect, { templateId: id })
    const phases: PhaseTemplatePhase[] = phasesResult.data.phaseTemplatePhases.map((p) => ({
      id: p.id,
      templateId: p.templateId,
      name: p.name,
      description: p.description ?? undefined,
      durationWeeks: p.durationWeeks ?? undefined,
      order: p.order,
      createdAt: p.createdAt,
    }))

    return {
      id: template.id,
      organizationId: template.organizationId,
      name: template.name,
      description: template.description ?? undefined,
      isDefault: template.isDefault,
      createdAt: template.createdAt,
      updatedAt: template.updatedAt,
      phases,
    }
  }

  /**
   * Get default templates for an organization
   */
  async getDefaultTemplates(organizationId: UUID): Promise<PhaseTemplateWithPhases[]> {
    const result = await getDefaultTemplates(dataConnect, { organizationId })
    const templates: PhaseTemplateWithPhases[] = []

    for (const template of result.data.phaseTemplates) {
      const fullTemplate = await this.getTemplate(template.id)
      if (fullTemplate) {
        templates.push(fullTemplate)
      }
    }

    return templates
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

    const result = await createPhaseTemplate(dataConnect, {
      organizationId: input.organizationId,
      name: input.name,
      description: input.description ?? null,
      isDefault: input.isDefault ?? null,
    })

    const template = result.data.phaseTemplate_insert
    return {
      id: template.id,
      organizationId: input.organizationId,
      name: input.name,
      description: input.description,
      isDefault: input.isDefault || false,
      createdAt: template.createdAt || new Date().toISOString(),
      updatedAt: template.updatedAt || new Date().toISOString(),
    }
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

    await updatePhaseTemplate(dataConnect, {
      id: input.id,
      name: input.name ?? null,
      description: input.description ?? null,
      isDefault: input.isDefault ?? null,
    })

    // Fetch the updated template
    const updated = await this.getTemplate(input.id)
    if (!updated) {
      throw new Error("Failed to fetch updated template")
    }

    return updated
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

    await deletePhaseTemplate(dataConnect, { id })
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

    const result = await createPhaseTemplatePhase(dataConnect, {
      templateId: input.templateId,
      name: input.name,
      description: input.description ?? null,
      durationWeeks: input.durationWeeks ?? null,
      order: input.order,
    })

    const phase = result.data.phaseTemplatePhase_insert
    return {
      id: phase.id,
      templateId: input.templateId,
      name: input.name,
      description: input.description,
      durationWeeks: input.durationWeeks,
      order: input.order,
      createdAt: phase.createdAt || new Date().toISOString(),
    }
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

    await updatePhaseTemplatePhase(dataConnect, {
      id,
      name: updates.name ?? null,
      description: updates.description ?? null,
      durationWeeks: updates.durationWeeks ?? null,
      order: updates.order ?? null,
    })

    // Note: We'd need a getPhaseTemplatePhase query to fetch the updated phase
    // For now, return a partial object
    throw new Error("Update phase - need to implement get phase query")
  }

  /**
   * Delete a template phase
   */
  async deletePhase(id: UUID): Promise<void> {
    if (!id) {
      throw new Error("Phase ID is required")
    }

    await deletePhaseTemplatePhase(dataConnect, { id })
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

    // Check if templates already exist
    const existingTemplates = await this.listTemplates(organizationId)
    const existingTemplateNames = new Set(existingTemplates.map((t) => t.name))

    const createdTemplates: PhaseTemplate[] = []

    for (const defaultTemplate of DEFAULT_TEMPLATES) {
      try {
        // Skip if template already exists
        if (existingTemplateNames.has(defaultTemplate.name)) {
          const existing = existingTemplates.find((t) => t.name === defaultTemplate.name)
          if (existing) {
            createdTemplates.push(existing)
          }
          continue
        }

        // Create the template
        const template = await this.createTemplate({
          organizationId,
          name: defaultTemplate.name,
          description: defaultTemplate.description,
          isDefault: defaultTemplate.isDefault,
        })

        // Create all phases for this template
        for (const phase of defaultTemplate.phases) {
          try {
            await this.createPhase({
              templateId: template.id,
              name: phase.name,
              description: phase.description,
              durationWeeks: phase.durationWeeks,
              order: phase.order,
            })
          } catch (phaseError: any) {
            console.error(`Failed to create phase ${phase.name} for template ${defaultTemplate.name}:`, phaseError)
            // Continue with other phases even if one fails
          }
        }

        createdTemplates.push(template)
      } catch (error: any) {
        console.error(`Failed to create template ${defaultTemplate.name}:`, error)
        // If it's a duplicate error, try to find the existing template
        if (error.message?.toLowerCase().includes("already exists") || error.message?.toLowerCase().includes("duplicate")) {
          const existing = existingTemplates.find((t) => t.name === defaultTemplate.name)
          if (existing) {
            createdTemplates.push(existing)
          }
        }
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
  async isNameAvailable(organizationId: UUID, name: string, excludeId?: UUID): Promise<boolean> {
    const templates = await this.listTemplates(organizationId)

    return !templates.some((t) => t.name.toLowerCase() === name.toLowerCase() && t.id !== excludeId)
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
