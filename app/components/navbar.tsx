import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/">Home</Link>
      <Link href="/rum">RUM</Link>
      <Link href="/dtrum">DTRUM API</Link>
      <Link href="/api-demo">API</Link>
      <Link href="/extensions">Extensions</Link>
      <Link href="/synthetics">Synthetics</Link>
    </nav>
  );
}
