import React, { useState } from 'react';
import axios from 'axios';

function CreateProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://api.airtable.com/v0/appafi3FiS8TEtgKo/Product',
        {
          fields: {
            name: name,
            price: price,
            image: [
              {
                url: imageURL,
              },
            ],
          },
        },
        {
          headers: {
            Authorization: `Bearer patfdqTNurL5Vrttj.e0494d984b5b6f4b7a57222e6b926735f47fd7644c4db400d9805a6b36451077`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Record created:', response.data);
    } catch (error) {
      console.error('Error creating record:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Preço:
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Image URL:
          <input type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
        </label>
      </div>
      <div>
        <button type="submit">Create</button>
      </div>
    </form>
  );
};

export default CreateProduct;
