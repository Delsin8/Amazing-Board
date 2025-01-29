import Button from '../../components/ui/Button'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 min-h-screen bg-gray-100 text-gray-900 pb-20">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl font-semibold">Page not found</h2>
      <p className="text-lg text-gray-600">
        The page you are looking for does not exist
      </p>

      <Link to="/">
        <Button variant="info" className="px-4 py-2">
          Go Home
        </Button>
      </Link>
    </div>
  )
}

export default NotFoundPage
