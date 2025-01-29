import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const itemsPerPage = 10; // Items per page

const PaginatedItems = ({ items }) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  // Handle page changes
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  React.useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset)); // Current page items
    setPageCount(Math.ceil(items.length / itemsPerPage)); // Total pages
  }, [itemOffset, items]);

  return (
    <div>
      <ul>
        {currentItems.map((item, index) => (
          <li key={index} className="p-2 border-b">
            {item}
          </li>
        ))}
      </ul>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< Prev"
        renderOnZeroPageCount={null}
        containerClassName="flex justify-center gap-2 mt-4"
        pageClassName="px-3 py-1 border rounded"
        activeClassName="bg-blue-500 text-white"
        previousClassName="px-3 py-1 border rounded"
        nextClassName="px-3 py-1 border rounded"
        breakClassName="px-3 py-1"
      />
    </div>
  );
};

export default function App() {
  const items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

  return (
    <div>
      <h1 className="text-xl font-bold text-center">Paginated Items</h1>
      <PaginatedItems items={items} />
    </div>
  );
}
