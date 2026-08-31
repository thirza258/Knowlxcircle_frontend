import { Link, useNavigate } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useAuth } from '../useAuth';

const UserMenu = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                    Account
                </MenuButton>
            </div>

            <MenuItems className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                    <MenuItem>
                        {({ focus }) => (
                            <Link
                                to="/dashboard"
                                className={`block px-4 py-2 text-sm ${focus ? 'bg-gray-100' : ''}`}
                            >
                                Dashboard
                            </Link>
                        )}
                    </MenuItem>
                    <MenuItem>
                        {({ focus }) => (
                            <Link
                                to="/user"
                                className={`block px-4 py-2 text-sm ${focus ? 'bg-gray-100' : ''}`}
                            >
                                User Page
                            </Link>
                        )}
                    </MenuItem>
                    <MenuItem>
                        {({ focus }) => (
                            <button
                                type="button"
                                onClick={handleLogout}
                                className={`block w-full mt-5 text-left px-4 py-2 bg-white text-sm ${focus ? 'bg-gray-100' : ''}`}
                            >
                                Logout
                            </button>
                        )}
                    </MenuItem>
                </div>
            </MenuItems>
        </Menu>
    );
};

export default UserMenu;
