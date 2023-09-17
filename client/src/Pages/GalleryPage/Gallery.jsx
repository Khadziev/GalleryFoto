import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteGallery,
  likeMeme,
  loadGallery,
} from '../../redux/features/gallery/gallery';
import GalleryTopBar from '../../components/gallery/GalleryTopBar';
import GalleryGrid from '../../components/gallery/GalleryGrid';
import GalleryUploadDialog from '../../components/gallery/GalleryUploadDialog';


function Gallery() {
  const [open, setOpen] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const gallery = useSelector((state) => state.gallery.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadGallery(sortOption));
  }, [dispatch, sortOption]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleLike = (id) => {
    dispatch(likeMeme(id));
  };

  const handleSort = (event) => {
    setSortOption(event.target.value);
  };

  const handleDelete = (id) => {
    dispatch(deleteGallery(id));
  };
  

  const sortedGallery = [...gallery].sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    }
    if (sortOption === 'date') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortOption === 'description') {
      return a.description.localeCompare(b.description);
    }
    return 0;
  });

  sortedGallery.reverse();

  return (
    <>
      <GalleryTopBar
        sortOption={sortOption}
        handleSort={handleSort}
        handleClickOpen={handleClickOpen}
      />
      <GalleryGrid
        gallery={sortedGallery}
        handleLike={handleLike}
        handleDelete={handleDelete}
      />
      <GalleryUploadDialog open={open} setOpen={setOpen} />
    </>
  );
}

export default Gallery;
