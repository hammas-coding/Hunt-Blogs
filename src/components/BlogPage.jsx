import React, { useState } from "react";
import { Container, Row, Col, Modal, Form, Image } from "react-bootstrap";
import BlogCard from "./BlogCard";
import blogData from "../data/data";
import CustomNavbar from "./CustomNavbar";
import "./styles.css";

const BlogPage = () => {
  const [blogs, setBlogs] = useState(blogData);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [form, setForm] = useState({
    image: "",
    title: "",
    description: "",
    name: "",
    date: "",
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setForm({ image: "", title: "", description: "", name: "", date: "" });
    setEditMode(false);
    setCurrentBlog(null);
  };

  const handleAddBlog = () => {
    if (editMode) {
      setBlogs(
        blogs.map((blog) =>
          blog.id === currentBlog.id ? { ...blog, ...form } : blog
        )
      );
    } else {
      const newBlog = {
        id: blogs.length + 1,
        ...form,
      };
      setBlogs([...blogs, newBlog]);
    }
    handleCloseModal();
  };

  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  const handleEditBlog = (id) => {
    const blogToEdit = blogs.find((blog) => blog.id === id);
    setCurrentBlog(blogToEdit);
    setForm({
      image: blogToEdit.image,
      title: blogToEdit.title,
      description: blogToEdit.description,
      name: blogToEdit.name,
      date: blogToEdit.date,
    });
    setEditMode(true);
    handleShowModal();
  };

  const handleViewBlog = (blog) => {
    setCurrentBlog(blog);
    setEditMode(false);
    handleShowModal();
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <CustomNavbar />
      <Container>
        <button className="add-button" onClick={handleShowModal}>
          <span>Add Blog</span>
        </button>
        <Row>
          {blogs.map((blog) => (
            <Col md={4} key={blog.id} className="mb-4">
              <BlogCard
                blog={blog}
                onDelete={handleDeleteBlog}
                onEdit={handleEditBlog}
                onView={handleViewBlog}
              />
            </Col>
          ))}
        </Row>

        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {editMode
                ? "Edit Blog"
                : currentBlog
                ? currentBlog.title
                : "Add Blog"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {currentBlog && !editMode ? (
              <>
                <Image
                  src={currentBlog.image}
                  alt="Blog"
                  fluid
                  className="modal-view-image"
                />
                <h3 className="mt-3">{currentBlog.title}</h3>
                <p>{currentBlog.description}</p>
              </>
            ) : (
              <Form>
                <Form.Group controlId="formImage" className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control type="file" onChange={handleImageUpload} />
                  {form.image && (
                    <Image
                      src={form.image}
                      alt="Preview"
                      thumbnail
                      className="modal-view-image"
                    />
                  )}
                </Form.Group>
                <Form.Group controlId="formTitle" className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formDescription" className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formDate" className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          {!currentBlog || editMode ? (
            <Modal.Footer>
              <button className="close-button" onClick={handleCloseModal}>
                Close
              </button>
              <button className="update-button" onClick={handleAddBlog}>
                {editMode ? "Update Blog" : "Add Blog"}
              </button>
            </Modal.Footer>
          ) : null}
        </Modal>
      </Container>
    </>
  );
};

export default BlogPage;
