import React, { useState } from 'react';
import Modal from 'react-modal';

const CourseModal = ({ isOpen, onClose, course }) => {
  const [isDeleting, setDeleting] = useState(false);

  const handleUpdate = () => {
    // Handle update logic
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      // Perform delete request
      // await axios.delete(`http://localhost:7000/educator/${course._id}/delete`);
      console.log('Course deleted successfully');
      // Update UI or fetch data again
    } catch (error) {
      console.error('Error deleting course:', error);
    } finally {
      setDeleting(false);
      onClose(); // Close the modal
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <h2 className="font-bold overflow-hidden overflow-ellipsis max-w-[200px]">{course.title}</h2>
        <p className='text-sm text-gray-700'> {course.username}</p>
        <div className='flex'>
          <span className='font-bold'>₹{course.cost}</span>
        </div>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete} disabled={isDeleting}>Delete</button>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default CourseModal;
