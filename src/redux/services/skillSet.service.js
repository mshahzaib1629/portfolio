import { firestore } from "../../utils/firebase-setup";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  runTransaction,
  query,
  orderBy,
} from "firebase/firestore";
import K from "../../utils/constants";
import { v4 as uuidv4 } from "uuid";

const getSkillSetList = async () => {
  try {
    const skillSetCollectionRef = collection(
      firestore,
      K.collections.skillSets.name
    );
    const q = query(skillSetCollectionRef, orderBy("index", "desc"));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        index: data.length,
        ...doc.data(),
      });
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const addNewSkillSet = async (data) => {
  try {
    const docRef = await addDoc(
      collection(firestore, K.collections.skillSets.name),
      data
    );
    // console.log("document written with ID: ", docRef.id);
  } catch (error) {
    throw error;
  }
};

const updateSkillSet = async (data) => {
  try {
    const dataToUpdate = JSON.parse(JSON.stringify(data));
    delete dataToUpdate["id"];
    const docRef = doc(firestore, K.collections.skillSets.name, data?.id);
    await updateDoc(docRef, dataToUpdate);
    // console.log("document updated with ID: ", docRef.id);
  } catch (error) {
    throw error;
  }
};

const updateSorting = async (item1, item2) => {
  try {
    const dataToUpdate1 = JSON.parse(JSON.stringify(item1));
    delete dataToUpdate1["id"];
    const dataToUpdate2 = JSON.parse(JSON.stringify(item2));
    delete dataToUpdate2["id"];
    const docRef1 = doc(firestore, K.collections.skillSets.name, item1?.id);
    const docRef2 = doc(firestore, K.collections.skillSets.name, item2?.id);
    await updateDoc(docRef1, dataToUpdate1);
    await updateDoc(docRef2, dataToUpdate2);
  } catch (error) {
    throw error;
  }
};

const deleteSkillSet = async (skill) => {
  try {
    const docRef = doc(firestore, K.collections.skillSets.name, skill.id);
    await deleteDoc(docRef);
  } catch (error) {
    throw error;
  }
};

const SkillSetService = {
  getSkillSetList,
  addNewSkillSet,
  updateSkillSet,
  updateSorting,
  deleteSkillSet,
};

export default SkillSetService;
