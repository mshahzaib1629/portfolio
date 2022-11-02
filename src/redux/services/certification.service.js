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

const getCertificationList = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(firestore, K.collections.certifications.name)
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

const addNewCertification = async (data) => {
  try {
    const docRef = await addDoc(
      collection(firestore, K.collections.certifications.name),
      data
    );
    // console.log("document written with ID: ", docRef.id);
  } catch (error) {
    throw error;
  }
};

const updateCertification = async (data) => {
  try {
    const docRef = doc(firestore, K.collections.certifications.name, data?.id);
    await updateDoc(docRef, data);
    // console.log("document updated with ID: ", docRef.id);
  } catch (error) {
    throw error;
  }
};

const deleteCertification = async (id) => {
  try {
    const docRef = doc(firestore, K.collections.certifications.name, id);
    await deleteDoc(docRef);
    // console.log("Document updated with ID: ", docRef.id);
  } catch (error) {
    throw error;
  }
};

const CertificationService = {
  getCertificationList,
  addNewCertification,
  updateCertification,
  deleteCertification,
};

export default CertificationService;
