'use client';
import {useEffect, useState} from "react";
import Content from "@/models/Content";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/components/Pagination";


function formatDate(rawDate) {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const formattedDate = new Date(rawDate).toLocaleDateString('id-ID', options);
    return formattedDate;
}
function ContentCard({title, date, image}) {
    const formattedDate = formatDate(date).toUpperCase();
    return(
        <Link href={`#`}>
            <div className="overflow-hidden rounded-xl w-52 h-64 bg-white border-2 shadow-md shadow-primary-blue/75 transition-all hover:shadow-lg hover:scale-[1.03] hover:shadow-primary-blue">
                <Image src={image} className="w-full h-32 object-cover" alt="project-img" width={640} height={320} loading={'lazy'}/>
                <p className="text-xs text-gray-400 text-left bg-secondary pt-2 px-3">{formattedDate}</p>
                <h5 className="text-primary text-left bg-secondary pt-1 px-3 clamp-3">{title}</h5>
            </div>
        </Link>
    )
}
export default function ContentView() {
    const [pageNumbers, setPageNumbers] = useState(1);
    const [pageSizes, setPageSizes] = useState(10);
    const [sortBy, setSortBy] = useState('-published_at');
    const [totalContent, setTotalContent] = useState(0);
    const [data, setData] = useState(null);

    const startRange = (pageNumbers - 1) * pageSizes + 1;
    const endRange = Math.min(pageNumbers * pageSizes, totalContent);
    const showingRange = `${startRange} - ${endRange} of ${totalContent}`;

    // Menggunakan useEffect untuk membaca nilai dari localStorage saat komponen dimuat
    useEffect(() => {
        const storedPageNumbers = localStorage.getItem('pageNumbers');
        const storedPageSizes = localStorage.getItem('pageSizes');
        const storedSortBy = localStorage.getItem('sortBy');

        // Mengatur state berdasarkan nilai-nilai dari localStorage atau default jika tidak ada
        setPageNumbers(storedPageNumbers ? parseInt(storedPageNumbers, 10) : 1);
        setPageSizes(storedPageSizes ? parseInt(storedPageSizes, 10) : 10);
        setSortBy(storedSortBy || '-published_at');
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const contentData = await Content.getContents(pageNumbers, pageSizes, sortBy);
                setData(contentData);
            } catch (error) {
                console.error('Error fetching content data:', error);
            }
        };

        fetchData();
    }, [pageNumbers, pageSizes, sortBy]);

    useEffect(() => {
        const fetchTotalContent = async () => {
            try {
                const totalContent = await Content.getTotalContents();
                setTotalContent(totalContent);
            } catch (error) {
                console.error('Error fetching total content:', error);
            }
        };

        fetchTotalContent().then(r => {});
    }, []);

    const handlePageSize = (e) => {
        const newSize = parseInt(e.target.value, 10);
        setPageSizes(newSize);
        localStorage.setItem('pageSizes', newSize.toString());
    }

    const handleSortBy = (e) => {
        const newSortBy = e.target.value;
        setSortBy(newSortBy);
        localStorage.setItem('sortBy', newSortBy);
    }

    const handlePageChange = (page) => {
        setPageNumbers(page);
        localStorage.setItem('pageNumbers', page);
    };

    return(
        <div id={'techStack'} className="max-w-screen bg-[#ffffff] pt-10">
            <div className="container mx-auto h-full flex flex-col justify-center items-center">
                <div className="flex justify-between items-center px-24 w-full">
                    <p>{`Showing ${startRange} - ${endRange} of ${totalContent}`}</p>
                    <div className="flex space-x-4">
                        {/* Option show per page */}
                        <div className="flex items-center">
                            <label htmlFor="perPage">Show Per Page:</label>
                            <select id="perPage" className="ml-2 px-5 py-1 border-2 border-gray-300 rounded-full" onChange={handlePageSize} value={pageSizes}>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                        </div>

                        {/* Option sort by */}
                        <div className="flex items-center">
                            <label htmlFor="sortBy">Sort By:</label>
                            <select id="sortBy" className="ml-2 px-5 py-1 border-2 border-gray-300 rounded-full" onChange={handleSortBy} value={sortBy}>
                                <option value="-published_at">Latest</option>
                                <option value="published_at">Oldest</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center transition-all gap-4 p-4">
                    <div className="flex flex-wrap justify-center transition-all gap-8 w-full lg:gap-4 p-4">
                        {data ? (
                            data.map((content, index) => (
                                <ContentCard key={index} title={content.title} date={content.publishAt} image={content.smallImg} />
                            ))
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
                <Pagination totalPages={Math.ceil(totalContent / pageSizes)} currentPage={pageNumbers} onChangePage={handlePageChange} />
            </div>
        </div>
    )
}

