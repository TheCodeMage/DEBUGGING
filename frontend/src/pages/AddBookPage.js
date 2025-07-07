import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function AddBookPage() {
    const [authors, setAuthors] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        author_id: '',
        description: '',
        price: '',
        stock: '',
    });
    const [image, setImage] = useState(null); // ✅ image file state
    const navigate = useNavigate();

    useEffect(() => {
        API.get('/authors/')
            .then(res => setAuthors(res.data))
            .catch(err => console.error('Author fetch error:', err));
    }, []);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('author', formData.author_id); // ✅ match with Django field (usually "author")
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('stock', formData.stock);
        if (image) data.append('image', image); // ✅ image file appended

        API.post('/books/', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(() => {
                alert('📘 Book created!');
                navigate('/');
            })
            .catch(() => alert('❌ Failed to create book'));
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h2>📘 Add a New Book</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <select
                    name="author_id"
                    value={formData.author_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Author</option>
                    {authors.map(a => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                </select>
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <input
                    name="price"
                    type="number"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
                <input
                    name="stock"
                    type="number"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit">➕ Add Book</button>
            </form>
        </div>
    );
}

export default AddBookPage;
