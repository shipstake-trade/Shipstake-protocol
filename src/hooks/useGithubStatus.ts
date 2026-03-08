import { useQuery } from "@tanstack/react-query"
import { API_URL } from "@/lib/api"

export interface GithubStatus {
  connected: boolean
  githubId?: string   // normalized from github_id
  login?: string
  avatar_url?: string
  name?: string | null
}

export function useGithubStatus() {
  return useQuery({
    queryKey: ["githubStatus"],
    queryFn: async (): Promise<GithubStatus> => {
      const res = await fetch(`${API_URL}/auth/github/status`, { credentials: "include" })
      if (!res.ok) return { connected: false }
      const data = await res.json()
      return {
        connected: data.connected ?? false,
        githubId: data.github_id != null ? String(data.github_id) : data.githubId,
        login: data.login,
        avatar_url: data.avatar_url,
        name: data.name,
      }
    },
    staleTime: 60_000,
  })
}
