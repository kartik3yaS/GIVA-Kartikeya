import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProductForm = ({ onProductAdded }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [availableQuantity, setAvailableQuantity] = useState("");

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      name,
      description,
      price: parseFloat(price),
      quantity: parseInt(availableQuantity),
    };
    console.log("Submitting product:", product);

    try {
      const response = await axios.post(
        "https://giva-kartikeya.onrender.com/api/products",
        product,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from server:", response.data);

      if (response.status === 201) {
        const newProduct = response.data;
        onProductAdded(newProduct);
        setShowSuccessModal(true);
        setName("");
        setDescription("");
        setPrice("");
        setAvailableQuantity("");
      } else {
        setErrorMessage("Failed to add product.");
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("Error while adding product:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to add product";
      setErrorMessage(errorMessage);
      setShowErrorModal(true);
    }
  };

  return (
    <div className="container my-5">
      <div className="text-end mb-3">
        <Button variant="secondary" onClick={() => navigate("/")}>
          Go Back
        </Button>
      </div>
      <h2 className="text-center mb-4 text-primary">Add New Product</h2>
      <form
        onSubmit={handleSubmit}
        className="border rounded p-4 shadow-sm bg-light"
      >
        <div className="form-group mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Description:</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Price:</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Available Quantity:</label>
          <input
            type="number"
            className="form-control"
            value={availableQuantity}
            onChange={(e) => setAvailableQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Add Product
        </button>
      </form>

      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Product has been added successfully!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowSuccessModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddProductForm;
