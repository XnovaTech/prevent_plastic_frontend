type MiniSvgProps = {
  className?: string
  size?: number
}

/** Animated brand accent. The SVG controls its own infinite animation. */
export function MiniSvg({ className, size = 160 }: MiniSvgProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt=""
      aria-hidden="true"
      className={className}
      draggable={false}
      height={size}
      src="/svg/mini.svg"
      width={size}
    />
  )
}
