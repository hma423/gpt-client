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

  const [isPreview, setIsPreview] = useState(false);

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
    setIsPreview(true);
  };

  const handleEdit = () => {
    setIsPreview(false);
  };

  return (
    <Container maxWidth="sm">
      {!isPreview ? (
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom>
            Form
          </Typography>
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
      ) : (
        <div>
          <Typography variant="h4" gutterBottom>
            Preview
          </Typography>
          {formData.photo && (
            <div>
              <img src={URL.createObjectURL(formData.photo)} alt="Preview" style={{ maxWidth: '100%', marginBottom: '16px' }} />
            </div>
          )}
          <Typography variant="h6">{formData.name}</Typography>
          <Typography variant="body1">{formData.email}</Typography>
          <Typography variant="body1">{formData.description}</Typography>
          <Button variant="contained" onClick={handleEdit} style={{ marginTop: '16px' }}>
            Edit
          </Button>
        </div>
      )}
    </Container>
  );
};

export default App;
