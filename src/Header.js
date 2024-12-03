
const Header = ({ title }) => {
  return (
    <header>
      <h1 style={{ marginLeft: "1.2rem", paddingTop: "1.2rem", paddingBottom: "1.2rem" }}>{title}</h1>
    </header>
  )
}
Header.defaultProps = {
  title: " Default Title"
}
export default Header
