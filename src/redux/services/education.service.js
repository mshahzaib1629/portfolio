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

const getEducationList = async () => {
  try {
    const educationColleftionRef = collection(
      firestore,
      K.collections.education.name
    );
    const q = query(
      educationColleftionRef,
      orderBy("duration.endYear", "desc"),
      orderBy("duration.isStudying", "desc")
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

const deleteEducation = async (education) => {
  try {
    const docRef = doc(firestore, K.collections.education.name, education.id);
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
