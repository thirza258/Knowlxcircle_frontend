import Navbar from './Navbar'
import Header from './Header'
import Footer from './Footer'
import HomeBody from './HomeBody'
import { useEffect, useState } from 'react'
import homeService  from '../services/HomeService'
import { SearchResponse } from '../types'

const Home = () => {
    const [responses, setResponse] = useState<SearchResponse>({response: '', prompt: '', created_at: ''})

    useEffect(() => {
        homeService.getData().then((data) => {
            setResponse(data)
        })
    }, [])

    return (
        <div>
            <Navbar />
            <Header />
            <HomeBody response={responses}/>
            <section className='mt-20'>
              <Footer />
            </section>
        </div>
    )
}

export default Home