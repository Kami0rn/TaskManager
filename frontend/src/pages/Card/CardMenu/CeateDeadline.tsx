import React, { useState, ChangeEvent, FormEvent } from 'react';
import DatePicker from 'react-datepicker';
import { CreateDeadline } from '../../../services/http/deadline/deadline'
import Swal from "sweetalert2";

function CeateDeadlineForm() {
  const initialFormData = {
    calendarID: 1,
    deadlineName: '',
    description: '',
    startDate: new Date(), // Set to the current date or another default date
    endDate: new Date(),   // Set to the current date or another default date
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'startDate' || name === 'endDate' ? new Date(value).toISOString() : value,
    }));
  };
  

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    console.log('Form Data:', formData); // Log the form data

    // Call your API function with formatted date strings
    const formattedFormData = {
      ...formData,
      startDate: formData.startDate.toISOString(),
      endDate: formData.endDate.toISOString(),
    };
    
    const created = await CreateDeadline(formattedFormData);

    if (created) {
      // Handle success (if needed)
      console.log('Deadline created successfully:', created);
      Swal.fire({
        icon: "success",
        title: "Card Updated!",
        text: "The deadline has been created successfully.",
      }).then(() => {
        // Redirect or perform any other action after successful deletion
        window.location.reload();
      });
    } else {
      // Handle failure (if needed)
      console.error('Failed to create deadline');
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to create the deadline. Please try again.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Deadline Name:
        <input
          type="text"
          name="deadlineName"
          value={formData.deadlineName}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Start Date:
        <input
          type="datetime-local"
          name="startDate"
          value={formData.startDate.toISOString().slice(0, -8)} // Format for datetime-local input
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        End Date:
        <input
          type="datetime-local"
          name="endDate"
          value={formData.endDate.toISOString().slice(0, -8)} // Format for datetime-local input
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Create Deadline</button>
    </form>
  );
}

export default CeateDeadlineForm;