import { useEffect, useState } from 'react';
import ArticleService from '../services/ArticleService';
import { ArticleListResponse, ArticleResponse, SectionResponse } from '../types';
import Footer from './Footer';
import { Nav } from 'react-bootstrap';
import Navbar from './Navbar';

const ArticleList = () => {
    const [articles, setArticles] = useState<ArticleListResponse | null>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const articlesData: ArticleListResponse = await ArticleService.getArticles();
                console.log('Fetched articles data:', articlesData);
                setArticles(articlesData);
                console.log('State articles:', articles);
            } catch (error) {
                console.error('Error fetching the articles:', error);
            }
        };

        fetchArticles();
    }, []);

    return (
        <div>
            <Navbar />
            <div>
            <h1>Article List</h1>
            {articles?.articles_list ? (
                articles.articles_list.map((article) => (
                    <div className="grid grid-cols-5 gap-2 bg-gray-400 m-5 p-2" key={article.id}>
                        <div className="col-span-4 row-span-1">
                            <h2 className="font-bold text-4xl font-sans bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">
                                {article.title}
                            </h2>
                        </div>
                        <div className="col-span-1 row-span-1">
                            <div>{article.author}</div>
                            <div>role</div>
                        </div>
                        <div className="col-span-4 row-span-1">
                            <div className="font-bold text-black font-sans text-base p-2">
                                {article.sections[0]?.body}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>Loading articles...</p>
            )}
            </div>
            
            <Footer />
        </div>
    );
};

export default ArticleList;
