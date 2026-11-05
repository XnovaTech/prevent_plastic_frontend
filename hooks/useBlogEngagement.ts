"use client"

import { useMemo, useState } from "react"

import type { BlogComment, BlogPost, BlogReview } from "@/mock/blogPageMock"

export type NewBlogComment = {
  author: string
  body: string
}

export type NewBlogReview = {
  author: string
  rating: number
  title: string
  body: string
}

export type BlogRatingSummary = {
  average: number
  total: number
  distribution: number[]
}

export function useBlogEngagement(post: BlogPost) {
  const [liked, setLiked] = useState(false)
  const [comments, setComments] = useState<readonly BlogComment[]>(
    post.comments
  )
  const [reviews, setReviews] = useState<readonly BlogReview[]>(post.reviews)

  const ratingSummary = useMemo<BlogRatingSummary>(() => {
    const distribution = [0, 0, 0, 0, 0]
    let sum = 0

    for (const review of reviews) {
      const bucket = Math.min(5, Math.max(1, Math.round(review.rating))) - 1
      distribution[bucket] += 1
      sum += review.rating
    }

    const total = reviews.length

    return {
      total,
      distribution,
      average: total === 0 ? 0 : Math.round((sum / total) * 10) / 10,
    }
  }, [reviews])

  function toggleLike() {
    setLiked((previous) => !previous)
  }

  function addComment({ author, body }: NewBlogComment) {
    setComments((previous) => [
      {
        id: `local-comment-${previous.length + 1}-${Date.now()}`,
        author,
        body,
        date: "Just now",
      },
      ...previous,
    ])
  }

  function addReview({ author, rating, title, body }: NewBlogReview) {
    setReviews((previous) => [
      {
        id: `local-review-${previous.length + 1}-${Date.now()}`,
        author,
        rating,
        title,
        body,
        date: "Just now",
      },
      ...previous,
    ])
  }

  return {
    liked,
    likes: post.likes + (liked ? 1 : 0),
    toggleLike,
    comments,
    addComment,
    reviews,
    addReview,
    ratingSummary,
  }
}
