import { firestore } from "../../utils/firebase-setup";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
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

const getCertificationList = async () => {
  try {
    const certificationCollectionRef = collection(
      firestore,
      K.collections.certifications.name
    );
    const q = query(
      certificationCollectionRef,
      orderBy("date.year", "desc"),
      orderBy("date.month.index", "desc")
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

const deleteImage = async (imageRef) => {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, imageRef);
    await deleteObject(storageRef);
  } catch (error) {
    console.log("error while deleting image: ", imageRef);
    // throw error;
  }
};

const updateImage = async (previousImageRef, newImageFile) => {
  try {
    const storage = getStorage();
    const storageRef = ref(
      storage,
      K.collections.certifications.name +
        "/" +
        uuidv4() +
        "." +
        newImageFile.name.split(".")[1]
    );
    if (previousImageRef != "") deleteImage(previousImageRef);
    const uploadResponse = await uploadBytes(storageRef, newImageFile);
    const imageUrl = await getDownloadURL(storageRef);
    return { imageUrl: imageUrl, imageRef: uploadResponse?.metadata?.fullPath };
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

const updateSorting = async (item1, item2) => {
  try {
    const dataToUpdate1 = JSON.parse(JSON.stringify(item1));
    delete dataToUpdate1["id"];
    const dataToUpdate2 = JSON.parse(JSON.stringify(item2));
    delete dataToUpdate2["id"];
    const docRef1 = doc(
      firestore,
      K.collections.certifications.name,
      item1?.id
    );
    const docRef2 = doc(
      firestore,
      K.collections.certifications.name,
      item2?.id
    );
    await updateDoc(docRef1, dataToUpdate1);
    await updateDoc(docRef2, dataToUpdate2);
  } catch (error) {
    throw error;
  }
};

const deleteCertification = async (cert) => {
  try {
    if (cert?.imageRef != null) await deleteImage(cert?.imageRef);
    const docRef = doc(firestore, K.collections.certifications.name, cert.id);
    await deleteDoc(docRef);
  } catch (error) {
    throw error;
  }
};

const CertificationService = {
  getCertificationList,
  addNewCertification,
  deleteImage,
  updateImage,
  updateCertification,
  updateSorting,
  deleteCertification,
};

export default CertificationService;
