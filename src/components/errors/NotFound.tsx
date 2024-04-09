import { Button } from 'antd'
import { useRouter } from 'next/navigation'

const NotFoundPage = () => {
    const router = useRouter()
    return (
        <div className="flex h-full flex-grow items-center justify-center bg-gray-50">
            <div className="rounded-lg bg-white p-8 text-center shadow-xl">
                <h1 className="mb-4 text-4xl font-bold">404</h1>
                <p className="text-gray-600">
                    Oops! The page you are looking for could not be found.
                </p>
                <Button
                    type="primary"
                    onClick={() => {
                        router.back()
                    }}
                    className="mt-4"
                >
                    Go back to Home
                </Button>
            </div>
        </div>
    )
}

export default NotFoundPage
