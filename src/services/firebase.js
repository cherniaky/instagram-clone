import {
    firebase,
    db,
    auth,
    signInWithEmailAndPassword,
} from "../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function doesUsernameExist(username) {
    const q = query(collection(db, "users"), where("username", "==", username));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.length;
}

export async function getUserByUserId(userId) {

    const q = query(collection(db, "users"), where("userId", "==",userId));

    const querySnapshot = await getDocs(q);

    const user =querySnapshot.docs.map((item)=>({
       ...item.data(),
       docId: item.id,
    }))

    return user[0];
}


