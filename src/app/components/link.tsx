import NextLink from "next/link";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const Link: React.FC<LinkProps> = ({ href, children, className }) => {
  const isInternal = href.startsWith("/");

  const defaultClassName =
    "text-blue-600 underline hover:text-blue-800 transition-colors duration-200";

  if (isInternal) {
    return (
      <NextLink
        href={href}
        className={`${defaultClassName} ${className || ""}`}
        passHref
      >
        {children}
      </NextLink>
    );
  } else {
    return (
      <a
        href={href}
        className={`${defaultClassName} ${className || ""}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
};

export { Link };
