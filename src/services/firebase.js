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

    ///console.log(querySnapshot.docs);
    return querySnapshot.docs.length ;
    
}
