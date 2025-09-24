import Link from "next/link";

type BackLinkProps = {
  href: string;
  message: string;
  position: "left" | "center" | "right";
};

const centerClass = "flex items-center justify-center";

export default function BackLink({ href, message, position }: BackLinkProps) {
  return (
    <div className={position === "center" ? centerClass : ""}>
      <Link
        href={href}
        className="inline-block px-4 py-2 border border-blue-500 text-blue-500 rounded-md 
                 hover:bg-blue-500 hover:text-white transition"
      >
        {message}
      </Link>
    </div>
  );
}
