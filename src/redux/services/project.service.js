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

const getProjectList = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(firestore, K.collections.projects.name)
    );
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

const addNewProject = async (data) => {
  try {
    const docRef = await addDoc(
      collection(firestore, K.collections.projects.name),
      data
    );
    // console.log("document written with ID: ", docRef.id);
  } catch (error) {
    throw error;
  }
};

const updateProject = async (data) => {
  try {
    const dataToUpdate = JSON.parse(JSON.stringify(data));
    delete dataToUpdate['id'];
    const docRef = doc(firestore, K.collections.projects.name, data?.id);
    await updateDoc(docRef, dataToUpdate);
    // console.log("document updated with ID: ", docRef.id);
  } catch (error) {
    throw error;
  }
};

const deleteProject = async (id) => {
  try {
    const docRef = doc(firestore, K.collections.projects.name, id);
    await deleteDoc(docRef);
    // console.log("Document updated with ID: ", docRef.id);
  } catch (error) {
    throw error;
  }
};

const ProjectService = {
  getProjectList,
  addNewProject,
  updateProject,
  deleteProject,
};

export default ProjectService;
