const Filter = ({ filter, filterName }) => {
    return (
      <p>
        filter shown with <input value={filter} onChange={filterName} />
      </p>
    )
  }
  
  export default Filter;