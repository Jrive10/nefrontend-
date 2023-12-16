import React, { useState, useEffect } from "react";

function Profile() {
  // State to hold user data
  const [user, setUser] = useState(null);

  // Function to fetch user data
  const fetchUser = async () => {
    try {
      // Fetch user data from your backend API
      const response = await fetch(" ", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="profile">
      {user ? (
        <>
          <h2>Welcome, {user.username}!</h2>
          <p>Email: {user.email}</p>
          {/* Add more user information as needed */}
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default Profile;
