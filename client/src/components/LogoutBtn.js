import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:7000/auth/logout', {
        method: 'GET',
        credentials: 'include', // Important for cross-origin requests with cookies
      });

      if (response.ok) {
        // Logout successful, navigate to login page
        navigate('/login');
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-primary">
      Logout
    </button>
  );
};


export default LogoutButton;