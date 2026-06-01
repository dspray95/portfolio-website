import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "./firebase";

export async function fetchHighScores(maxEntries: number): Promise<string> {
  const q = query(
    collection(db, "high_scores"),
    orderBy("score", "desc"),
    limit(maxEntries)
  );
  const snapshot = await getDocs(q);
  const scores = snapshot.docs.map((doc) => {
    const data = doc.data();
    return { initials: data.initials as string, score: data.score as number };
  });
  return JSON.stringify(scores);
}

export async function submitHighScore(
  initials: string,
  score: number
): Promise<unknown> {
  return addDoc(collection(db, "high_scores"), {
    initials,
    score,
    timestamp: Date.now(),
  });
}
