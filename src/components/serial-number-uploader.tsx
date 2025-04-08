import React, { useState } from "react";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../App";
import { DB_COLLECTIONS } from "./baby-journal-settings";
import { Preview, random_hex_code } from "../Pages/admin";
import { defaultPermissions } from "./usePermission";
import Papa from "papaparse";

const SerialUploader = ({ setProducts }: { setProducts: any }) => {
  const [serials, setSerials] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // ✅ NEW
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const text = await file.text();
    const lines = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line !== "");

    setSerials(lines);
    console.log("Loaded serial numbers:", lines);
  };

  const handleUpload = async () => {
    if (serials.length === 0) {
      alert("No serial numbers loaded.");
      return;
    }

    let skipped = 0;
    let uploaded = 0;
    let error = 0;

    setLoading(true);
    setProgress(0);

    for (let i = 0; i < serials.length; i++) {
      const serial = serials[i];
      try {
        const serialRef = doc(db, DB_COLLECTIONS.SERIAL_NUMBERS, serial);
        const serialSnap = await getDoc(serialRef);

        if (serialSnap.exists()) {
          console.log(`Serial already exists, skipping: ${serial}`);
          skipped++;
        } else {
          const hexCode = random_hex_code();
          const productRef = await addDoc(
            collection(db, DB_COLLECTIONS.PRODUCTS),
            {
              activated: false,
              unlockCode: hexCode,
              name: "New Product",
              preview: Preview.BUSINESS_CARD,
              processed: false,
            }
          ).then((data) => {
            setProducts((prev: any) => [
              ...prev,
              {
                id: data.id,
                activated: false,
                unlockCode: hexCode,
                name: "New Product",
                preview: Preview.BUSINESS_CARD,
                processed: false,
                isDGSK: true,
              },
            ]);
            setDoc(doc(db, DB_COLLECTIONS.PERMISSIONS, data.id), defaultPermissions);
            setDoc(doc(db, DB_COLLECTIONS.ADULT_JOURNALS, data.id), {});
            setDoc(doc(db, DB_COLLECTIONS.BABY_JOURNALS, data.id), {});
            setDoc(doc(db, DB_COLLECTIONS.ANIMAL_TAG, data.id), {});
            return data;
          });

          await setDoc(doc(db, DB_COLLECTIONS.SERIAL_NUMBERS, serial), {
            productID: productRef.id,
          });

          console.log(`Uploaded: ${serial} → ${productRef.id}`);
          uploaded++;
        }
      } catch (err) {
        console.error(`Error with ${serial}:`, err);
        error++;
      }

      // ✅ Update progress
      setProgress(Math.round(((i + 1) / serials.length) * 100));
    }

    setLoading(false);
    alert(`Upload complete! ✅ Created: ${uploaded}, Skipped: ${skipped}, Error: ${error}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload Serial Numbers</h2>

      <input
        type="file"
        accept=".txt"
        onChange={handleFileUpload}
        disabled={loading}
      />

      {fileName && (
        <p>
          Loaded file: <strong>{fileName}</strong>
        </p>
      )}
      {serials.length > 0 && <p>Detected {serials.length} serial numbers.</p>}

      <button
        onClick={handleUpload}
        disabled={loading || serials.length === 0}
        style={{
          marginTop: 10,
          padding: "8px 16px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Uploading..." : "Upload to Firebase"}
      </button>

      {/* ✅ Progress bar */}
      {loading && (
        <div style={{ marginTop: 10, width: "100%", backgroundColor: "#eee", borderRadius: 4 }}>
          <div
            style={{
              height: 10,
              width: `${progress}%`,
              backgroundColor: "#4caf50",
              borderRadius: 4,
              transition: "width 0.2s ease",
            }}
          />
          <div style={{ marginTop: 5, fontSize: 12 }}>{progress}%</div>
        </div>
      )}
    </div>
  );
};

export default SerialUploader;
