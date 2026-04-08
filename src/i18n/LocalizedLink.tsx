import { Link, type LinkProps } from "react-router-dom";
import { useLanguage } from "./context";
import { getLocalizedPath, type RouteKey } from "./routes";

interface LocalizedLinkProps extends Omit<LinkProps, "to"> {
  to: RouteKey;
  params?: Record<string, string>;
  hash?: string;
}

export default function LocalizedLink({
  to,
  params,
  hash,
  children,
  ...rest
}: LocalizedLinkProps) {
  const { lang } = useLanguage();
  let path = getLocalizedPath(to, lang, params);
  if (hash) path += `#${hash}`;

  return (
    <Link to={path} {...rest}>
      {children}
    </Link>
  );
}
