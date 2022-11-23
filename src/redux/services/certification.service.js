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

const getCertificationList = async () => {
  try {
    const certificationCollectionRef = collection(
      firestore,
      K.collections.certifications.name
    );
    const q = query(certificationCollectionRef, orderBy("index", "desc"));
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
    const dataToUpdate = JSON.parse(JSON.stringify(data));
    delete dataToUpdate["id"];
    const docRef = doc(firestore, K.collections.certifications.name, data?.id);
    await updateDoc(docRef, dataToUpdate);
    // console.log("document updated with ID: ", docRef.id);
  } catch (error) {
    throw error;
  }
};

const updateCertificationSorting = async (certificate1, certificate2) => {
  try {
    const dataToUpdate1 = JSON.parse(JSON.stringify(certificate1));
    delete dataToUpdate1["id"];
    const dataToUpdate2 = JSON.parse(JSON.stringify(certificate2));
    delete dataToUpdate2["id"];
    const docRef1 = doc(
      firestore,
      K.collections.certifications.name,
      certificate1?.id
    );
    const docRef2 = doc(
      firestore,
      K.collections.certifications.name,
      certificate2?.id
    );
    await updateDoc(docRef1, dataToUpdate1);
    await updateDoc(docRef2, dataToUpdate2);
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
  updateCertificationSorting,
  deleteCertification,
};

export default CertificationService;
