import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Container, IconButton, Link, Menu, MenuItem, Toolbar } from "@mui/material";
import React from "react";

const Header = () => {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar className="header" position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							<MenuItem key="SIT Home" onClick={handleCloseNavMenu}>
								<Link
									underline="none"
									href="https://www.nist.gov/services-resources/software/smart-investment-tool"
									target="_blank"
									rel="noopener"
									onClick={handleCloseNavMenu}
									sx={{ my: 2, color: "#000", display: "block" }}
									className="headerBtn"
								>
									SIT Home
								</Link>
							</MenuItem>
							<MenuItem key="User Guide" onClick={handleCloseNavMenu}>
								<Link
									underline="none"
									href="https://www.nist.gov/el/applied-economics-office/manufacturing/capital-investment-analysis"
									target="_blank"
									rel="noopener"
									onClick={handleCloseNavMenu}
									sx={{ my: 2, color: "#000", display: "block" }}
									className="headerBtn mb-0"
								>
									User Guide
								</Link>
							</MenuItem>
							<MenuItem key="EM" onClick={handleCloseNavMenu}>
								<Link
									underline="none"
									href="https://www.nist.gov/el/applied-economics-office/manufacturing"
									target="_blank"
									rel="noopener"
									onClick={handleCloseNavMenu}
									sx={{ my: 2, color: "#000", display: "block" }}
									className="headerBtn mb-0"
								>
									Economics of Manufacturing
								</Link>
							</MenuItem>
							<MenuItem key="AEO" onClick={handleCloseNavMenu}>
								<Link
									underline="none"
									href="https://www.nist.gov/el/applied-economics-office"
									target="_blank"
									rel="noopener"
									onClick={handleCloseNavMenu}
									sx={{ my: 2, color: "#000", display: "block" }}
									className="headerBtn mb-0"
								>
									Applied Economics Office
								</Link>
							</MenuItem>
						</Menu>
					</Box>

					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} className="text-center space-x-8">
						<span className="flex flex-col ">
							<Link
								underline="none"
								href="https://www.nist.gov/services-resources/software/smart-investment-tool"
								target="_blank"
								rel="noopener"
								key="SIT Home"
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "#000", display: "block" }}
								className="headerBtn"
							>
								SIT Home
							</Link>
							<div style={{ borderTop: "2px solid #ef860a ", marginLeft: 15, marginRight: 15 }}></div>
						</span>
						<span>
							<Link
								underline="none"
								href="https://www.nist.gov/el/applied-economics-office/manufacturing/capital-investment-analysis"
								target="_blank"
								rel="noopener"
								key="User Guide"
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "#000", display: "block" }}
								className="headerBtn mb-0"
							>
								User Guide
							</Link>
							<div style={{ borderTop: "2px solid #ef860a ", marginLeft: 15, marginRight: 15 }}></div>
						</span>
						<span>
							<Link
								underline="none"
								href="https://www.nist.gov/el/applied-economics-office/manufacturing"
								target="_blank"
								rel="noopener"
								key="EM"
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "#000", display: "block" }}
								className="headerBtn mb-0"
							>
								Economics of Manufacturing
							</Link>
							<div style={{ borderTop: "2px solid #ef860a ", marginLeft: 15, marginRight: 15 }}></div>
						</span>
						<span>
							<Link
								underline="none"
								href="https://www.nist.gov/el/applied-economics-office"
								target="_blank"
								rel="noopener"
								key="AEO"
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "#000", display: "block" }}
								className="headerBtn mb-0"
							>
								Applied Economics Office
							</Link>
							<div style={{ borderTop: "2px solid #ef860a ", marginLeft: 15, marginRight: 15 }}></div>
						</span>
					</Box>
				</Toolbar>
			</Container>
			<br />
		</AppBar>
	);
};

export default Header;
