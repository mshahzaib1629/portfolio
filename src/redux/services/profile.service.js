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
  getDoc,
  updateDoc,
  setDoc,
  deleteDoc,
  runTransaction,
  query,
  orderBy,
} from "firebase/firestore";
import K from "../../utils/constants";
import { v4 as uuidv4 } from "uuid";

const getProfile = async () => {
  try {
    const profileRef = doc(
      firestore,
      K.collections.profile.name,
      K.collections.profile.doc
    );
    const q = query(profileRef);
    const querySnapshot = await getDoc(q);
    let data = {};
    if (querySnapshot.exists()) {
      data = querySnapshot.data();
    }
    // console.log("getProfile response: ", data);
    return data;
  } catch (error) {
    console.log("error while getProfile: ", error);
    throw error;
  }
};

const deleteImage = async (imageRef) => {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, imageRef);
    await deleteObject(storageRef);
  } catch (error) {
    console.log("error while deleting image: ", error);
    // throw error;
  }
};

const updateImage = async (previousImageRef, newImageFile) => {
  try {
    const storage = getStorage();
    const storageRef = ref(
      storage,
      K.collections.profile.name +
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

const deleteResume = async (resumeRef) => {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, resumeRef);
    await deleteObject(storageRef);
  } catch (error) {
    console.log("error while deleting resume: ", resumeRef);
    // throw error;
  }
};

const updateResume = async (previousResumeRef, newResumeFile) => {
  try {
    const storage = getStorage();
    const storageRef = ref(
      storage,
      K.collections.profile.name + "/" + newResumeFile.name
    );
    if (previousResumeRef != "") deleteResume(previousResumeRef);
    const uploadResponse = await uploadBytes(storageRef, newResumeFile);
    const resumeUrl = await getDownloadURL(storageRef);
    return {
      resumeUrl: resumeUrl,
      resumeRef: uploadResponse?.metadata?.fullPath,
    };
  } catch (error) {
    throw error;
  }
};

const updateProfile = async (data) => {
  try {
    const dataToUpdate = JSON.parse(JSON.stringify(data));
    delete dataToUpdate["id"];
    const docRef = doc(firestore, K.collections.profile.name, K.collections.profile.doc);
    await setDoc(docRef, dataToUpdate);
    // console.log("document updated with ID: ", docRef.id);
  } catch (error) {
    throw error;
  }
};

const ProfileService = {
  getProfile,
  deleteImage,
  updateImage,
  deleteResume,
  updateResume,
  updateProfile,
};

export default ProfileService;
