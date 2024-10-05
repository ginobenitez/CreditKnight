"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './cards.module.css';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function Dashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState('Guest'); // State to hold user name
  const kindeClient = useKindeBrowserClient(); // Initialize the Kinde client

  // useEffect to fetch user data when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await kindeClient.getUser(); // Fetch user data
        console.log(user); // Log user data
        setUserName(user?.given_name || 'Guest'); // Safely set the user's given name
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser(); // Call the fetchUser function
  }, [kindeClient]); // Dependency array to run effect when the client changes

  // Function to handle card clicks
  const handleCardClick = (page: string) => {
    router.push(page); // Navigate to the specified page
  };

  return (
    <div className={styles.container}>
      <h1>{userName}'s Dashboard</h1>
    
      <div className={styles.cards}>
      <div className={styles.cardGroup}>
        <div className={styles.card} onClick={() => handleCardClick('/feature1')}>
          <h3>Feature 1</h3>
          <p>Description for feature 1</p>
        </div>
        <div className={styles.card} onClick={() => handleCardClick('/feature3')}>
          <h3>Feature 3</h3>
          <p>Description for feature 3</p>
        </div>
      </div>
      <div className={styles.cardGroup} onClick={() => handleCardClick('/feature2')}>  
        <div className={styles.card}>
          <h3>Feature 2</h3>
          <p>Description for feature 2</p>
        </div>
        <div className={styles.card} onClick={() => handleCardClick('/feature4')}>
          <h3>Feature 4</h3>
          <p>Description for feature 4</p>
        </div>
      </div>
      </div>
    </div>
  );
}
