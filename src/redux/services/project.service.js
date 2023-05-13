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
  query,
  orderBy,
  where,
  startAfter,
  limit,
  startAt,
  getCountFromServer,
  getDoc,
} from "firebase/firestore";
import K from "../../utils/constants";
import { v4 as uuidv4 } from "uuid";

const getProjectList = async (
  cursorIdsStored,
  pageSize,
  pageDirection,
  page
) => {
  try {
    const projectCollectionRef = collection(
      firestore,
      K.collections.projects.name
    );

    const basicConstraints = [
      orderBy("year", "desc"),
      orderBy("index", "desc"),
    ];

    const constraints = [...basicConstraints];

    const cursorIds = { ...cursorIdsStored };
    let cursorId = null;
    if (pageDirection === "next") {
      page = page + 1;
      const { lastCursorId } = cursorIds[page - 1];
      cursorId = lastCursorId;
    } else if (pageDirection === "prev") {
      page = page - 1;
      const { firstCursorId } = cursorIds[page];
      cursorId = firstCursorId;
    } else if (cursorIds[page]) {
      const { firstCursorId } = cursorIds[page];
      if (firstCursorId) cursorId = firstCursorId;
    }

    if (cursorId) {
      const cursorDocRef = doc(
        firestore,
        K.collections.projects.name,
        cursorId
      );
      const cursor = await getDoc(query(cursorDocRef));
      if (pageDirection === "next") {
        constraints.push(startAfter(cursor));
      } else {
        constraints.push(startAt(cursor));
      }
    }

    constraints.push(limit(pageSize));

    const q = query(projectCollectionRef, ...constraints);
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        index: data.length,
        ...doc.data(),
      });
    });

    const countFromServerRes = await getCountFromServer(
      query(projectCollectionRef, ...basicConstraints)
    );

    const { count: totalCount } = countFromServerRes["_data"];

    cursorIds[page] = {
      firstCursorId: querySnapshot.docs[0].id,
      lastCursorId: querySnapshot.docs[querySnapshot.docs.length - 1].id,
    };

    return { data, cursorIds, page, totalCount };
  } catch (error) {
    throw error;
  }
};

const getFeaturedProjectList = async () => {
  try {
    const projectCollectionRef = collection(
      firestore,
      K.collections.projects.name
    );
    const q = query(
      projectCollectionRef,
      orderBy("year", "desc"),
      orderBy("index", "desc"),
      where("isFeatured", "==", true)
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
      K.collections.projects.name +
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

const updateProject = async (data) => {
  try {
    const dataToUpdate = JSON.parse(JSON.stringify(data));
    delete dataToUpdate["id"];
    const docRef = doc(firestore, K.collections.projects.name, data?.id);
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
    const docRef1 = doc(firestore, K.collections.projects.name, item1?.id);
    const docRef2 = doc(firestore, K.collections.projects.name, item2?.id);
    await updateDoc(docRef1, dataToUpdate1);
    await updateDoc(docRef2, dataToUpdate2);
  } catch (error) {
    throw error;
  }
};

const deleteProject = async (project) => {
  try {
    if (project?.imageRef != null) await deleteImage(project?.imageRef);
    const docRef = doc(firestore, K.collections.projects.name, project.id);
    await deleteDoc(docRef);
    // console.log("Document updated with ID: ", docRef.id);
  } catch (error) {
    throw error;
  }
};

const ProjectService = {
  getFeaturedProjectList,
  getProjectList,
  addNewProject,
  deleteImage,
  updateImage,
  updateSorting,
  updateProject,
  deleteProject,
};

export default ProjectService;
