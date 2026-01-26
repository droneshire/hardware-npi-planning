"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Upload, Download, FileText, AlertCircle, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface ImportUsersDialogProps {
  organizationId: string
  onSuccess?: () => void
}

interface CSVRow {
  name: string
  email: string
  role?: string
}

interface ImportResult {
  created: number
  errors: Array<{ email: string; error: string }>
}

export function ImportUsersDialog({ organizationId, onSuccess }: ImportUsersDialogProps) {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<CSVRow[]>([])
  const [isImporting, setIsImporting] = useState(false)
  const [importResult, setImportResult] = useState<ImportResult | null>(null)
  const { toast } = useToast()

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return

    if (!selectedFile.name.endsWith(".csv")) {
      toast({
        title: "Invalid file",
        description: "Please select a CSV file",
        variant: "destructive",
      })
      return
    }

    setFile(selectedFile)
    setImportResult(null)

    // Parse CSV preview
    try {
      const text = await selectedFile.text()
      const lines = text.split("\n").filter((line) => line.trim())
      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase())

      // Find column indices
      const nameIndex = headers.findIndex((h) => h === "name" || h === "full name")
      const emailIndex = headers.findIndex((h) => h === "email" || h === "email address")
      const roleIndex = headers.findIndex((h) => h === "role")

      if (nameIndex === -1 || emailIndex === -1) {
        toast({
          title: "Invalid CSV format",
          description: "CSV must contain 'name' and 'email' columns",
          variant: "destructive",
        })
        setFile(null)
        return
      }

      // Parse rows
      const rows: CSVRow[] = []
      for (let i = 1; i < Math.min(lines.length, 11); i++) {
        // Preview first 10 rows
        const values = lines[i].split(",").map((v) => v.trim())
        if (values[nameIndex] && values[emailIndex]) {
          rows.push({
            name: values[nameIndex],
            email: values[emailIndex],
            role: roleIndex !== -1 ? values[roleIndex]?.toUpperCase() : undefined,
          })
        }
      }

      setPreview(rows)
    } catch (error) {
      toast({
        title: "Error parsing CSV",
        description: "Could not parse the CSV file",
        variant: "destructive",
      })
      setFile(null)
    }
  }

  const handleImport = async () => {
    if (!file) return

    setIsImporting(true)
    setImportResult(null)

    try {
      const text = await file.text()
      const lines = text.split("\n").filter((line) => line.trim())
      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase())

      const nameIndex = headers.findIndex((h) => h === "name" || h === "full name")
      const emailIndex = headers.findIndex((h) => h === "email" || h === "email address")
      const roleIndex = headers.findIndex((h) => h === "role")

      const users: CSVRow[] = []
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",").map((v) => v.trim())
        if (values[nameIndex] && values[emailIndex]) {
          users.push({
            name: values[nameIndex],
            email: values[emailIndex],
            role: roleIndex !== -1 ? values[roleIndex]?.toUpperCase() : undefined,
          })
        }
      }

      const response = await fetch("/api/users/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organizationId,
          users,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to import users")
      }

      const result: ImportResult = await response.json()
      setImportResult(result)

      if (result.errors.length === 0) {
        toast({
          title: "Import successful",
          description: `Successfully imported ${result.created} users.`,
        })
        setFile(null)
        setPreview([])
        setTimeout(() => {
          setOpen(false)
          onSuccess?.()
        }, 2000)
      } else {
        toast({
          title: "Import completed with errors",
          description: `Imported ${result.created} users. ${result.errors.length} errors.`,
          variant: "destructive",
        })
      }
    } catch (error: any) {
      toast({
        title: "Import failed",
        description: error.message || "Failed to import users",
        variant: "destructive",
      })
    } finally {
      setIsImporting(false)
    }
  }

  const downloadTemplate = () => {
    const csv =
      "name,email,role\nJohn Doe,john@example.com,MEMBER\nJane Smith,jane@example.com,ADMIN"
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "users_template.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Import CSV
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Import Users from CSV</DialogTitle>
          <DialogDescription>
            Upload a CSV file with user information. Required columns: name, email. Optional: role.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Label htmlFor="csv-file">CSV File</Label>
              <Input
                id="csv-file"
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                disabled={isImporting}
              />
            </div>
            <Button variant="outline" onClick={downloadTemplate} type="button">
              <Download className="mr-2 h-4 w-4" />
              Download Template
            </Button>
          </div>

          {preview.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="text-sm font-medium">Preview ({preview.length} rows)</span>
              </div>
              <div className="max-h-64 overflow-auto rounded-md border">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-2 text-left">Name</th>
                      <th className="p-2 text-left">Email</th>
                      <th className="p-2 text-left">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.map((row, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-2">{row.name}</td>
                        <td className="p-2">{row.email}</td>
                        <td className="p-2">{row.role || "MEMBER"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {importResult && (
            <div className="space-y-2">
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  Successfully imported {importResult.created} users.
                </AlertDescription>
              </Alert>
              {importResult.errors.length > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="mb-2 font-semibold">{importResult.errors.length} errors:</div>
                    <ul className="list-inside list-disc space-y-1 text-sm">
                      {importResult.errors.slice(0, 5).map((error, i) => (
                        <li key={i}>
                          {error.email}: {error.error}
                        </li>
                      ))}
                      {importResult.errors.length > 5 && (
                        <li>... and {importResult.errors.length - 5} more</li>
                      )}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          <div className="space-y-1 text-xs text-muted-foreground">
            <p>
              <strong>CSV Format:</strong>
            </p>
            <ul className="ml-2 list-inside list-disc space-y-1">
              <li>Required columns: name, email</li>
              <li>Optional column: role (ADMIN, MEMBER, or VIEWER)</li>
              <li>First row should be headers</li>
              <li>Email addresses must be unique</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isImporting}>
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={!file || isImporting}>
            {isImporting ? "Importing..." : "Import Users"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
