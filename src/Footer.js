
const Footer = ({length}) => {
    // const today = new Date
  return (
    <footer>
       <p>  {length===1 ? `${length} item on the list` : `${length} items on the list` }</p>
        {/* <p>Copyright &copy; {today.getUTCFullYear()} </p> */}
    </footer>
  )
}

export default Footer
