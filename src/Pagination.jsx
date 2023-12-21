import React,{useEffect, useState} from "react";

const pageNos = [1,2,3,4,5,6,7,8,9,10];

const Pagination = () => {
    const [selectedPage, setSelectedPage] = useState(1);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${selectedPage}`);
                const data = await response.json();
                setPosts(data);
            }catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    },[selectedPage]);

    const handlePrevoius = () => {
        if(selectedPage === 1){
            setSelectedPage(1);
        }else{
            setSelectedPage(selectedPage - 1);
        }
    };

    const handleNext = () => {
        if(selectedPage === 10){
            setSelectedPage(10);
        }else{
            setSelectedPage(selectedPage + 1);
        }
    };


    return(<div>
    <h1>Server Side Pagination</h1>
    <div>
        <h3>Posts</h3>
        <ul>
            {posts.map((post)=>{
                return <li key={post.id}>{post.title}</li>
            })}
        </ul>
    </div>
    <button onClick={handlePrevoius}>Previous</button>
    {pageNos.map((pageNo, index)=>{
        return <button key={index} className={selectedPage === pageNo ? "selected-btn-style" : ""} onClick={()=>{setSelectedPage(pageNo)}}>{pageNo}</button>
    })}
    <button onClick={handleNext}>Next</button>
    </div>)
};

export default Pagination;
