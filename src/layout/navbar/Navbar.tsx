import Button from "@/components/Button/Button";
import { storageHelper } from "@/utils/storage.util";
import { useDispatch } from "react-redux";
import { setUser, setAuthentication } from "@/redux/slices/dashboardSlice";
import { NavLink, Link } from "react-router-dom";

const navLinks = [
    {
        label: "Home",
        href: "/platform/home",
    },
    {
        label: "Settings",
        href: "/platform/settings",
    },
];

const Navbar = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        storageHelper.clearCookieItem("token");
        dispatch(setUser(null));
        dispatch(setAuthentication(false));
    };

    return (
        <nav className="z-50 sticky top-0 right-0 left-0 shadow-nav p-4 h-[60px] bg-white items-center flex ">
            <div className="w-full global-container flex justify-between items-center">
                <Link to="/platform/home" className="text-gold font-J-Medium">
                    Articulate
                </Link>
                <div className="flex items-center gap-x-4">
                    {navLinks.map(({ label, href }) => (
                        <NavLink
                            key={label}
                            to={href}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blueGray text-sm sm:text-base font-J-SemiBold"
                                    : "text-blueGray text-sm sm:text-base font-J-Regular"
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>
                <div>
                    <Button onClick={handleLogout} buttonSize="small">
                        Logout
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
