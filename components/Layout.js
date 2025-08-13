import Navbar from './Navbar';

export default function Layout({ children, user }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      <Navbar user={user} />
      <main>{children}</main>
    </div>
  );
}
