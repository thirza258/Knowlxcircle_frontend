import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';

const UserMenu = ({ logout }: { logout: () => void }) => (
    <Menu as="div" className="relative inline-block text-left">
        <div>
            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                Account
            </Menu.Button>
        </div>

        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
                <Menu.Item>
                    {({ active }) => (
                        <Link
                            to="/dashboard"
                            className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}
                        >
                            Dashboard
                        </Link>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                        <button
                            onClick={logout}
                            className={`block w-full text-left px-4 py-2 bg-white text-sm ${active ? 'bg-gray-100' : ''}`}
                        >
                            Logout
                        </button>
                    )}
                </Menu.Item>
            </div>
        </Menu.Items>
    </Menu>
);

export default UserMenu;