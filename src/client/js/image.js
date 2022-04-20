import { config } from "./config.js"

/**
 * Upload the image
 * @param {file} image
 * @returns {string} succeed: image id | failed: null
 */
export async function uploadImage(image) {
    const formData = new FormData();
    formData.append('image', image);
    const response = await fetch(config.URL_PREFIX + "/image/create", {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formData,
    })
    if (response.ok) {
        const data = await response.json();
        const imageId = data.id;
        return imageId;
    }
    return null;
}

/**
 * Get the image file
 * @param {string} id
 * @returns {string} succeed: image url in the browser | failed: null
 */
export async function getImage(id) {
    const response = await fetch(config.URL_PREFIX + "/image?id=" + id, {
        method: 'GET',
    })
    if (response.ok) {
        const data = await response.blob();
        const imageURL = URL.createObjectURL(data);
        return imageURL;
    }
    return null;
}

/**
 * Delete the image
 * @param {string} id
 * @returns {string} succeed: image id which deleted | failed: null
 */
export async function deleteImage(id) {
    const response = await fetch(config.URL_PREFIX + "/image/delete", {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
    })
    if (response.ok) {
        const data = await response.json();
        const imageId = data.id;
        return imageId;
    }
    return null;
}