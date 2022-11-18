import { firestore } from "../../utils/firebase-setup";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import K from "../../utils/constants";

const getExperienceList = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(firestore, K.collections.experience.name)
    );
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        index: data.length,
        ...doc.data(),
      });
    });
    // TODO: IT'S A TEMPORARY SOLUTION. ULTIMATE SOLUTION WILL BE SORTING BY ROWS RE-ORDERING
    data
      .sort((a, b) => b.duration.endYear - a.duration.endYear)
      .sort((a, b) => b.duration.isWorkingHere - a.duration.isWorkingHere);
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
    const docRef = doc(firestore, K.collections.experience.name, data?.id);
    await updateDoc(docRef, data);
    // console.log("document updated with ID: ", docRef.id);
  } catch (error) {
    throw error;
  }
};

const deleteExperience = async (id) => {
  try {
    const docRef = doc(firestore, K.collections.experience.name, id);
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
