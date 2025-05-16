export default function VideoBackground({
  src = "#",
  poster = "#",
  className = "",
  videoProps = {
    autoPlay: true,
    loop: true,
    muted: true,
    playsInline: true,
    preload: "auto",
  },
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <video
        src={src}
        poster={poster}
        {...videoProps}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          minWidth: "100%",
          minHeight: "100%",
          width: "auto",
          height: "auto",
          transform: "translate(-50%, -50%)",
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
        }}
      />
    </div>
  )
}
