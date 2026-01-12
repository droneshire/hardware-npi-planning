# User Guide

This guide explains how to use the Hardware NPI Planning application to manage portfolios, programs, projects, and resources.

## Getting Started

### Logging In

1. Navigate to the application URL
2. Click "Sign In"
3. Use your email/password or Google account (if configured)
4. You'll be redirected to the dashboard

### Navigation

The application uses a sidebar navigation with the following sections:

- **Dashboard** - Overview of active projects and resource utilization
- **Timeline** - Gantt-style view of all projects
- **Resources** - Team and individual resource management
- **Projects** - Project list and management
- **Portfolios** - Portfolio and program management

## Portfolio Management

### Creating a Portfolio

1. Navigate to **Portfolios**
2. Click **"New Portfolio"**
3. Enter:
   - **Name**: Portfolio name (e.g., "Consumer Products")
   - **Description**: Optional description
4. Click **"Create"**

### Creating a Program

1. Open a portfolio
2. Click **"New Program"**
3. Enter:
   - **Name**: Program name
   - **Description**: Optional description
4. Click **"Create"**

Programs belong to portfolios and organize related projects.

## Project Management

### Creating a Project

1. Navigate to a program
2. Click **"New Project"**
3. Fill in the form:
   - **Name**: Project name
   - **Description**: Project description
   - **Product Type**: Select from available product types
   - **Status**: PLANNING, ACTIVE, ON_HOLD, COMPLETED, or CANCELLED
   - **Start Date**: Project start date
   - **End Date**: Project end date (optional)
4. Click **"Create"**

The project will automatically generate phases based on the selected product type's phase template.

### Managing Project Phases

1. Open a project
2. Navigate to the **Phases** tab
3. View generated phases from the template
4. Customize phases:
   - Edit phase names and descriptions
   - Adjust dates
   - Update status (NOT_STARTED, IN_PROGRESS, COMPLETED, BLOCKED)
   - Reorder phases if needed

### Project Status

Projects can have the following statuses:

- **PLANNING**: Project is being planned
- **ACTIVE**: Project is in progress
- **ON_HOLD**: Project is temporarily paused
- **COMPLETED**: Project is finished
- **CANCELLED**: Project was cancelled

## Resource Planning

### Setting Up Teams

1. Navigate to **Resources** → **Teams**
2. Click **"New Team"**
3. Enter:
   - **Name**: Team name
   - **Parent Team**: Optional (for hierarchical teams)
   - **Description**: Optional description
4. Click **"Create"**

### Adding Team Members

1. Open a team
2. Click **"Add Member"**
3. Select a user from your organization
4. Optionally assign a role
5. Click **"Add"**

### Assigning Resources to Projects

1. Open a project
2. Navigate to the **Resources** tab
3. Click **"Assign Resource"**
4. Fill in:
   - **User**: Select team member
   - **Allocation %**: 0-100% of their time
   - **Start Date**: Assignment start
   - **End Date**: Assignment end
5. Click **"Assign"**

**Note**: The system will warn you if the assignment causes over-allocation (>100% total for that user in the date range).

### Viewing Resource Utilization

1. Navigate to **Resources**
2. View the resource list showing:
   - Current allocation percentage
   - Capacity status (Normal, Warning, Critical)
   - Over-allocation warnings
3. Click on a person to see their detailed allocation view

### Person Allocation View

The person view shows:
- **Quarterly Breakdown**: Allocation by quarter
- **Project Assignments**: Bar chart showing all projects
- **Total Allocation**: Warning if >100%
- **Historical Assignments**: Past and future assignments

## Timeline View

The timeline provides a Gantt-style view of all projects:

1. Navigate to **Timeline**
2. View projects as horizontal bars
3. Use filters:
   - **Portfolio**: Filter by portfolio
   - **Program**: Filter by program
   - **Product Type**: Filter by product type
   - **Status**: Filter by project status
4. Toggle between **Fiscal Year** and **Calendar Year** views
5. Click on a project bar to view details

## Phase Templates

### Default Templates

The system includes default phase templates:
- **EVT** (Engineering Validation Test)
- **DVT** (Design Validation Test)
- **PVT** (Production Validation Test)
- **MP** (Mass Production)

### Creating Custom Templates

1. Navigate to **Settings** → **Phase Templates**
2. Click **"New Template"**
3. Enter template name and description
4. Add phases:
   - Click **"Add Phase"**
   - Enter phase name, description, and estimated duration
   - Reorder phases as needed
5. Click **"Save"**

### Linking Templates to Product Types

1. Navigate to **Settings** → **Product Types**
2. Create or edit a product type
3. Select a phase template to use
4. Save

New projects of this product type will use the linked template.

## Dashboard

The dashboard provides an executive overview:

- **Active Projects**: Count of projects in ACTIVE status
- **Resource Utilization**: Organization-wide average allocation
- **Over-allocated**: Number of team members at >100% capacity
- **Recent Activity**: Latest updates across portfolios

## Best Practices

### Project Planning

1. **Set realistic dates**: Ensure project dates align with business goals
2. **Use appropriate status**: Keep project status current
3. **Customize phases**: Adjust template phases to match your process
4. **Track progress**: Update phase status regularly

### Resource Allocation

1. **Avoid over-allocation**: Keep total allocation ≤100% per person
2. **Plan ahead**: Assign resources with sufficient lead time
3. **Review regularly**: Check resource utilization weekly
4. **Use teams**: Organize resources into logical teams

### Portfolio Management

1. **Organize logically**: Group related programs in portfolios
2. **Use descriptions**: Add context with descriptions
3. **Review hierarchy**: Ensure portfolio → program → project structure makes sense

## Keyboard Shortcuts

- `Ctrl/Cmd + K`: Open command palette (if implemented)
- `Esc`: Close modals/dialogs
- `Tab`: Navigate between form fields

## Troubleshooting

### Can't see projects

- Check that you're viewing the correct portfolio/program
- Verify your user role has VIEWER or higher permissions
- Ensure you're logged into the correct organization

### Over-allocation warning won't clear

- Review all assignments for that user in the date range
- Reduce allocation percentages or adjust date ranges
- Check for overlapping assignments

### Phases not generating

- Verify the product type has a linked phase template
- Check that the template has phases defined
- Ensure the project was created with a product type selected

## Getting Help

For technical issues or questions:
- Check the [Development Guide](development.md) for technical details
- Review the [API Reference](api.md) for data model questions
- Contact your system administrator
