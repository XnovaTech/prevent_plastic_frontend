"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { commentManagementService } from "@/services/commentManagementService"

export function useCommentManagement(scope: "admin" | "vendor") {
  const client = useQueryClient()
  const query = useQuery({ queryKey: [scope, "comments"], queryFn: () => commentManagementService.list(scope) })
  const reply = useMutation({
    mutationFn: ({ id, body }: { id: number; body: string }) => commentManagementService.reply(scope, id, body),
    onSuccess: () => client.invalidateQueries({ queryKey: [scope, "comments"] }),
  })
  return { comments: query.data ?? [], isLoading: query.isLoading, error: query.error, reply: reply.mutateAsync, isReplying: reply.isPending }
}
