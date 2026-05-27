import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

export const uploadImage = async (file) => {
  if (!file) return null;

  const storageRef = ref(storage, `services/${Date.now()}-${file.name}`);

  await uploadBytes(storageRef, file);

  const url = await getDownloadURL(storageRef);
  return url;
};
