"use client"
import Link from "next/link"
import { useState, type FormEvent } from "react"
import { ArrowDown, PencilSimple, Star, ThumbsUp } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useProductEngagement } from "@/hooks/useProductEngagement"
import { productEngagementService } from "@/services/productEngagementService"
import { useAuthStore } from "@/stores/authStore"
const ratingLabels = ["","Not for me","Could be better","Good","Great","Love it"]
function Stars({ rating }: { rating: number }) {
  return <span className="flex gap-0.5 text-[#b7823e]">{[1,2,3,4,5].map((star)=><Star key={star} size={14} weight={rating>=star?"fill":"thin"}/>)}</span>
}
function RatingPicker({ rating,onChange }: { rating:number;onChange:(rating:number)=>void }) {
  return <div aria-label="Choose a star rating" className="flex items-center gap-1" role="radiogroup">{[1,2,3,4,5].map((star)=><button aria-checked={rating===star} aria-label={`${star} star${star===1?"":"s"}`} className="rounded-lg p-1 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2" key={star} onClick={()=>onChange(star)} role="radio" type="button"><Star className={rating>=star?"text-[#b7823e]":"text-[#c9c4b4]"} size={23} weight={rating>=star?"fill":"thin"}/></button>)}<span className="ml-2 self-center text-xs text-brand-gray-4">{rating?ratingLabels[rating]:"Tap to rate"}</span></div>
}
export function PublicProductFeedback({ productId }: { productId:number }) {
  const user=useAuthStore((state)=>state.user)
  const { engagement,error,isLoading,refresh }=useProductEngagement(productId,"public")
  const [review,setReview]=useState({rating:0,title:"",body:""})
  const [comment,setComment]=useState("")
  const [editingReview,setEditingReview]=useState<number|null>(null)
  const [editingComment,setEditingComment]=useState<number|null>(null)
  const [notice,setNotice]=useState("")
  const reviewCount=engagement?.summary.count??0
  const ratingDistribution=engagement?.summary.distribution??{}
  const wouldBuyAgain=reviewCount?Math.round((((ratingDistribution[4]??0)+(ratingDistribution[5]??0))/reviewCount)*100):0
  const submitReview=async(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    if(!user)return setNotice("Please sign in to post a review.")
    if(!review.rating)return setNotice("Choose a star rating before posting.")
    if(!review.body.trim())return setNotice("Write your review before posting.")
    try {
      await productEngagementService.createReview(productId,{rating:review.rating,title:review.title,review:review.body})
      setReview({rating:0,title:"",body:""})
      setNotice("Your review is now visible.")
      await refresh()
    } catch {
      setNotice("Unable to post your review. Please try again.")
    }
  }
  const submitComment=async(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    if(!user)return setNotice("Please sign in to post a comment.")
    if(!comment.trim())return
    try {
      await productEngagementService.createComment(productId,comment)
      setComment("")
      setNotice("Your comment is now visible.")
      await refresh()
    } catch {
      setNotice("Unable to post your comment. Please try again.")
    }
  }
  return (
    <section className="mt-14 pb-14 sm:mt-20 sm:pb-20" id="reviews">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase">What people say</p>
          <h2 className="font-serif text-[30px] leading-tight tracking-[-0.04em] text-brand sm:text-[38px]">Ratings &amp; reviews</h2>
        </div>
        <a className="inline-flex items-center gap-2 text-[10px] font-semibold text-brand-3 transition-colors hover:text-brand-orange" href="#write-review">Write a review <ArrowDown aria-hidden="true" size={14}/></a>
      </div>
      {error?<p className="mt-4 text-sm text-red-700">{error}</p>:null}
      <div className="grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
        <div className="rounded-[22px] border border-white/65 bg-white/35 p-5 backdrop-blur-xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[9px] font-bold tracking-[0.14em] text-brand-gray-5 uppercase">Rating summary</p>
              <p className="mt-2 font-serif text-[52px] leading-none tracking-[-0.04em] text-brand">{(engagement?.summary.average??0).toFixed(1)}</p>
            </div>
            <div className="pb-1">
              <Stars rating={Math.round(engagement?.summary.average??0)}/>
              <p className="mt-1 text-[10px] text-brand-gray-4">{reviewCount} review{reviewCount===1?"":"s"}</p>
            </div>
          </div>
          <p className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-brand-yellow-bg/80 px-3 py-1.5 text-[10px] font-semibold text-brand-4"><ThumbsUp aria-hidden="true" size={12} weight="fill"/>{wouldBuyAgain}% would buy again</p>
          <div className="mt-4 space-y-2">
            {[5,4,3,2,1].map((star)=>{
              const count=ratingDistribution[star]??0
              const percent=reviewCount?Math.round((count/reviewCount)*100):0
              return <div className="flex items-center gap-3" key={star}><span className="flex w-10 items-center gap-0.5 text-xs text-brand-gray-4">{star}<Star className="text-[#b7823e]" size={10} weight="fill"/></span><span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#e7e3d6]"><span className="block h-full rounded-full bg-[#b7823e]" style={{width:`${percent}%`}}/></span><span className="w-8 text-right text-[10px] text-brand-gray-3">{percent}%</span></div>
            })}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="rounded-[22px] border border-white/65 bg-white/35 p-5 backdrop-blur-xl">
            <div className="flex justify-between gap-3">
              <p className="text-[9px] font-bold tracking-[0.14em] text-brand-gray-5 uppercase">Community reviews</p>
              <p className="text-[10px] text-brand-gray-3">Showing {engagement?.reviews.items.length??0} of {reviewCount}</p>
            </div>
            {isLoading?<p className="mt-4 text-sm text-brand-gray-3">Loading…</p>:<div className="mt-4 space-y-4">{engagement?.reviews.items.map((item)=><article className="border-t border-[#e9ece4]/70 pt-4 first:border-t-0 first:pt-0" key={item.id}>
              {editingReview===item.id?<form className="space-y-2" onSubmit={async(event)=>{event.preventDefault();await productEngagementService.updateReview(productId,item.id,{rating:review.rating,title:review.title,review:review.body});setEditingReview(null);await refresh()}}>
                <RatingPicker rating={review.rating} onChange={(rating)=>setReview({...review,rating})}/>
                <Input value={review.title} onChange={(event)=>setReview({...review,title:event.target.value})}/>
                <Textarea value={review.body} onChange={(event)=>setReview({...review,body:event.target.value})}/>
                <Button className="bg-brand-2 text-white" type="submit">Save review</Button>
              </form>:<>
                <div className="flex items-center justify-between gap-3">
                  <Stars rating={item.rating}/>
                  <span className="text-[10px] text-brand-gray-3">{new Date(item.created_at).toLocaleDateString()}</span>
                  {user?.id===item.reviewer.id?<Button aria-label="Edit your review" onPress={()=>{setReview({rating:item.rating,title:item.title??"",body:item.review??""});setEditingReview(item.id)}} size="icon-xs" variant="outline"><PencilSimple size={13}/></Button>:null}
                </div>
                <p className="mt-2 text-[13px] font-semibold text-brand">{item.title||"Customer review"}</p>
                <p className="mt-1 text-[12px] leading-5 text-brand-light">{item.review}</p>
                <p className="mt-2 text-[10px] font-semibold text-brand-gray-4">{item.reviewer.name}</p>
              </>}
            </article>)}</div>}
          </div>
          <form className="scroll-mt-24 rounded-[22px] border border-white/65 bg-white/35 p-5 backdrop-blur-xl" id="write-review" onSubmit={submitReview}>
            <p className="text-[9px] font-bold tracking-[0.14em] text-brand-gray-5 uppercase">Write a review</p>
            <h3 className="mt-2 font-serif text-[22px] leading-tight tracking-[-0.03em] text-brand">How did this find treat you?</h3>
            <div className="mt-5">
              <Label className="text-[11px] font-semibold text-brand-5" htmlFor="review-rating">Your rating *</Label>
              <div className="mt-2"><RatingPicker rating={review.rating} onChange={(rating)=>setReview({...review,rating})}/></div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div>
                <Label className="text-[10px] font-semibold text-brand-5" htmlFor="review-name">Your name</Label>
                <Input className="mt-2 h-10 rounded-[14px] border-[#dfe6dc] bg-white text-[13px] placeholder:text-[#98a49a]" id="review-name" placeholder="How should we credit you?"/>
              </div>
              <div>
                <Label className="text-[10px] font-semibold text-brand-5" htmlFor="review-title">Headline</Label>
                <Input className="mt-2 h-10 rounded-[14px] border-[#dfe6dc] bg-white text-[13px] placeholder:text-[#98a49a]" id="review-title" placeholder="Sum it up in a few words" value={review.title} onChange={(event)=>setReview({...review,title:event.target.value})}/>
              </div>
            </div>
            <div className="mt-5">
              <Label className="text-[10px] font-semibold text-brand-5" htmlFor="review-body">Your review *</Label>
              <Textarea className="mt-2 min-h-[110px] rounded-[16px] border-[#dfe6dc] bg-white text-[13px] leading-6 placeholder:text-[#98a49a]" id="review-body" placeholder="Condition, packaging, the seller — tell the community how it went." value={review.body} onChange={(event)=>setReview({...review,body:event.target.value})}/>
            </div>
            {user?<Button className="mt-5 h-10 rounded-full bg-brand-2 px-5 text-[11px] font-bold text-white hover:bg-[#1f6157]" type="submit">Post review</Button>:<Link className="mt-5 inline-block text-[11px] font-semibold text-brand-3 underline" href="/login">Sign in to review</Link>}
          </form>
          <div className="rounded-[28px] border border-white/70 bg-white/55 p-6 backdrop-blur-xl sm:p-7">
            <p className="text-xs font-bold tracking-[0.12em] text-brand-gray-3 uppercase">Comments</p>
            <div className="mt-4 space-y-3">
              {engagement?.comments.items.length?engagement.comments.items.map((item)=><article className="rounded-2xl bg-[#f7faf4] p-4" key={item.id}>
                {editingComment===item.id?<form className="space-y-2" onSubmit={async(event)=>{event.preventDefault();await productEngagementService.updateComment(productId,item.id,comment);setEditingComment(null);setComment("");await refresh()}}>
                  <Textarea value={comment} onChange={(event)=>setComment(event.target.value)}/>
                  <Button className="bg-brand-2 text-white" type="submit">Save comment</Button>
                </form>:<>
                  <div className="flex justify-between gap-3">
                    <p className="font-semibold text-brand">{item.commenter.name}</p>
                    {user?.id===item.commenter.id?<Button aria-label="Edit your comment" onPress={()=>{setComment(item.body);setEditingComment(item.id)}} size="icon-xs" variant="outline"><PencilSimple size={13}/></Button>:null}
                  </div>
                  <p className="mt-1 text-sm leading-6 text-brand-light">{item.body}</p>
                  {(item.replies??[]).map((reply)=><div className="mt-3 border-l-2 border-brand-2/30 pl-3" key={reply.id}>
                    <p className="text-xs font-semibold text-brand">{reply.author.name} · {reply.author.role}</p>
                    <p className="mt-1 text-sm leading-6 text-brand-light">{reply.body}</p>
                  </div>)}
                </>}
              </article>):<p className="text-sm text-brand-gray-3">No comments yet.</p>}
            </div>
          </div>
          <form className="rounded-[28px] border border-white/70 bg-[#f7faf4]/80 p-6 sm:p-7" onSubmit={submitComment}>
            <p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">Join the conversation</p>
            <h3 className="mt-2 font-serif text-3xl text-brand">Add your voice</h3>
            <Textarea className="mt-3" placeholder="Write a comment" value={comment} onChange={(event)=>setComment(event.target.value)}/>
            {user?<Button className="mt-3 bg-brand-2 text-white" type="submit">Post comment</Button>:<Link className="mt-3 inline-block text-sm font-semibold text-brand-3 underline" href="/login">Sign in to comment</Link>}
          </form>
        </div>
      </div>
      {notice?<p className="mt-4 rounded-2xl bg-[#f3f8ef] px-4 py-3 text-sm text-brand-4">{notice}</p>:null}
    </section>
  )
}
