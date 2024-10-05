"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './cards.module.css';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
//import {useTranslation} from 'next-i18next';
export default function Dashboard() {
  //const { t } = useTranslation('translation');
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
    <div className={styles.container} style={{backgroundColor: 'black', color: 'white'}}>
      <h1>{userName}'s {('Dashboard')}</h1>
    
      <div className={styles.cards}>
      <div className={styles.cardGroup}>
        <div className={styles.card} onClick={() => handleCardClick('/feature1')} style={{ backgroundColor: '#b8860b', color: 'white' }}>
          <h3>{('FRAUD WATCH')}</h3>
          <p>{('View any suspicious activity on your account')}</p>
        </div>
        <div className={styles.card} onClick={() => handleCardClick('/feature3')} style={{ backgroundColor: '#b8860b', color: 'white' }}>
          <h3>{('SUBSCRIPTIONS')}</h3>
          <p>{('View your recurrent transactions and subscriptions')}</p>
        </div>
      </div>
      <div className={styles.cardGroup} onClick={() => handleCardClick('/feature2')} >  
        <div className={styles.card} style={{ backgroundColor: '#b8860b', color: 'white' }}> 
          <h3>{('TRANSACTION HISTORY')}</h3>
          <p>{('View all transactions')}</p>
        </div>
        <div className={styles.card} onClick={() => handleCardClick('/feature4')} style={{ backgroundColor: '#b8860b', color: 'white' }}>
          <h3>{('FAQs')}</h3>
          <p>{('Frequently asked questions and hybrid chat bot')}</p>
        </div>
      </div>
      </div>
    </div>
  );
}