import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>Logistics Management System</h1>
      <nav>
        <ul>
          <li>
            <Link href='/orders'>Create Order</Link>
          </li>
          <li>
            <Link href='/tracking'>Track Order</Link>
          </li>
          <li>
            <Link href='/dashboard'>Dashboard</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
