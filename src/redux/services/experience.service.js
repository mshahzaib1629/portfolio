import { firestore } from "../../utils/firebase-setup";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import K from "../../utils/constants";

const getExperienceList = async () => {
  try {
    const experienceCollectionRef = collection(
      firestore,
      K.collections.experience.name
    );
    const q = query(
      experienceCollectionRef,
      orderBy("duration.endYear", "desc"),
      orderBy("duration.endMonth.index", "desc"),
      orderBy("duration.isWorkingHere", "desc")
    );
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

const addNewExperience = async (data) => {
  try {
    const docRef = await addDoc(
      collection(firestore, K.collections.experience.name),
      data
    );
    // console.log("document written with ID: ", docRef.id);
  } catch (error) {
    throw error;
  }
};

const updateExperience = async (data) => {
  try {
    const dataToUpdate = JSON.parse(JSON.stringify(data));
    delete dataToUpdate["id"];
    const docRef = doc(firestore, K.collections.experience.name, data?.id);
    await updateDoc(docRef, dataToUpdate);
    // console.log("document updated with ID: ", docRef.id);
  } catch (error) {
    throw error;
  }
};

const deleteExperience = async (experience) => {
  try {
    const docRef = doc(firestore, K.collections.experience.name, experience.id);
    await deleteDoc(docRef);
    // console.log("Document updated with ID: ", docRef.id);
  } catch (error) {
    throw error;
  }
};

const ExperienceService = {
  getExperienceList,
  addNewExperience,
  updateExperience,
  deleteExperience,
};

export default ExperienceService;
