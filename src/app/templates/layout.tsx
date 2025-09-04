import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-[100vh] h-fit bg-gray-100 mt-10 absolute inset-x-0 max-w-4xl mx-auto rounded-lg shadow-lg top-10 relative">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto p-2 text-black">
                    <h1 className="text-3xl font-bold">Email Preview</h1>
                </div>
            </header>
            <main>{children}</main>
        </div>
    );
};

export default Layout;
