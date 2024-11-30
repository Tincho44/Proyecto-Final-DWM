import React, { useState, useContext } from 'react';
import { PostContext } from 'shared/context/PostContext';
import postCSS from '../styles/Post.module.css';
import { toast } from 'react-toastify';

const CreatePostPage = () => {
  const [imageFile, setImageFile] = useState(null);
  const [caption, setCaption] = useState('');
  const { uploadPost } = useContext(PostContext);

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!imageFile) {
      toast.error('Debes seleccionar una imagen.');
      return;
    }

    try {
      const data = new FormData();
      data.append('file', imageFile);
      data.append('upload_preset', 'unsigned_preset'); 

      const cloudinaryResponse = await fetch(
        'https://api.cloudinary.com/v1_1/ddukhiy9y/image/upload',
        {
          method: 'POST',
          body: data,
        }
      );

      const cloudinaryResult = await cloudinaryResponse.json();

      if (cloudinaryResponse.ok && cloudinaryResult.secure_url) {
        const imageUrl = cloudinaryResult.secure_url;

        const imageResponse = await fetch(imageUrl);
        const imageBlob = await imageResponse.blob();

        const imageName = imageFile.name || 'image.jpg';
        const file = new File([imageBlob], imageName, { type: imageBlob.type });

        await uploadPost(caption, file);

        setImageFile(null);
        setCaption('');
        document.getElementById('imageInput').value = '';
        toast.success('Publicación creada con éxito.');
      } else {
        console.error('Cloudinary upload error:', cloudinaryResult);
        toast.error('Error al subir la imagen a Cloudinary.');
      }
    } catch (error) {
      console.error('Error al crear la publicación:', error);
      toast.error('Error al crear la publicación.');
    }
  };

  return (
    <div className={postCSS.createPost}>
      <h2>Crear Nueva Publicación</h2>
      <form onSubmit={handleSubmit} className={postCSS.form}>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <textarea
          placeholder="Escribe un caption..."
          value={caption}
          onChange={handleCaptionChange}
        />
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
};

export default CreatePostPage;
