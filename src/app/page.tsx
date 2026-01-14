import { redirect } from "next/navigation"
import { DEFAULT_REDIRECT } from "@/constants/routes"

export default function Home() {
  redirect(DEFAULT_REDIRECT)
}
