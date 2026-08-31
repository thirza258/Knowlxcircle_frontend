import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Header from './Header'
import Footer from './Footer'
import HomeBody from './HomeBody'
import homeService from '../services/HomeService'
import type { SearchResponse } from '../types'

const Home = () => {
    const [response, setResponse] = useState<SearchResponse | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let ignore = false

        homeService
            .getData()
            .then((data) => {
                if (!ignore) {
                    setResponse(data)
                }
            })
            .catch((err: unknown) => {
                if (!ignore) {
                    console.error('Failed to load the latest answer:', err)
                    setError('We could not load the latest answer. Please try again later.')
                }
            })
            .finally(() => {
                if (!ignore) {
                    setIsLoading(false)
                }
            })

        return () => {
            ignore = true
        }
    }, [])

    return (
        <div>
            <Navbar />
            <Header />
            <HomeBody response={response} isLoading={isLoading} error={error} />
            <section className='mt-20'>
              <Footer />
            </section>
        </div>
    )
}

export default Home
