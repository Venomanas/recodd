import Image from "next/image";

export default function Logo({
  className = "",
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/logo-icon.webp"
        alt="Recodd Logo"
        width={size}
        height={size}
        className="object-contain"
        priority
      />
      <span className="text-2xl font-bold tracking-tight">
        <span className="text-[rgb(var(--text))]">Rec</span>
        <span className="text-[rgb(var(--accent))]">odd</span>
      </span>
    </div>
  );
}
