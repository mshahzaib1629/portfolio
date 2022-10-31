import { firestore } from "../../utils/firebase-setup";
import { collection, addDoc, getDocs } from "firebase/firestore";
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
    return data;
  } catch (error) {
    throw error;
  }
};

const ExperienceService = {
  getExperienceList,
};

export default ExperienceService;
