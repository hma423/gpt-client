import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

interface FormData {
  name: string;
  email: string;
  photo: File | null;
  description: string;
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    photo: null,
    description: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setFormData({ ...formData, photo: file });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you can send formData to your backend or handle it as needed
    console.log(formData);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" gutterBottom> {/* Changed variant to h3 */}
        Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="photo-upload"
        />
        <label htmlFor="photo-upload">
          <Button variant="contained" component="span">
            Upload Photo
          </Button>
        </label>
        {formData.photo && <Typography>{formData.photo.name}</Typography>}
        <TextField
          fullWidth
          label="Description"
          name="description"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default App;
