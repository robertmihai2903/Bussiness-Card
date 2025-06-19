import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router"
import { db } from "../App";
import { DB_COLLECTIONS } from "../components/baby-journal-settings";

export function SerialNumberRedirect () {
    const navigate = useNavigate()
    const urlParams = new URLSearchParams(window.location.search)
    const serialNumber = urlParams.get('serialNumber') || ""

    useEffect(() => {
        const fetchProductID = async () => {
          // Initialize Firestore
    
          // Reference to the document based on the productID
          const serialNumberDocRef = doc(db, DB_COLLECTIONS.SERIAL_NUMBERS, serialNumber);
    
          // Try to get the document
          const serialNumberDoc = await getDoc(serialNumberDocRef);
    
          console.log("Serial Number Document: ", serialNumberDoc)
          if (serialNumberDoc.exists()) {


          navigate(`/show-product?product_id=${serialNumberDoc.data()?.productID}`)
          }
        };
        fetchProductID();  // Call the function to fetch the document
    
        // Call the function to fetch the document
    
      }, []); // Only re-run when the productID changes

    return <div></div>
}

