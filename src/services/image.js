import { ref as storageRef, deleteObject } from 'firebase/storage'
import { useFirebaseStorage, useStorageFile } from 'vuefire'
import { storage } from '@/plugins/firebase'

export const uploadImage = async (originalImage, originalName) => {
  // Resize the image
  const resizedImage = await resizeImage(originalImage)

  const timestamp = new Date().getTime()
  const imageName = `${timestamp}_${originalName}`

  const fileRef = storageRef(storage, `dish/${imageName}`)
  const { url, refresh, upload } = useStorageFile(fileRef)
  await upload(resizedImage)
  await refresh(resizedImage)
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
  console.log(imageRef)
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

const resizeImage = (imageData) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const MAX_WIDTH = 500
      const MAX_HEIGHT = 500
      let width = img.width
      let height = img.height

      // Calculate the new dimensions while maintaining aspect ratio
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width
          width = MAX_WIDTH
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height
          height = MAX_HEIGHT
        }
      }

      // Set the canvas dimensions
      canvas.width = width
      canvas.height = height

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0, width, height)

      // Convert the canvas content to a Blob
      canvas.toBlob((blob) => {
        resolve(blob)
      }, 'image/jpeg')
    }

    // Load the original image data into the image element
    img.src = URL.createObjectURL(imageData)
  })
}
