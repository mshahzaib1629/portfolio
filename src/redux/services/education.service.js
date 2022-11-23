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

const getEducationList = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(firestore, K.collections.education.name)
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
      .sort((a, b) => b.duration.isStudying - a.duration.isStudying);
    return data;
  } catch (error) {
    throw error;
  }
};

const addNewEducation = async (data) => {
  try {
    const docRef = await addDoc(
      collection(firestore, K.collections.education.name),
      data
    );
    // console.log("document written with ID: ", docRef.id);
  } catch (error) {
    throw error;
  }
};

const updateEducation = async (data) => {
  try {
    const dataToUpdate = JSON.parse(JSON.stringify(data));
    delete dataToUpdate["id"];
    const docRef = doc(firestore, K.collections.education.name, data?.id);
    await updateDoc(docRef, dataToUpdate);
    // console.log("document updated with ID: ", docRef.id);
  } catch (error) {
    throw error;
  }
};

const deleteEducation = async (id) => {
  try {
    const docRef = doc(firestore, K.collections.education.name, id);
    await deleteDoc(docRef);
    // console.log("Document updated with ID: ", docRef.id);
  } catch (error) {
    throw error;
  }
};

const EducationService = {
  getEducationList,
  addNewEducation,
  updateEducation,
  deleteEducation,
};

export default EducationService;
