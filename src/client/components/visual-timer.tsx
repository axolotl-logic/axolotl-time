export function VisualTimer({
  status,
  progress,
}: {
  status: "break" | "work";
  progress: number;
}) {
  let radialColor: string;
  switch (status) {
    case "break":
      radialColor = "text-pink-400";
      break;
    case "work":
      radialColor = "text-purple-300";
      break;
  }

  //  TODO: Replace with CSS Animation
  return (
    <div
      className={`radial-progress text-5xl ${radialColor}`}
      style={
        {
          "--value": Math.floor(progress),
          "--size": "300px",
          "--thickness": "35px",
        } as React.CSSProperties
      }
      role="figure"
    >
      {status}
    </div>
  );
}
