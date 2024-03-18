import { ref as storageRef, deleteObject } from 'firebase/storage'
import { useFirebaseStorage, useStorageFile } from 'vuefire'
import { storage } from '@/plugins/firebase'

export const uploadImage = async (image, imageName) => {
  // const storage = useFirebaseStorage()
  const fileRef = storageRef(storage, `dish/${imageName}`)
  const { url, refresh, upload } = useStorageFile(fileRef)
  await upload(image)
  await refresh(image)
  return url
}

export const updateImage = async (image, imageName, oldImageName) => {
  try {
    await deleteImage(oldImageName)
    const newImageUrl = await uploadImage(image, imageName)

    return newImageUrl.value
  } catch (error) {
    console.error('Error updating image:', error)
    return null
  }
}

export const deleteImage = async (imageUrl) => {
  const imageRef = getImageRef(imageUrl)
  const storage = useFirebaseStorage()
  const fileRef = storageRef(storage, imageRef)
  try {
    await deleteObject(fileRef)
    console.log('Image deleted successfully')
    return true
  } catch (error) {
    console.error('Error deleting image:', error)
    return false
  }
}

export const getImageRef = (url) => {
  const parts = url.split('/')
  const oIndex = parts.indexOf('o')
  const path = decodeURIComponent(parts.slice(oIndex + 1).join('/')).replace(/\?.*/, '')
  return path
}
