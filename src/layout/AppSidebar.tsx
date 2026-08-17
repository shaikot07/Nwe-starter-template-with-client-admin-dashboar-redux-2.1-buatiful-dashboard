import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

// Assume these icons are imported from an icon library

import { useSidebar } from "../context/SidebarContext";
import SidebarWidget from "./SidebarWidget";
import logo from "../assets/logo.png";
import logoDark from "../assets/logo-dark.png";
import {
  ChevronDown,
  ChevronLeft,
  CircleUser,
  Ellipsis,
  Grid2x2,
  House,
  Rows4,
} from "lucide-react";
type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <House />,
    name: "Home",
    path: "/dashboard/dashboardHome",
  },
  {
    icon: <Grid2x2 />,
    name: "Dashboard",
    subItems: [{ name: "Ecommerce", path: "/", pro: false }],
  },

  {
    icon: <CircleUser />,
    name: "User Profile",
    path: "/profile",
  },
  {
    name: "Forms",
    icon: <Rows4 />,
    subItems: [{ name: "Form Elements", path: "/form-elements", pro: false }],
  },

  // {
  //   name: "Tables",
  //   icon: <TableIcon />,
  //   subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],  with sub iteam
  // },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, toggleSidebar } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {},
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => location.pathname === path;
  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname],
  );

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-3">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } ${
                isExpanded || isMobileOpen
                  ? "w-full flex items-center justify-start gap-3 px-3 py-2.5 rounded-lg"
                  : "w-11 h-11 mx-auto flex items-center justify-center gap-0 px-0 rounded-lg"
              }`}
            >
              <span
                className={`menu-item-icon-size flex items-center justify-center shrink-0 ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              <span
                className={`menu-item-text whitespace-nowrap overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isExpanded || isMobileOpen
                    ? "max-w-[200px] opacity-100 ml-3"
                    : "max-w-0 opacity-0 ml-0 pointer-events-none hidden"
                }`}
              >
                {nav.name}
              </span>
              <ChevronDown
                className={`w-5 h-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  openSubmenu?.type === menuType &&
                  openSubmenu?.index === index
                    ? "rotate-180 text-blue-500"
                    : ""
                } ${
                  isExpanded || isMobileOpen
                    ? "max-w-[20px] opacity-100 ml-auto"
                    : "max-w-0 opacity-0 ml-0 pointer-events-none hidden"
                }`}
              />
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                } ${
                  isExpanded || isMobileOpen
                    ? "w-full flex items-center justify-start gap-3 px-3 py-2.5 rounded-lg"
                    : "w-11 h-11 mx-auto flex items-center justify-center gap-0 px-0 rounded-lg"
                }`}
              >
                <span
                  className={`menu-item-icon-size flex items-center justify-center shrink-0 ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                <span
                  className={`menu-item-text whitespace-nowrap overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isExpanded || isMobileOpen
                      ? "max-w-[200px] opacity-100 ml-3"
                      : "max-w-0 opacity-0 ml-0 pointer-events-none hidden"
                  }`}
                >
                  {nav.name}
                </span>
              </Link>
            )
          )}
          {nav.subItems && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                height:
                  (isExpanded || isMobileOpen) &&
                  openSubmenu?.type === menuType &&
                  openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-[width,transform,padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-[100000] border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px] px-5"
            : "w-[90px] px-0"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
    >
      {/* Circular border toggle button for Desktop */}
      <button
        onClick={toggleSidebar}
        className="hidden lg:flex absolute -right-3.5 top-7 z-[100001] items-center justify-center w-7 h-7 bg-pink-500 text-white border border-pink-400 rounded-full shadow-md hover:bg-pink-600 hover:scale-110 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
        aria-label={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
      >
        <ChevronLeft
          className={`w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            !isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`py-8 flex items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isExpanded || isMobileOpen ? "justify-start px-0" : "justify-center px-0"
        }`}
      >
        <Link to="/" className="flex items-center justify-center">
          {isExpanded || isMobileOpen ? (
            <div className="transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-100">
              <img
                className="dark:hidden"
                src={logo}
                alt="Logo"
                width={150}
                height={40}
              />
              <img
                className="hidden dark:block"
                src={logoDark}
                alt="Logo"
                width={150}
                height={40}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center w-11 h-11 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-100">
              <img
                src="/images/logo/logo-icon.svg"
                alt="Logo"
                width={32}
                height={32}
              />
            </div>
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex items-center leading-[20px] text-gray-400 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isExpanded || isMobileOpen
                    ? "justify-start px-0"
                    : "justify-center px-0"
                }`}
              >
                {isExpanded || isMobileOpen ? (
                  "Menu"
                ) : (
                  <div className="flex items-center justify-center w-11 h-6">
                    <Ellipsis className="size-6" />
                  </div>
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
          </div>
        </nav>
        <div
          className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
            isExpanded || isMobileOpen
              ? "max-h-52 opacity-100 scale-100 px-0"
              : "max-h-0 opacity-0 scale-95 pointer-events-none px-0"
          }`}
        >
          <SidebarWidget />
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
