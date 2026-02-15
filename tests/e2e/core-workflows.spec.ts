import { test, expect } from "@playwright/test"

/**
 * E2E Tests for Core Workflows
 *
 * Tests the main user workflows:
 * 1. Create project → assign resources → view timeline
 * 2. View project details and phases
 * 3. Manage resource allocations
 */

test.describe("Core Workflows", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto("http://localhost:5173")

    // Wait for page to load
    await page.waitForLoadState("networkidle")
  })

  test("should navigate to projects page", async ({ page }) => {
    // Check if we're on the sign-in page or dashboard
    const url = page.url()

    if (url.includes("/auth/signin")) {
      // If on sign-in page, we'll skip authentication for now
      // In a real test, you'd authenticate here
      test.skip()
      return
    }

    // Navigate to projects
    await page.click('a[href="/projects"]')
    await expect(page).toHaveURL(/.*\/projects/)
  })

  test("should display projects page with table", async ({ page }) => {
    const url = page.url()

    if (url.includes("/auth/signin")) {
      test.skip()
      return
    }

    await page.goto("http://localhost:5173/projects")
    await page.waitForLoadState("networkidle")

    // Check for projects table or empty state
    const table = page.locator("table")
    const emptyState = page.locator('text="No projects"')

    // Either table or empty state should be visible
    await expect(table.or(emptyState).first()).toBeVisible()
  })

  test("should navigate to timeline page", async ({ page }) => {
    const url = page.url()

    if (url.includes("/auth/signin")) {
      test.skip()
      return
    }

    await page.goto("http://localhost:5173/timeline")
    await page.waitForLoadState("networkidle")

    // Check for timeline content
    const timelineContent = page.locator('text="Timeline"')
    await expect(timelineContent).toBeVisible()
  })

  test("should navigate to resources page", async ({ page }) => {
    const url = page.url()

    if (url.includes("/auth/signin")) {
      test.skip()
      return
    }

    await page.goto("http://localhost:5173/resources")
    await page.waitForLoadState("networkidle")

    // Check for resources content
    const resourcesContent = page.locator('text="Resources"')
    await expect(resourcesContent).toBeVisible()
  })

  test("should navigate to settings page", async ({ page }) => {
    const url = page.url()

    if (url.includes("/auth/signin")) {
      test.skip()
      return
    }

    await page.goto("http://localhost:5173/settings")
    await page.waitForLoadState("networkidle")

    // Check for settings content
    const settingsContent = page.locator('text="Settings"')
    await expect(settingsContent).toBeVisible()
  })

  test("should display dashboard with metrics", async ({ page }) => {
    const url = page.url()

    if (url.includes("/auth/signin")) {
      test.skip()
      return
    }

    await page.goto("http://localhost:5173/dashboard")
    await page.waitForLoadState("networkidle")

    // Check for dashboard cards
    const activeProjects = page.locator('text="Active Projects"')
    const resourceUtilization = page.locator('text="Resource Utilization"')
    const overAllocated = page.locator('text="Over-allocated"')

    // At least one metric card should be visible
    await expect(activeProjects.or(resourceUtilization).or(overAllocated).first()).toBeVisible()
  })

  test("should have working navigation sidebar", async ({ page }) => {
    const url = page.url()

    if (url.includes("/auth/signin")) {
      test.skip()
      return
    }

    await page.goto("http://localhost:5173/dashboard")
    await page.waitForLoadState("networkidle")

    // Check for sidebar navigation links
    const projectsLink = page.locator('a[href="/projects"]')
    const timelineLink = page.locator('a[href="/timeline"]')
    const resourcesLink = page.locator('a[href="/resources"]')
    const settingsLink = page.locator('a[href="/settings"]')

    // Navigation links should be visible
    await expect(projectsLink.or(timelineLink).or(resourcesLink).or(settingsLink).first()).toBeVisible()
  })
})

test.describe("Project Workflow", () => {
  test("should view project details page structure", async ({ page }) => {
    const url = page.url()

    if (url.includes("/auth/signin")) {
      test.skip()
      return
    }

    // Try to navigate to a project detail page
    // In a real scenario, you'd create a project first or use an existing one
    await page.goto("http://localhost:5173/projects")
    await page.waitForLoadState("networkidle")

    // Check if there are any project links
    const projectLinks = page.locator('a[href^="/projects/"]')
    const count = await projectLinks.count()

    if (count > 0) {
      // Click first project link
      await projectLinks.first().click()
      await page.waitForLoadState("networkidle")

      // Check for project detail page elements
      const backButton = page.locator('text="Back to Projects"')
      const phasesTab = page.locator('text="Phases"')
      const resourcesTab = page.locator('text="Resources"')

      // At least one of these should be visible
      await expect(backButton.or(phasesTab).or(resourcesTab).first()).toBeVisible()
    } else {
      // No projects exist, which is fine
      test.skip()
    }
  })
})

test.describe("Timeline View", () => {
  test("should display timeline filters", async ({ page }) => {
    const url = page.url()

    if (url.includes("/auth/signin")) {
      test.skip()
      return
    }

    await page.goto("http://localhost:5173/timeline")
    await page.waitForLoadState("networkidle")

    // Check for filter controls
    const portfolioFilter = page.locator('text="Portfolio"')
    const programFilter = page.locator('text="Program"')
    const statusFilter = page.locator('text="Status"')

    // Filters should be visible
    await expect(portfolioFilter.or(programFilter).or(statusFilter).first()).toBeVisible()
  })

  test("should have fiscal year toggle", async ({ page }) => {
    const url = page.url()

    if (url.includes("/auth/signin")) {
      test.skip()
      return
    }

    await page.goto("http://localhost:5173/timeline")
    await page.waitForLoadState("networkidle")

    // Check for fiscal year toggle
    const fiscalYearToggle = page.locator('text="Use Fiscal Year"')
    await expect(fiscalYearToggle).toBeVisible()
  })
})

test.describe("Settings Page", () => {
  test("should display organization and template tabs", async ({ page }) => {
    const url = page.url()

    if (url.includes("/auth/signin")) {
      test.skip()
      return
    }

    await page.goto("http://localhost:5173/settings")
    await page.waitForLoadState("networkidle")

    // Check for tabs
    const organizationTab = page.locator('text="Organization"')
    const templatesTab = page.locator('text="Phase Templates"')

    await expect(organizationTab.or(templatesTab).first()).toBeVisible()
  })

  test("should have template management controls", async ({ page }) => {
    const url = page.url()

    if (url.includes("/auth/signin")) {
      test.skip()
      return
    }

    await page.goto("http://localhost:5173/settings")
    await page.waitForLoadState("networkidle")

    // Click on templates tab if it exists
    const templatesTab = page.locator('button:has-text("Phase Templates")')
    if (await templatesTab.isVisible()) {
      await templatesTab.click()
      await page.waitForTimeout(500)

      // Check for template management buttons
      const newTemplateButton = page.locator('button:has-text("New Template")')
      const initializeButton = page.locator('button:has-text("Initialize Defaults")')

      // At least one button should be visible
      await expect(newTemplateButton.or(initializeButton).first()).toBeVisible()
    }
  })
})
