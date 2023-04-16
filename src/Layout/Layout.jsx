import NavBar from "../NavBar";
import { Outlet } from "react-router-dom";
import { Box } from "./Layout.styled";

const Layout = () => {
  return (
    <Box>
      <NavBar/>
      <Outlet/>
    </Box>
  )
}

export default Layout;
