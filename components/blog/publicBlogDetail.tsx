"use client"

import Link from "next/link"
import { useState } from "react"
import { Heart } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { usePublicBlog } from "@/hooks/useBlogs"
import { blogService } from "@/services/blogService"
import type { BlogComment } from "@/types/blog"

export function PublicBlogDetail({ slug }: { slug: string }) {
  const { post, isLoading, error } = usePublicBlog(slug)
  const [comments, setComments] = useState<BlogComment[]>([])
  const [loadedComments, setLoadedComments] = useState(false)
  const [body, setBody] = useState("")
  const [likes, setLikes] = useState<number | null>(null)
  const [message, setMessage] = useState("")
  if (isLoading) return <div className="px-4 py-20 text-center text-sm text-brand-light">Loading story…</div>
  if (!post) return <div className="px-4 py-20 text-center text-sm text-red-700">{error}</div>
  const loadComments = async () => { const response = await blogService.publicComments(slug); setComments(response.items); setLoadedComments(true) }
  const addComment = async () => { try { const comment = await blogService.addComment(slug, body); setComments((current) => [comment, ...current]); setBody(""); setMessage("Your comment has been posted.") } catch { setMessage("Please sign in to post a comment.") } }
  const toggleLike = async () => { try { const response = await blogService.toggleLike(slug); setLikes(response.likes_count) } catch { setMessage("Please sign in to like this story.") } }
  return <article className="px-4 pt-8 pb-16 sm:px-8 sm:pt-12 sm:pb-20 lg:px-12"><div className="mx-auto max-w-[900px]"><Link className="text-xs font-semibold text-brand-3" href="/blog">← All stories</Link><p className="mt-8 text-[10px] font-bold tracking-[.15em] text-brand-gray-3 uppercase">{post.category?.name ?? "Community story"}</p><h1 className="mt-3 font-serif text-4xl tracking-[-.05em] text-brand sm:text-6xl">{post.title}</h1><p className="mt-4 text-base leading-7 text-brand-light">{post.excerpt}</p><p className="mt-6 text-sm text-brand-gray-3">By {post.author.name} · {post.published_at ? new Date(post.published_at).toLocaleDateString() : ""}</p>{post.images[0] && <img alt={post.title} className="mt-8 aspect-[16/9] w-full rounded-[26px] object-cover" src={post.images[0].url} />}<div className="prose prose-sm mt-10 max-w-none prose-headings:font-serif prose-p:leading-8 prose-p:text-brand-light" dangerouslySetInnerHTML={{ __html: post.body }} /><div className="mt-10 flex flex-wrap gap-3 border-y border-[#e7e9e1] py-5"><Button className="bg-brand-2 text-white" onPress={toggleLike}><Heart size={16} /> Like {likes ?? post.likes_count}</Button><Button variant="outline" onPress={() => void loadComments()}>Show comments ({post.comments_count})</Button></div>{loadedComments && <section className="mt-8"><h2 className="font-serif text-2xl text-brand">Comments</h2><div className="mt-4 space-y-4">{comments.map((comment) => <div className="rounded-2xl border border-[#e7e9e1] bg-white p-4" key={comment.id}><p className="text-sm font-semibold text-brand">{comment.commenter.name}</p><p className="mt-1 text-sm text-brand-light">{comment.body}</p></div>)}</div><Textarea className="mt-6" onChange={(event) => setBody(event.target.value)} placeholder="Join the conversation" value={body}/><Button className="mt-3 bg-brand-2 text-white" isDisabled={!body.trim()} onPress={() => void addComment()}>Post comment</Button></section>}<p className="mt-4 text-sm text-brand-gray-3">{message}</p></div></article>
}
