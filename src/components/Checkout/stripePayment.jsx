import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';

// Initialize Firebase and get instances
const db = getFirestore();
const auth = getAuth();
const functions = getFunctions();

// Function to create a checkout session
const createCheckoutSessions = async (priceIds) => {
  console.log(priceIds)
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("User is not authenticated");

  // Add checkout session document to Firestore
  const checkoutSessionRef = collection(db, 'customers', userId, 'checkout_sessions');
  
  const docRef = await addDoc(checkoutSessionRef, {
    line_items: priceIds,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  });

  // Get a reference to the Firebase Function for creating checkout sessions
  const createCheckoutSessionFunction = httpsCallable(functions, 'createCheckoutSession');
  
  // Call the Firebase Function
  const { data } = await createCheckoutSessionFunction({ docId: docRef.id });

  return data;
}
export default createCheckoutSessions;

// Example usage



