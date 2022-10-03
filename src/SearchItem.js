
const SearchItem = ({search,setSearch}) => {
  return (
    <form onSubmit={(e)=>e.preventDefault()} className='searchForm' action="">
       <label htmlFor="search"></label>
       <input 
       type="text" 
       id='search' 
       role="searchbox" 
       placeholder='search items' 
       value={search}
       onChange={(e)=>setSearch(e.target.value)}
       />
    </form>
  )
} 

export default SearchItem
