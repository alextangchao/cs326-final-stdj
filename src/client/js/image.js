/**
 * Upload the image
 * @param {file} image
 * @returns {string} succeed: image id | failed: null
 */
export async function uploadImage(image) {
    const formData = new FormData();
    formData.append('image', image);
    const response = await fetch("/image/create", {
        method: 'POST',
        body: formData,
    })
    if (response.ok && response.status === 200) {
        const data = await response.json();
        return data.id;
    }
    return null;
}

/**
 * Get the image file
 * @param {string} id
 * @returns {string} succeed: image url in the browser | failed: null
 */
export async function getImage(id) {
    const response = await fetch("/image?id=" + id, {
        method: 'GET',
    })
    if (response.ok && response.status === 200) {
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
    const response = await fetch("/image/delete", {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
    })
    if (response.ok && response.status === 200) {
        const data = await response.json();
        return data.id;
    }
    return null;
}