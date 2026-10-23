export function SiteBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#f6f7ef]"
    >
      <div className="absolute -top-52 -left-40 size-[44rem] rounded-full bg-[#dbead8] opacity-80 blur-3xl" />
      <div className="absolute top-[16%] -right-44 size-[38rem] rounded-full bg-[#f3e1d6] opacity-70 blur-3xl" />
      <div className="absolute bottom-[-18rem] left-[22%] size-[42rem] rounded-full bg-[#e7e2f0] opacity-55 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(255,255,255,0.82),transparent_38%),radial-gradient(circle_at_82%_26%,rgba(255,255,255,0.58),transparent_34%),linear-gradient(180deg,rgba(251,250,246,0.28),rgba(251,250,246,0.78))]" />
      <div className="absolute inset-0 [background-image:radial-gradient(#89a18b_0.7px,transparent_0.7px)] [background-size:20px_20px] opacity-[0.15]" />
    </div>
  )
}
