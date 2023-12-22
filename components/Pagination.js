export default function Pagination({ totalPages, currentPage, onChangePage }) {
    const getPageRange = () => {
        const range = [];
        const start = Math.max(1, currentPage - 2);
        const end = Math.min(totalPages, start + 4);

        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        return range;
    };

    return (
        <div className="flex justify-center items-center py-4">
            {/* Tombol untuk halaman pertama */}
            <button
                onClick={() => onChangePage(1)}
                className={`px-3 py-1 rounded-full font-extrabold ${
                    currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'
                }`}
                disabled={currentPage === 1}
            >
                {'<<'}
            </button>

            {/* Tombol untuk halaman sebelumnya */}
            <button
                onClick={() => onChangePage(currentPage - 1)}
                className={`mx-2 px-3 py-1 rounded-full font-extrabold ${
                    currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'
                }`}
                disabled={currentPage === 1}
            >
                {'<'}
            </button>

            {/* Tombol untuk nomor halaman */}
            {getPageRange().map((page) => (
                <button
                    key={page}
                    onClick={() => onChangePage(page)}
                    className={`mx-2 px-2 py-1 rounded-md ${
                        currentPage === page ? 'bg-[#ff6600] text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                >
                    {page}
                </button>
            ))}

            {/* Tombol untuk halaman berikutnya */}
            <button
                onClick={() => onChangePage(currentPage + 1)}
                className={`mx-2 px-3 py-1 rounded-full font-extrabold ${
                    currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'
                }`}
                disabled={currentPage === totalPages}
            >
                {'>'}
            </button>

            {/* Tombol untuk halaman terakhir */}
            <button
                onClick={() => onChangePage(totalPages)}
                className={`px-3 py-1 rounded-full font-extrabold ${
                    currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'
                }`}
                disabled={currentPage === totalPages}
            >
                {'>>'}
            </button>
        </div>
    );
}