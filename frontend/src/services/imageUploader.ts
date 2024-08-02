import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { firebaseStorage } from '../firebase_options';
import { toast } from 'sonner';
import { dataURLToBlob } from '../utils/base64ToBlob';

// Function to upload a file and get its URL
export async function uploadFile(base64: string, bookTitle: string) {
  try {
    // Create a reference to the file in Firebase Storage
    const storageRef = ref(firebaseStorage, `bookImages/${bookTitle}`);

    const blob = dataURLToBlob(base64);

    const imageFile = new File([blob], `${bookTitle}-image`, {
      type: blob.type,
    });

    // Upload the file
    const uploadTask = uploadBytes(storageRef, imageFile);

    // Wait for the upload to complete
    await uploadTask;

    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    console.log(error);
    toast.error(
      'Se produjo un error al subir la imagen, intenta de nuevo más tarde'
    );
  }
}
